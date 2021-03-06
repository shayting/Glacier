<template>
  <div id="discover" class="my-container mt-100 mb-100">
    <v-overlay :value="isLoading" style="z-index:999">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-sheet class="secondary pa-4 chips-sheet" rounded>
      <div class="text-h5 mb-2 white--text">類別</div>
      <!-- 類別chips -->
      <v-chip-group active-class="light-blue--text" column dark>
        <v-chip @click="musicType('')">All</v-chip>
        <v-chip @click="musicType('Rock')">Rock</v-chip>
        <v-chip @click="musicType('Hip hop / Rap')">Hip hop / Rap</v-chip>
        <v-chip @click="musicType('Electronic')">Electronic</v-chip>
        <v-chip @click="musicType('Pop')">Pop</v-chip>
        <v-chip @click="musicType('Folk')">Folk</v-chip>
        <v-chip @click="musicType('Alternative')">Alternative</v-chip>
        <v-chip @click="musicType('Post rock')">Post rock</v-chip>
        <v-chip @click="musicType('Metal')">Metal</v-chip>
        <v-chip @click="musicType('Reggae / Funk')">Reggae / Funk</v-chip>
        <v-chip @click="musicType('R&B / Soul')">R&B / Soul</v-chip>
        <v-chip @click="musicType('Classic')">Classic</v-chip>
        <v-chip @click="musicType('Blues')">Blues</v-chip>
        <v-chip @click="musicType('Jazz')">Jazz</v-chip>
        <v-chip @click="musicType('Punk')">Punk</v-chip>
      </v-chip-group>
    </v-sheet>
    <!-- 歌曲 list -->
    <v-sheet color="secondary" min-height="800" class="pa-4 discover-list" rounded>
      <ul class="white--text">
        <li
          class="d-flex align-center pa-2 discover-list-item"
          style="height:80px;"
          v-for="(track, index) in sliceitems"
          :key="index"
        >
          <div class="text-h6 instantNum">{{ (page - 1) * 15 + index + 1 }}</div>
          <router-link :to="'/track/' + track._id" class="xyCenter d-none d-sm-flex">
            <img class="ms-2 discover-cover" :src="track.cover" />
          </router-link>
          <!-- 手機版音樂封面 -->
          <div class="d-block d-sm-none">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-img width="70" :src="track.cover">
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
            <div class="text-h6">{{ track.title }}</div>
            <div class="text-body-2">{{ track.artist.userName }}</div>
          </div>
          <div class="d-sm-none">
            <v-btn :to="'/track/' + track._id"  icon small color="grey">
              <v-icon small>mdi-music-box-multiple</v-icon>
            </v-btn>
          </div>
          <div class="d-none d-sm-flex align-center">
            <v-btn icon color="white" class="mx-1" @click="play(index)">
              <v-icon medium>mdi-play-circle</v-icon>
            </v-btn>
            <v-btn
              :color="myLikes.includes(track._id) ? 'red' : 'white'"
              rounded
              outlined
              class="mx-1"
              @click="likes(track._id)"
            >
              <v-icon v-if="!myLikes.includes(track._id)" small>mdi-cards-heart-outline</v-icon>
              <v-icon v-else small>mdi-cards-heart</v-icon>
              <div class="ms-2">{{ track.likes.length }}</div>
            </v-btn>
            <v-btn icon color="white" class="mx-1" @click="getSongId(track._id)">
              <v-icon medium>mdi-plus</v-icon>
            </v-btn>
          </div>
        </li>
      </ul>
      <div v-if="filterItems.length === 0" class="white--text text-center text-h6">目前沒有此類型音樂</div>
      <div class="text-center my-4 discover-page">
        <v-pagination
          v-model="page"
          :length="Math.ceil(filterItems.length / 15)"
          circle
          dark
          color="secondary"
        ></v-pagination>
      </div>
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
    <BackToTop></BackToTop>
  </div>
</template>
<script>
import BackToTop from '@/components/BackToTop.vue'

export default {
  components: {
    BackToTop
  },
  data: () => ({
    isLoading: false,
    myLikes: [],
    // ---- 播放overlay
    overlay: false,
    page: 1,
    publicTracks: [],
    filter: '',
    dialogAdd: false,
    dialogCreate: false,
    // select 欄位顯示
    items: [],
    // userPlaylist
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
  }),
  methods: {
    // 播放音樂
    play (index) {
      this.playingSong = {
        _id: this.filterItems[index]._id,
        title: this.filterItems[index].title,
        artist: this.filterItems[index].artist.userName,
        file: this.filterItems[index].file,
        cover: this.filterItems[index].cover
      }
      this.$store.commit('track/play', this.playingSong)
    },
    async getAllPublic () {
      this.isLoading = true
      try {
        const { data } = await this.api.get('/tracks/public')
        this.publicTracks = data.result.reverse()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
      this.isLoading = false
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
        // 重新渲染喜歡數
        await this.getAllPublic()
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
    // 換頁後到最頂部
    top () {
      window.scrollTo({ top: 0 })
    },
    musicType (type) {
      this.filter = type
      this.page = 1
      this.top()
    }
  },
  computed: {
    // 類別篩選
    filterItems () {
      return this.publicTracks.filter(item => {
        if (this.filter === '') return true
        return item.type === this.filter
      })
    },
    sliceitems () {
      return this.filterItems.slice(
        (this.page - 1) * 15,
        (this.page - 1) * 15 + 15
      )
    }
  },
  async created () {
    this.getMyLikes()
    this.getAllPublic()
    this.getUserPlaylist()
  }
}
</script>
<style lang="scss" scoped>
li {
  img {
    height: 100%;
  }
  border-bottom: 1px solid white !important;
}
</style>
