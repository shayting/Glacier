<template>
  <div class="my-10 my-container">
    <v-sheet color="secondary" min-height="500" class="myPlaylists mb-100 px-16 py-10" rounded>
      <div class="white--text text-h4 mb-10">Like</div>
      <v-row v-if="userLikes">
        <v-col cols="6" md="4" v-for="(item,index) in userLikes" :key="index">
          <v-card
            color="grey"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                >{{item.tracks.title}}</v-card-title>

                <v-card-subtitle v-if="item.tracks.artist.userName">{{item.tracks.artist.userName}}</v-card-subtitle>
                <v-card-subtitle v-else>{{item.tracks.artist.account}}</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="20px"
                    right
                    width="20px"
                  >
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="20px"
                    right
                    width="20px"
                    @click="likes(item.tracks._id)"

                  >
                    <v-icon v-if="!myLikes.includes(item.tracks._id)">mdi-heart-outline</v-icon>
                    <v-icon v-else>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="20px"
                    right
                    width="20px"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>
              <router-link :to="'/track/' + item.tracks._id">
                <v-img class="ma-2" max-width="120px" :src="item.tracks.cover"></v-img>
              </router-link>
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
      userLikes: []
    }
  },
  methods: {
    async getUserLike () {
      try {
        const { data } = await this.api.get('/users/' + this.$route.params.id)
        this.userLikes = data.result.likes
        console.log(this.userLikes)
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
    }
  },
  computed: {
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
    this.getUserLike()
  }
}
</script>
