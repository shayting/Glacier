<template>
  <div class="my-5 my-sm-10 my-container">
    <v-sheet color="secondary" min-height="500" class="myPlaylists mb-100 px-8 px-sm-16 py-sm-10 py-5" rounded>
      <div class="white--text text-h4 mb-10">Like</div>
      <v-row v-if="userLikes">
          <v-col cols="6" sm="4" md="3" v-for="(item, index) in userLikes" :key="index">
            <v-card class="pb-2 track-card" style="position: relative;" elevation="0">
              <v-btn
                small
                absolute
                icon
                color="white"
                class="myTrack-like"
                @click="likes(item.tracks._id)"
              >
                <v-icon small v-if="!myLikes.includes(item.tracks._id)" medium>mdi-cards-heart-outline</v-icon>
                <v-icon v-else small>mdi-cards-heart</v-icon>
              </v-btn>
                <div class="track-photowrap">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-img class="track-photo" :src="item.tracks.cover">
                        <v-fade-transition>
                          <v-overlay v-if="hover" absolute color="#d7f3f5">
                            <v-icon @click="play(index)" x-large>mdi-play-circle-outline</v-icon>
                          </v-overlay>
                        </v-fade-transition>
                      </v-img>
                    </template>
                  </v-hover>
                  <div style="position: relative;">
                    <router-link :to="'/track/' + item.tracks._id">
                    <div class="text-body-1 mt-2 white--text">{{ item.tracks.title }}</div>
                    <div class="grey--text">{{item.tracks.artist.userName}}</div>
                    </router-link>
                    <v-btn absolute small class="myLike-plus" icon color="white" @click="getSongId (item.tracks._id)">
                      <v-icon small>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </div>
            </v-card>
          </v-col>
        </v-row>
    </v-sheet>
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
      myLikes: [],
      userLikes: [],
      // 儲存點擊要播放的音樂
      playingSong: {
        title: '',
        artist: '',
        file: '',
        cover: '',
        _id: ''
      },
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
    play (index) {
      this.playingSong = {
        _id: this.userLikes[index].tracks._id,
        title: this.userLikes[index].tracks.title,
        artist: this.userLikes[index].tracks.artist.userName,
        file: this.userLikes[index].tracks.file,
        cover: this.userLikes[index].tracks.cover
      }
      this.$store.commit('track/play', this.playingSong)
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
    },
    async getUserLike () {
      try {
        const { data } = await this.api.get('/users/' + this.$route.params.id)
        // 身份判斷 公開私人
        if (this.user._id === this.$route.params.id) {
          this.userLikes = data.result.likes.filter(item => {
            // 顯示自己所有及他人公開
            return (item.tracks.artist._id === this.user._id) || (item.tracks.artist._id !== this.user._id && !item.tracks.private)
          })
        } else {
          // 顯示所有公開
          this.userLikes = data.result.likes.filter(item => {
            return !item.tracks.private
          })
        }
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
        // 重新渲染喜歡數
        await this.getUserLike()
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
    }
  },
  async created () {
    this.getMyLikes()
    this.getUserPlaylist()
    this.getUserLike()
  }
}
</script>
