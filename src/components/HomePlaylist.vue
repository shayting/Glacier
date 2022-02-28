<template>
  <div id="homePlaylist" class="my-10">
    <div class="white--text text-h5 text-center mb-10">推薦歌單</div>
    <v-row>
      <v-col
        class="px-16 px-md-2"
        cols="12"
        sm="6"
        md="3"
        v-for="item in playlists"
        :key="item._id"
      >
        <kinesis-container>
          <kinesis-element :strength="10" type="depth">
            <v-card :to="'/playlist/' + item._id" color="transparent" class="pb-2">
              <div class="homeList-img pa-6">
                <v-img :src="item.cover"></v-img>
              </div>
              <div class="homeList-title white--text text-h6 text-center mb-2">{{ item.title }}</div>
              <div class="homeList-descrition white--text text-center">{{ item.description }}</div>
              <div
                class="homeList-descrition grey--text text-center"
              >published on {{ item.createDate }}</div>
            </v-card>
          </kinesis-element>
        </kinesis-container>
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
