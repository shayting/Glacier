<template>
  <div class="my-5 my-sm-10 my-container">
    <v-sheet
      color="secondary"
      min-height="500"
      class="myPlaylists mb-100 py-5 py-sm-10"
      rounded
      style="position: relative;"
    >
      <!-- 建立歌單 -->
      <v-dialog v-if="user._id === $route.params.id" width="500" v-model="dialog" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn absolute top right large v-on="on" v-bind="attrs" class="d-none d-sm-block theme-btn mt-sm-6 me-sm-12">
            <v-icon left>mdi-plus</v-icon>建立歌單
          </v-btn>
          <v-btn absolute top right small v-on="on" v-bind="attrs" class="d-sm-none theme-btn mt-sm-6 me-sm-12">
            <v-icon left>mdi-plus</v-icon>歌單
          </v-btn>
        </template>
        <v-card>
          <v-card-title>{{ form._id.length === 0 ? '新增歌單' : '編輯歌單' }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="my-5">
            <v-form class="px-5 px-sm-10" ref="form">
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
            <v-btn color="secondary" text @click="resetForm()">取消</v-btn>
            <v-btn color="primary" text @click="create" type="submit">確定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 我的歌單 -->
      <div class="white--text text-h4 px-8 px-sm-16 mb-10">Playlists</div>
      <v-row class="px-8 px-sm-16">
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(playlist, index) in playlists" :key="index">
          <v-card class="pa-4" color="#111314">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-img v-if="playlist.songs.length !== 0" :src="playlist.songs[0].song.cover">
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#d7f3f5">
                      <v-btn icon :to="'/playlist/' + playlist._id">
                        <v-icon x-large>mdi-format-list-bulleted-square</v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
                <v-img
                  v-else
                  src="https://source.boringavatars.com/marble/120/Maria%20Mitchell?square"
                >
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#d7f3f5">
                      <v-btn icon :to="'/playlist/' + playlist._id">
                        <v-icon x-large>mdi-format-list-bulleted-square</v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
              </template>
            </v-hover>
            <div class="white--text text-h6 mt-2">{{ playlist.title }}</div>
            <span class="grey--text text-body-2">{{ playlist.songs.length }}首歌</span>
            <div class="d-flex justify-end">
              <v-btn v-if="user._id === $route.params.id" small icon color="white">
                <v-icon small @click="openEditForm(index)">mdi-pencil</v-icon>
              </v-btn>
              <v-btn v-if="user._id === $route.params.id" small icon color="white">
                <v-icon small @click="deletePlaylist(playlist._id)">mdi-trash-can</v-icon>
              </v-btn>
            </div>
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
          text: '新增/修改成功',
          confirmButtonColor: '#4DB6AC'
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
    // 找此頁面使用者的歌單
    async getUserPlaylists () {
      try {
        const { data } = await this.api.get('/playlists?owner=' + this.$route.params.id)
        this.playlists = data.result
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
      this.$swal({
        icon: 'warning',
        title: '刪除確認',
        text: '確定要刪除此歌單？',
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
              text: '刪除成功',
              confirmButtonColor: '#4DB6AC'
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
