
<template>
  <div class="my-container my-5 my-sm-10">
    <loading :active.sync="isLoading" color="#d7f3f5"></loading>
    <v-card
      elevation="2"
      min-height="500"
      color="secondary"
      class="white--text py-5 py-sm-10 mb-100"
      style="position: relative;"
    >
      <v-card-title class="px-8 px-sm-16 text-h4 py-0">Music</v-card-title>
      <v-card-text class="px-8 px-sm-16 text-body-1">
        <div>
          <!-- 上傳音樂 modal -->
          <v-dialog
            width="1000"
            v-model="dialog"
            persistent
            v-if="user._id.length !== 0 && user._id === $route.params.id"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="d-none d-sm-block theme-btn mt-sm-6 me-sm-12" absolute top right large v-on="on" v-bind="attrs">
                <v-icon left>mdi-cloud-upload</v-icon>上傳音樂
              </v-btn>
              <v-btn small class="d-sm-none theme-btn mt-sm-6 me-sm-12" absolute top right  v-on="on" v-bind="attrs">
                <v-icon>mdi-cloud-upload</v-icon>
              </v-btn>
            </template>
            <!-- 新增表單 -->
            <v-card>
              <v-card-title>{{ form._id.length === 0 ? '新增音樂' : '編輯音樂' }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-5">
                <v-row class="px-sm-10">
                  <v-col cols="12" sm="6">
                    <file-pond
                      ref="pond2"
                      name="cover"
                      label-idle="點擊或拖曳上傳封面"
                      allow-multiple="false"
                      accepted-file-types="image/jpeg, image/png"
                      imageResizeTargetWidth="100"
                      @updatefiles="getCoverFiles($event)"
                    />
                    <v-card-text>*必填欄位，格式須為jpg、jpeg、png</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <file-pond
                      ref="pond"
                      name="track"
                      label-idle="點擊或拖曳上傳音樂"
                      allow-multiple="false"
                      accepted-file-types="audio/mpeg"
                      @updatefiles="getFileFiles($event)"
                    />
                    <v-card-text>*必填欄位，格式須為mp3</v-card-text>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text class="my-5">
                <v-form class="px-sm-10" v-model="valid" ref="form">
                  <v-row>
                    <v-col cols="12" sm='6'>
                      <v-row class="text-body-1 align-center">
                        <v-col cols="3">歌名</v-col>
                        <v-col cols="9">
                          <v-text-field clearable v-model="form.title" required :rules="uploadRule"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="text-body-1">
                        <v-col cols="3">簡介</v-col>
                        <v-col cols="9">
                          <v-textarea outlined v-model="form.description"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-row class="text-body-1 align-center">
                        <v-col cols="3">類型</v-col>
                        <v-col cols="9">
                          <v-select
                            v-model="form.type"
                            :items="items"
                            item-text="type"
                            required
                            :rules="uploadRule"
                            placeholder="請選擇類型"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row class="text-body-1">
                        <v-col cols="3">歌詞</v-col>
                        <v-col cols="9">
                          <v-textarea outlined v-model="form.lyric"></v-textarea>
                          <v-switch v-model="form.private" label="私人"></v-switch>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click="resetForm">取消</v-btn>
                <v-btn
                  color="success"
                  text
                  @click="submitModal"
                  type="submit"
                  :disabled="!valid || modalSubmitting"
                >{{ form._id.length === 0 ? '新增' : '儲存' }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card-text>
      <!-- 音樂卡片 -->
      <v-card-text class="px-8 px-sm-16">
        <v-row>
          <v-col cols="6" sm="4" md="3" v-for="(item, index) in userTracks" :key="index">
            <v-card class="pb-2 track-card" style="position: relative;" elevation="0">
              <v-chip
                v-if="user._id === $route.params.id"
                x-small
                class="mb-2 state-chip"
              >{{ item.private ? 'private' : 'public' }}</v-chip>
              <v-btn
                small
                absolute
                icon
                :color="myLikes.includes(item._id) ? 'red' : 'white'"
                class="myTrack-like"
                @click="likes(item._id)"
              >
                <v-icon small v-if="!myLikes.includes(item._id)" medium>mdi-cards-heart-outline</v-icon>
                <v-icon v-else small>mdi-cards-heart</v-icon>
              </v-btn>
                <div class="track-photowrap">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-img class="track-photo" :src="item.cover">
                        <v-fade-transition>
                          <v-overlay v-if="hover" absolute color="#d7f3f5">
                            <v-icon @click="play(index)" x-large>mdi-play-circle-outline</v-icon>
                          </v-overlay>
                        </v-fade-transition>
                      </v-img>
                    </template>
                  </v-hover>
                  <div style="position: relative;">
                    <router-link :to="'/track/' + item._id">
                    <div class="text-body-1 mt-2 white--text">{{ item.title }}</div>
                    <div class="grey--text">{{item.artist.userName}}</div>
                    </router-link>
                    <v-btn absolute small class="myTrack-plus" icon color="white" @click="getSongId (item._id)">
                      <v-icon small>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </div>
              <!-- 編輯/刪除按鈕 -->
              <div
                v-if="user._id.length !== 0 && user._id === $route.params.id"
                class="d-flex justify-end"
              >
                <v-btn x-small class="secondary myTrack-edit" @click="editTrack(index)">
                  <v-icon x-small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn x-small color="secondary myTrack-del" @click="deleteTrack(item._id)" class="ms-2 btn-hover">
                  <v-icon x-small>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- 加入歌單dialog -->
    <v-dialog v-model="dialogAdd" persistent max-width="500">
      <v-card>
        <v-card-title>選擇想加入的歌單</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-10">
          <v-form ref="form">
            <v-select
              :items="playlistItems"
              label="歌單名稱"
              outlined
              v-model="seletedPlaylist"
              :rules="titleRule"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-text class="d-flex justify-space-between">
          <div>
            <div class="mb-2">沒有適合的歌單？</div>
            <v-btn color="primary" @click="dialogAdd = false, dialogCreate = true">建立歌單</v-btn>
          </div>
          <div class="mt-7">
            <v-btn @click="dialogAdd = false">取消</v-btn>
            <v-btn color="success ms-2" @click="addToPlaylist">確定</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 新增歌單 dialog-->
    <v-dialog v-model="dialogCreate" max-width="500">
      <v-card>
        <v-card-title>建立歌單</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
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
          <v-btn color="secondary" @click="resetPlaylistForm" text>Cancel</v-btn>
          <v-btn color="primary" @click="createPlaylist" text type="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false,
      valid: true,
      uploadRule: [
        v => !!v || '必填欄位'
      ],
      modalSubmitting: false,
      userTracks: [],
      form: {
        title: '',
        private: false,
        type: '',
        description: '',
        lyric: '',
        cover: null,
        file: null,
        uploadDate: Date.now(),
        _id: '',
        index: -1
      },
      // 儲存點擊要播放的音樂
      playingSong: {
        title: '',
        artist: '',
        file: '',
        cover: '',
        _id: ''
      },
      dialog: false,
      items: [
        { type: 'Rock' },
        { type: 'Hip hop / Rap' },
        { type: 'Electronic' },
        { type: 'Pop' },
        { type: 'Folk' },
        { type: 'Alternative' },
        { type: 'Post rock' },
        { type: 'Metal' },
        { type: 'Punk' },
        { type: 'Reggae / Funk' },
        { type: 'Classic' },
        { type: 'Blues' },
        { type: 'Jazz' },
        { type: 'R&B / Soul' }
      ],
      dialogAdd: false,
      dialogCreate: false,
      // playlist select 欄位顯示
      playlistItems: [],
      // userPlaylist
      playlists: [],
      nowSongId: '',
      seletedPlaylist: '',
      playListForm: {
        title: '',
        description: ''
      },
      // 表單驗證
      titleRule: [
        v => !!v || '必填欄位'
      ]
    }
  },
  methods: {
    getSongId (id) {
      // 存取使用者所選擇的歌曲id
      if (this.user.isLogin) {
        this.dialogAdd = true
        this.nowSongId = id
      }
    },
    async getUserPlaylist () {
      if (this.user._id.length !== 0) {
        try {
          const { data } = await this.api.get('/playlists?owner=' + this.user._id)
          this.playlists = data.result
          for (let i = 0; i < this.playlists.length; i++) {
            this.playlistItems.push(data.result[i].title)
          }
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '取得歌單失敗'
          })
        }
      }
    },
    async addToPlaylist () {
      // 找出使用者選擇的playlist Id
      const idx = this.playlists.findIndex(p => p.title === this.seletedPlaylist)
      const playlistId = this.playlists[idx]._id
      try {
        if (this.user.isLogin) {
          await this.api.patch('/playlists/addsong/' + playlistId, { _id: this.nowSongId }, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.dialogAdd = false
          this.seletedPlaylist = ''
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '加入成功'
          })
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    async createPlaylist () {
      try {
        await this.api.post('/playlists', { title: this.playListForm.title, description: this.playListForm.description }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.getUserPlaylist()
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增成功'
        })
        this.resetPlaylistForm()
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    resetPlaylistForm () {
      this.dialogCreate = false
      this.$refs.form.resetValidation()
      this.form = {
        title: '',
        description: ''
      }
    },
    // 播放音樂
    play (index) {
      this.playingSong = {
        _id: this.userTracks[index]._id,
        title: this.userTracks[index].title,
        artist: this.userTracks[index].artist.userName,
        file: this.userTracks[index].file,
        cover: this.userTracks[index].cover
      }
      this.$store.commit('track/play', this.playingSong)
    },
    getCoverFiles (event) {
      if (event[0]) {
        this.form.cover = event[0].file
      }
    },
    getFileFiles (event) {
      if (event[0]) {
        this.form.file = event[0].file
      }
    },
    async submitModal () {
      if ((this.form._id.length === 0) && (this.form.cover === null || this.form.file === null || !this.valid)) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      }
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
        if (this.form._id.length === 0) {
          await this.api.post('/tracks', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
        } else {
          await this.api.patch('/tracks/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
        }
        this.isLoading = false
        this.getPrivate()
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增/修改成功'
        })
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.dialog = false
      this.modalSubmitting = false
      this.$refs.form.resetValidation()
      this.form = {
        title: '',
        private: false,
        type: '',
        description: '',
        lyric: '',
        cover: null,
        file: null,
        uploadDate: Date.now(),
        _id: '',
        index: -1
      }
      this.$refs.pond.removeFile()
      this.$refs.pond2.removeFile()
    },
    resetForm () {
      if (this.modalSubmitting) {
        return
      }
      this.form = {
        artist: this.user.account,
        title: '',
        private: false,
        type: '',
        description: '',
        lyric: '',
        cover: null,
        file: null,
        date: '',
        _id: '',
        index: -1
      }
      this.$refs.form.resetValidation()
      this.dialog = false
    },
    editTrack (index) {
      // 把資料塞回表單
      this.form = {
        ...this.userTracks[index], cover: null, file: null, index
      }
      this.dialog = true
    },
    deleteTrack (id) {
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
          this.api.delete('/tracks/' + id, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          }).then(() => {
            this.getPrivate()
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '刪除成功'
            })
            this.$emit('deleteTrack')
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
    },
    async getUserTracks () {
      try {
        const { data } = await this.api.get('/tracks?artist=' + this.$route.params.id)
        this.userTracks = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    },
    async getPrivate () {
      try {
        const { data } = await this.api.get('/tracks/private/' + this.user._id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.userTracks = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    },
    // 加入/取消 喜歡功能
    async likes (id) {
      try {
        if (this.user.isLogin) {
          await this.api.patch('/users/likes/' + this.user._id, { _id: id }, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
        }
        // 重新渲染喜歡icon
        await this.$store.dispatch('user/getUserInfo')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  computed: {
    myLikes () {
      const myLikes = []
      for (let i = 0; i < this.user.likes.length; i++) {
        myLikes.push(this.user.likes[i].tracks)
      }
      return myLikes
    }
  },
  async created () {
    this.getUserPlaylist()
    if (this.user._id === this.$route.params.id) {
      this.getPrivate()
    } else {
      this.getUserTracks()
    }
  }
}
</script>
