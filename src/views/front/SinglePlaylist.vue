<template>
  <div id="singlePlaylist" class="my-container white--text mb-100 mt-100">
    <v-overlay :value="isLoading" style="z-index:999">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-row>
      <v-col cols="12" sm="3" class="d-none d-sm-block">
        <v-img v-if="playlist.cover" width="400" :src="playlist.cover"></v-img>
        <v-img v-else-if="songs.length > 0" :src="songs[0].song.cover"></v-img>
        <v-img v-else width="400" src="https://source.boringavatars.com/marble/1/?square"></v-img>
      </v-col>
      <v-col cols="12" sm="9" style="position: relative;">
        <div class="d-flex">
          <!-- 手機版出現圖片 -->
          <div class="d-sm-none me-4" style="width:30%;">
            <v-img v-if="playlist.cover" width="200" :src="playlist.cover"></v-img>
            <v-img v-else-if="songs.length > 0" width="200" :src="songs[0].song.cover"></v-img>
            <v-img v-else width="200" src="https://source.boringavatars.com/marble/1/?square"></v-img>
          </div>
          <div>
            <div class="text-h4 mb-2">{{ playlist.title }}</div>
            <div v-if="playlist.songs" class="grey--text">{{ playlist.songs.length }}首歌</div>
            <span class="grey--text">Published: {{ playlist.createDate }}</span>
            <div class="mt-4 fs-20">{{ playlist.description }}</div>
          </div>
        </div>
        <!-- 歌單 -->
        <v-sheet color="secondary" min-height="500" class="mt-10 pa-4" rounded>
          <ul class="white--text" v-if="this.songs">
            <li
              class="d-flex align-center pa-2"
              style="height:100px;"
              v-for="(song, index) in songs"
              :key="song._id"
            >
              <div class="text-h6 instantNum">{{ index + 1 }}</div>
              <router-link :to="'/track/' + song.song._id" class="d-block">
                <v-img width="80px" class="ms-2 d-none d-sm-flex" :src="song.song.cover" />
              </router-link>
              <!-- 手機版音樂封面 -->
              <div class="d-block d-sm-none">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-img width="80" :src="song.song.cover">
                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute color="#d7f3f5">
                          <v-icon x-large @click="play(index)">mdi-play-circle-outline</v-icon>
                        </v-overlay>
                      </v-fade-transition>
                    </v-img>
                  </template>
                </v-hover>
              </div>
              <div class="me-auto ms-6">
                <div class="text-h6">{{ song.song.title }}</div>
                <div class="text-body-2">{{ song.song.artist.userName }}</div>
              </div>
              <div class="d-none d-sm-flex align-center">
                <v-btn icon color="white" @click="play(index)">
                  <v-icon medium>mdi-play-circle</v-icon>
                </v-btn>
                <v-btn icon color="white" @click="likes(song.song._id)">
                  <v-icon v-if="!myLikes.includes(song.song._id)" medium>mdi-cards-heart-outline</v-icon>
                  <v-icon v-else medium>mdi-cards-heart</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon
                    v-if="user._id === playlist.owner"
                    medium
                    @click="deleteSong(song.song._id)"
                  >mdi-trash-can</v-icon>
                  <v-icon v-else medium @click="getSongId(song.song._id)">mdi-plus</v-icon>
                </v-btn>
              </div>
              <div class="d-sm-none">
          <v-btn :to="'/track/' + song.song._id" icon small color="grey">
            <v-icon small>mdi-music-box-multiple</v-icon>
          </v-btn>
        </div>
            </li>
          </ul>
          <div v-if="songs.length === 0" class="white--text text-center">此歌單尚無歌曲</div>
        </v-sheet>
        <!-- 加入歌單dialog -->
        <v-dialog v-model="dialogAdd" persistent max-width="500">
          <v-card>
            <v-card-title>選擇想加入的歌單</v-card-title>
            <v-divider></v-divider>
            <v-card-text class="py-10">
              <v-form ref="form">
                <v-select
                  :items="items"
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
              <v-btn color="secondary" @click="resetForm" text>Cancel</v-btn>
              <v-btn color="primary" @click="createPlaylist" text type="submit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false,
      myLikes: [],
      playlist: {},
      songs: [],
      dialogAdd: false,
      dialogCreate: false,
      // select 欄位顯示
      items: [],
      // 使用者自己的playlists名稱
      playlists: [],
      nowSongId: '',
      seletedPlaylist: '',
      form: {
        title: '',
        description: ''
      },
      // 表單驗證
      valid: true,
      titleRule: [
        v => !!v || '必填欄位'
      ],
      // 儲存點擊要播放的音樂
      playingSong: {
        title: '',
        artist: '',
        file: '',
        cover: '',
        _id: ''
      }
    }
  },
  methods: {
    // 播放音樂
    play (index) {
      this.playingSong = {
        _id: this.songs[index].song._id,
        title: this.songs[index].song.title,
        artist: this.songs[index].song.artist.userName,
        file: this.songs[index].song.file,
        cover: this.songs[index].song.cover
      }
      this.$store.commit('track/play', this.playingSong)
    },
    async getPlaylist () {
      this.isLoadiing = true
      try {
        const { data } = await this.api.get('/playlists/' + this.$route.params.id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.playlist = data.result
        this.playlist.createDate = data.result.createDate.slice(0, 10)
        this.songs = this.playlist.songs
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得歌單失敗'
        })
      }
      this.isLoadiing = false
    },
    async deleteSong (id) {
      this.$swal({
        icon: 'warning',
        title: '刪除確認',
        text: '確定要從歌單移除此音樂',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '移除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.patch('/playlists/deletesong/' + this.$route.params.id, { _id: id },
            {
              headers: {
                authorization: 'Bearer ' + this.user.token
              }
            }).then(() => {
            this.getPlaylist()
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
      this.getMyLikes()
    },
    async getMyLikes () {
      await this.$store.dispatch('user/getUserInfo')
      this.myLikes = []
      for (let i = 0; i < this.user.likes.length; i++) {
        this.myLikes.push(this.user.likes[i].tracks)
      }
      return []
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
            this.items.push(data.result[i].title)
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
            text: '加入成功',
            confirmButtonColor: '#4DB6AC'
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
        await this.api.post('/playlists', { title: this.form.title, description: this.form.description }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.getUserPlaylist()
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增成功',
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
    resetForm () {
      this.dialogCreate = false
      this.$refs.form.resetValidation()
      this.form = {
        title: '',
        description: ''
      }
    }
  },
  async created () {
    this.getMyLikes()
    this.getPlaylist()
    this.getUserPlaylist()
  }
}
</script>
