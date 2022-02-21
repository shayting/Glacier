<template>
  <div id="homePlaylist" class="my-10">
    <div class="white--text text-h5 text-center mb-10">推薦歌單</div>
      <v-row>
        <v-col cols="3" v-for="item in playlists" :key="item._id">
          <v-card height="320" :to="'/playlist/' + item._id">
            <v-img height="200px" :src="item.cover">
            </v-img>
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-text>{{item.description}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      admin: '61f80ddc3e24fd41116fc86d',
      playlists: []
    }
  },
  methods: {
    // 取得adminplaylists
    async getAdminPlaylists () {
      try {
        const { data } = await this.api.get('/playlists?owner=' + this.admin)
        this.playlists = data.result
        for (let i = 0; i < this.playlists.length; i++) {
          this.playlists[i].createDate = new Date(this.playlists[i].createDate).toLocaleDateString().replace(/\//g, '.')
        }
        this.playlists = this.playlists.splice(-4)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得歌單失敗'
        })
      }
    }
  },
  async created () {
    this.getAdminPlaylists()
  }
}
</script>
