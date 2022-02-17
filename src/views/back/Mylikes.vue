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
                  >
                    <v-icon>mdi-heart-outline</v-icon>
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
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    }

  },
  async created () {
    this.getUserLike()
  }
}
</script>
