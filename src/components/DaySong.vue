<template>
  <div id="daySong">
    <v-card class="mx-auto my-12" dark>
      <v-card-title>Song of the Day</v-card-title>
      <v-img max-height="400" max-width="100%" :src="track.cover"></v-img>
      <div class="d-flex align-center justify-space-between">
        <v-card-title>{{ track.title }}</v-card-title>
        <v-card-actions v-if="user.isAdmin">
          <v-btn small @click="openEdit()">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title>請輸入歌曲ID</v-card-title>
          <v-card-text>
            <v-text-field v-model="modelSongID" label="歌曲ID" outlined></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="dialog = false">取消</v-btn>
            <v-btn color="success" @click="submitID()">確定</v-btn>
          </v-card-actions>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
      <v-card-subtitle>{{ track.artist.userName }}</v-card-subtitle>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions class="pa-4 d-flex align-center">
        <v-btn fab dark x-small @click="play">
          <v-icon>mdi-play-circle</v-icon>
        </v-btn>
        <v-btn @click="likes" fab dark x-small>
          <v-icon>{{ likeIcon }}</v-icon>
        </v-btn>
        <v-btn fab dark x-small @click="getSongId(track._id)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
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
                    <v-text-field clearable :rules="titleRule" v-model="playListForm.title"></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="text-body-1">
                  <v-col cols="3">簡介</v-col>
                  <v-col cols="9">
                    <v-textarea outlined v-model="playListForm.description"></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="resetForm" text>Cancel</v-btn>
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
      dialog: false,
      renderSongID: '621638c855e85f096ff5c83f',
      modelSongID: '',
      likeState: false,
      track: {
        title: '',
        artist: '',
        cover: '',
        _id: ''
      },
      // 儲存點擊要播放的音樂
      playingSong: {
        title: '',
        artist: '',
        file: '',
        cover: '',
        _id: ''
      },
      // 加歌單
      dialogAdd: false,
      dialogCreate: false,
      // select 欄位顯示
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
      valid: true,
      titleRule: [
        v => !!v || '必填欄位'
      ]
    }
  },
  methods: {
    // 播放音樂
    play () {
      this.playingSong = {
        _id: this.track._id,
        title: this.track.title,
        artist: this.track.artist.userName,
        file: this.track.file,
        cover: this.track.cover
      }
      console.log(this.playingSong)
      this.$store.commit('track/play', this.playingSong)
    },
    openEdit () {
      this.dialog = true
      this.modelSongID = this.renderSongID
    },
    submitID () {
      this.renderSongID = this.modelSongID
      this.dialog = false
      this.getDaySong()
    },
    async getDaySong () {
      try {
        const { data } = await this.api.get('/tracks/' + this.renderSongID, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.track = data.result
        // .some 陣列只要有其中一個符合條件就會回傳true
        if (this.user.likes !== undefined && this.user.likes.some(like => like.tracks === this.track._id)) {
          this.likeState = true
        } else {
          this.likeState = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 加入/取消 喜歡功能
    async likes () {
      try {
        if (this.user.isLogin) {
          await this.api.patch('/users/likes/' + this.user._id, { _id: this.renderSongID }, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
        }
        // 重新渲染喜歡icon
        await this.$store.dispatch('user/getUserInfo')
        // 重新渲染喜歡數
        this.getDaySong()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
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
    resetForm () {
      this.dialogCreate = false
      this.$refs.form.resetValidation()
      this.form = {
        title: '',
        description: ''
      }
    }
  },
  computed: {
    likeIcon () {
      return this.likeState ? 'mdi-heart' : 'mdi-heart-outline'
    }
  },
  async created () {
    this.getDaySong()
    this.getUserPlaylist()
  }
}
</script>
