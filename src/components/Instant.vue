<template>
  <div
    class="instantRank my-12 d-flex flex-column justify-center pb-16"
    style="background-color: #1e1e1e; color:white; position: relative; "
  >
    <ul>
      <li class="py-4 fs-20">Top 10</li>
      <li v-for="(item, index) in sortItems" :key="index" class="d-flex align-center">
        <div class="instantNum">{{ index + 1 }}</div>
        <router-link :to="'/track/' + item._id" class="d-none d-sm-flex align-center">
          <img :src="item.cover"/>
        </router-link>
        <!-- 手機版音樂封面 -->
        <div class="d-block d-sm-none">
          <v-hover>
          <template v-slot:default="{ hover }">
            <v-img width="80" :src="item.cover">
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#d7f3f5">
                  <v-icon x-large @click="play(index)">mdi-play-circle-outline</v-icon>
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </template>
        </v-hover>
        </div>
        <div class="me-auto">
          <div class="ms-2">{{ item.title }}</div>
          <div class="ms-2 text-body-2">{{ item.artist.userName }}</div>
        </div>
        <div class="d-none d-sm-flex xyCenter " style="width: 130px;">
          <v-btn icon color="white" class="mx-1" @click="play(index)">
            <v-icon medium>mdi-play-circle</v-icon>
          </v-btn>
          <v-btn
            outlined
            rounded
            :color="myLikes.includes(item._id) ? 'red' : 'white'"
            class="mx-1"
            @click="likes(item._id)"
          >
            <v-icon v-if="!myLikes.includes(item._id)" small>mdi-cards-heart-outline</v-icon>
            <v-icon v-else small>mdi-cards-heart</v-icon>
            <div class="ms-2 d-sm-block">{{ item.likes.length }}</div>
          </v-btn>
          <v-btn icon color="white" class="mx-1" @click="getSongId(item._id)">
            <v-icon medium>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div class="d-sm-none">
            <v-btn :to="'/track/' + item._id"  icon small color="grey">
              <v-icon small>mdi-music-box-multiple</v-icon>
            </v-btn>
        </div>
      </li>
    </ul>
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
          <v-btn color="secondary" @click="resetForm" text>取消</v-btn>
          <v-btn color="primary" @click="createPlaylist" text type="submit">確認</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <router-link to="ranks" style="display: block;">
      <v-btn
        class="mx-auto mt-5"
        elevation="2"
        style="width: 100px;"
        absolute
        bottom
        right
        color="white"
        outlined
      >more</v-btn>
    </router-link>
  </div>
</template>
<style lang="scss">
.instantRank {
  background: #ffffff;
  padding-bottom: 20px;
  border-radius: 4px;
  ul {
    padding: 0;
  }

  li {
    border-bottom: 1px solid #ccc;
    padding: 5px 30px;
  }
  li ~ li {
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .instantNum {
      width: 30px;
    }
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      font-size: 20px;
      img {
        width: 100px;
      }
    }
  }
  img {
    width: 60px;
  }
}
</style>
<script>

export default {
  data: () => ({
    // ---- 播放overlay
    overlay: false,
    publicTracks: [],
    dialogAdd: false,
    dialogCreate: false,
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
    items: [],
    playlists: [],
    nowSongId: '',
    // 儲存點擊要播放的音樂
    playingSong: {
      title: '',
      artist: '',
      file: '',
      cover: '',
      _id: ''
    },
    myLikes: []
  }),
  methods: {
    // 播放音樂
    play (index) {
      this.playingSong = {
        _id: this.sortItems[index]._id,
        title: this.sortItems[index].title,
        artist: this.sortItems[index].artist.userName,
        file: this.sortItems[index].file,
        cover: this.sortItems[index].cover
      }
      this.$store.commit('track/play', this.playingSong)
    },
    getSongId (id) {
      if (this.user.isLogin) {
        this.dialogAdd = true
        this.nowSongId = id
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
    async getAllPublic () {
      try {
        const { data } = await this.api.get('/tracks/public')
        this.publicTracks = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
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
        await this.api.post('/playlists', { title: this.form.title, description: this.form.description }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.getUserPlaylist()
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
    }
  },
  computed: {
    // 愛心數排序並取前10
    sortItems () {
      // 需深層複製
      const arr = JSON.parse(JSON.stringify(this.publicTracks))
      return arr.sort((a, b) => {
        return b.likes.length - a.likes.length
      }).slice(0, 10)
    }
  },
  async created () {
    this.getMyLikes()
    this.getAllPublic()
    this.getUserPlaylist()
  }
}
</script>
