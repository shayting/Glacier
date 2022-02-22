<template>
  <div>
    <v-app>
      <!--若沒有綁定:key 會視同一個元件所以不會更新  -->
      <router-view :key="$route.fullPath"></router-view>
    </v-app>
    <aplayer
      autoplay
      :music="music"
      @canplay="canplay"
      ref="player"
    />
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      music: {
        title: 'glacier',
        artist: 'glacier',
        src: 'glacier',
        pic: 'glacier',
        _id: ''
      }
    }
  },
  computed: {
    track () {
      return this.$store.state.track
    }
  },
  methods: {
    canplay () {
      this.$refs.player.thenPlay()
    }
  },
  watch: {
    track: {
      handler () {
        this.music = {
          title: this.track.title,
          artist: this.track.artist,
          src: this.track.src,
          pic: this.track.pic,
          _id: this.track._id
        }
      },
      deep: true
    }
  },
  async created () {
    this.$store.dispatch('user/getUserInfo')
    this.$store.dispatch('track/getLastSong')
  }
}
</script>
