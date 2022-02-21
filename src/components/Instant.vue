<template>
  <div
    class="instantRank my-12 d-flex flex-column justify-center pb-16"
    style="background-color: #1e1e1e; color:white; position: relative; "
  >
    <ul>
      <li class="py-4 fs-20">Top 10</li>
      <li v-for="(item, index) in sortItems" :key="index" class="d-flex align-center">
        <div class="instantNum">{{ index + 1 }}</div>
        <router-link :to="'/track/' + item._id">
          <img :src="item.cover" />
        </router-link>
        <div class="me-auto">
          <div class="ms-2">{{ item.title }}</div>
          <div class="ms-2 text-body-2">{{ item.artist.userName }}</div>
        </div>
        <div class="d-flex xyCenter" style="width: 130px;">
          <v-btn icon color="white" class="mx-1">
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
            <div class="ms-2">{{ item.likes.length }}</div>
          </v-btn>
          <v-btn icon color="white" class="mx-1" @click="getSongId(item._id)">
            <v-icon medium>mdi-plus</v-icon>
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
          <v-select :items="items" label="歌單名稱" outlined v-model="seletedPlaylist" :rules="titleRule"></v-select>
          </v-form>
        </v-card-text>
        <v-card-text>
          <div class="mb-2">沒有適合的歌單？</div>
          <v-btn block color="primary" @click="dialogAdd = false, dialogCreate = true">建立歌單</v-btn>
        </v-card-text>
        <v-card-text>
          <v-btn @click="dialogAdd = false">取消</v-btn>
          <v-btn color="success" @click="addToPlaylist">確定</v-btn>
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
    <router-link to="ranks" style="display: block;">
      <v-btn
        class="theme-btn mx-auto mt-5"
        elevation="2"
        style="width: 100px;"
        absolute
        bottom
        right
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
        width: 80px;
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
    nowSongId: ''
  }),
  methods: {
    getSongId (id) {
      if (this.user.isLogin) {
        this.dialogAdd = true
        this.nowSongId = id
        console.log(this.nowSongId)
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
      console.log(playlistId)
      console.log(this.nowSongId)
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
        // 重新渲染喜歡icon
        await this.$store.dispatch('user/getUserInfo')
        // 重新渲染喜歡數
        await this.getAllPublic()
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
    // 愛心數排序並取前10
    sortItems () {
      // 需深層複製
      const arr = JSON.parse(JSON.stringify(this.publicTracks))
      return arr.sort((a, b) => {
        return b.likes.length - a.likes.length
      }).slice(0, 10)
    },
    // 判斷是否按過讚
    myLikes () {
      const myLikes = []
      for (let i = 0; i < this.user.likes.length; i++) {
        myLikes.push(this.user.likes[i].tracks)
      }
      return myLikes
    }
  },
  async created () {
    this.getAllPublic()
    this.getUserPlaylist()
  }
}
</script>
