<template>
  <div class="my-10 my-container">
    <v-sheet color="secondary" min-height="500" class="myPlaylists mb-100 py-10" rounded style="position: relative;">
    <!-- 建立歌單 -->
      <v-dialog width="500" v-model="dialog" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="theme-btn"
                absolute
                top
                right
                large
                v-on="on"
                v-bind="attrs"
              >
                <v-icon left>mdi-plus</v-icon>建立歌單
              </v-btn>
            </template>
            <v-card>
              <v-card-title>{{ form._id.length === 0 ? '新增歌單' : '編輯歌單' }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="my-5">
                <v-form class="px-10" ref="form">
                  <v-row>
                    <v-col cols="12">
                      <v-row class="text-body-1 align-center">
                        <v-col cols="3">歌單名稱</v-col>
                        <v-col cols="9">
                          <v-text-field clearable :rules="titleRule" v-model="form.title"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="text-body-1">
                        <v-col cols="3">簡介</v-col>
                        <v-col cols="9">
                          <v-textarea outlined v-model="form.description"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="create" type="submit">Save</v-btn>
                <v-btn color="secondary" text @click="resetForm()">Cancel</v-btn>
              </v-card-actions>
            </v-card>
      </v-dialog>
    <!-- 我的歌單 -->
      <div class="white--text text-h4 px-16 mb-10">Playlists</div>
      <v-row class="px-16">
        <v-col cols="3" v-for="(playlist, index) in playlists" :key="index">
          <v-card class="pa-4" color="#9e9e9e">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-img src="https://res.cloudinary.com/dbn5orfpi/image/upload/v1645150180/d7bwvppu5rnp5e8opmqq.jpg">
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#d7f3f5">
                      <v-icon x-large>mdi-play-circle-outline</v-icon>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
              </template>
            </v-hover>
            <v-card-title>{{ playlist.title }}</v-card-title>
            <v-card-text class="">
              <span>{{ playlist.songs.length}}首歌</span>
              <div>
                <v-btn small class="theme-btn" icon :to="'/playlist/'+ playlist._id">
                  <v-icon small>mdi-format-list-bulleted-square</v-icon>
                </v-btn>
                <v-btn v-if="user._id === $route.params.id" small class="theme-btn" icon>
                  <v-icon small @click="openEditForm(index)">mdi-pencil</v-icon>
                </v-btn>
                <v-btn v-if="user._id === $route.params.id" small class="theme-btn" icon>
                  <v-icon small @click="deletePlaylist(playlist._id)">mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playlists: [],
      form: {
        title: '',
        description: '',
        _id: ''
      },
      // 表單驗證
      valid: true,
      titleRule: [
        v => !!v || '必填欄位'
      ],
      dialog: false
    }
  },
  methods: {
    openEditForm (index) {
      console.log(index)
      this.dialog = true
      this.form = {
        title: this.playlists[index].title,
        description: this.playlists[index].description,
        _id: this.playlists[index]._id
      }
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetValidation()
      this.form = {
        title: '',
        description: '',
        _id: ''
      }
      console.log(this.form)
    },
    // 新增歌單/修改歌單
    async create () {
      try {
        if (this.form._id.length === 0) {
          await this.api.post('/playlists', { title: this.form.title, description: this.form.description }, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
        } else {
          await this.api.patch('/playlists/' + this.form._id, { title: this.form.title, description: this.form.description }, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
        }
        this.getUserPlaylists()
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增/修改成功'
        })
        this.resetForm()
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    // 找此頁面使用者的歌乾
    async getUserPlaylists () {
      try {
        const { data } = await this.api.get('/playlists?owner=' + this.$route.params.id)
        this.playlists = data.result
        console.log(this.playlists)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    },
    // 刪除歌單
    async deletePlaylist (id) {
      console.log(id)
      this.$swal({
        icon: 'warning',
        title: '刪除確認',
        text: '確定要刪除此音樂',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.delete('/playlists/' + id, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          }).then(() => {
            this.getUserPlaylists()
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '刪除成功'
            })
          }).catch((error) => {
            this.$swal({
              icon: 'error',
              title: '失敗',
              text: error.message
            })
          })
        } else {
          this.$swal.close()
        }
      })
    }
  },
  async created () {
    this.getUserPlaylists()
  }
}
</script>
