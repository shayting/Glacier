<template>
  <div class="white--text">
    <v-overlay :value="isLoading" style="z-index:999">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <template>
      <v-card style="position: relative;" elevation="3">
        <!-- 新增/編輯表單 -->
        <v-dialog max-width="500" v-model="dialog" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="theme-btn ml-4"
              dark
              v-bind="attrs"
              v-on="on"
              absolute
              bottom
            >新增歌單</v-btn>
          </template>
          <v-card>
            <v-card-title>{{this.form._id ? '編輯歌單': '新增歌單'}}</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <file-pond
                      ref="pond"
                      name="cover"
                      label-idle="點擊或拖曳上傳封面"
                      allow-multiple="false"
                      accepted-file-types="image/jpeg, image/png"
                      imageResizeTargetWidth="100"
                      @updatefiles="getCoverFiles($event)"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="歌單名稱" v-model="form.title"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="form.type"
                      :items="items"
                      item-text="type"
                      placeholder="請選擇類型"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="簡介" v-model="form.description" class="text-wrapper"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="resetForm">取消</v-btn>
              <v-btn
                color="success"
                @click="submitAdminPlaylist"
                :disabled="modalSubmitting"
              >{{ this.form._id ? '保存':'新增'}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card-title>
          歌單管理
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <!-- 表格 -->
        <v-data-table :headers="headers" :items="playlists" :search="search">
          <template v-slot:item.edit="{ item }">
            <v-icon small class="mr-2" @click="openEditForm(item)">mdi-pencil</v-icon>
          </template>
          <template v-slot:item.del="{ item }">
            <v-icon small class="mr-2" @click="deletePlaylist(item)">mdi-trash-can</v-icon>
          </template>
          <template v-slot:item.cover="{ item }">
            <div class="p-2">
              <v-img :src="item.cover" width="100px"></v-img>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      dialog: false,
      search: '',
      headers: [
        {
          text: '歌單名稱',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: '封面', value: 'cover', sortable: false },
        { text: '類型', value: 'type' },
        { text: '建立日期', value: 'createDate' },
        { text: '簡介', value: 'description' },
        { text: '編輯', value: 'edit', sortable: false },
        { text: '刪除', value: 'del', sortable: false }
      ],
      items: [
        { type: 'festival' },
        { type: 'vibe' }
      ],
      playlists: [],
      modalSubmitting: false,
      // 要傳出去的表單
      form: {
        title: '',
        type: '',
        cover: null,
        description: '',
        _id: '',
        role: 1
      },
      state: true
    }
  },
  methods: {
    getCoverFiles (event) {
      if (event[0]) {
        this.form.cover = event[0].file
      }
    },
    // 取得adminplaylists
    async getAdminPlaylists () {
      try {
        const { data } = await this.api.get('/playlists?owner=' + this.user._id)
        this.playlists = data.result
        for (let i = 0; i < this.playlists.length; i++) {
          this.playlists[i].createDate = new Date(this.playlists[i].createDate).toLocaleDateString().replace(/\//g, '.')
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得歌單失敗'
        })
      }
    },
    // 打開編輯表格
    openEditForm (item) {
      this.dialog = true
      // 將點擊到的帳號id存入data
      this.form._id = item._id
      this.form.title = item.title
      this.form.type = item.type
      this.form.description = item.description
      this.form.cover = null
    },
    // reset表格
    resetForm () {
      this.dialog = false
      this.form = {
        title: '',
        type: '',
        cover: null,
        description: null,
        _id: '',
        role: 1
      }
    },
    // 新增/編輯 admin歌單
    async submitAdminPlaylist () {
      // 停用送出按鈕
      this.modalSubmitting = true
      this.isLoading = true
      // 建立formdata物件
      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
        // 把資料塞進formdata中
          fd.append(key, this.form[key])
        }
      }
      try {
        // 新增
        if (this.form._id.length === 0) {
          await this.api.post('/playlists/admin', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '新增成功',
            confirmButtonColor: '#4DB6AC'
          })
        } else {
          // 編輯
          await this.api.patch('/playlists/admin/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '編輯成功',
            confirmButtonColor: '#4DB6AC'
          })
        }
        this.getAdminPlaylists()
        this.resetForm()
        this.isLoading = false
        this.$refs.pond.removeFile()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message,
          confirmButtonColor: '#4DB6AC'
        })
      }
      this.modalSubmitting = false
      this.isLoading = false
    },
    // 刪除
    async deletePlaylist (item) {
      this.$swal({
        icon: 'warning',
        title: '刪除確認',
        text: '確定要刪除此歌單嗎？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.delete('/playlists/' + item._id, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          }).then(() => {
            this.getAdminPlaylists()
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '刪除成功'
            })
          }).catch((error) => {
            this.$swal({
              icon: 'error',
              title: '失敗',
              text: error.response.data.message
            })
          })
        } else {
          this.$swal.close()
        }
      })
    }
  },
  async created () {
    this.getAdminPlaylists()
  }
}
</script>
