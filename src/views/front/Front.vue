<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- <FooterPlayer></FooterPlayer> -->
    <aplayer
      autoplay:false
      :music="{
        title: '浴室',
        artist: 'Deca joins',
        src: 'https://res.cloudinary.com/dbn5orfpi/video/upload/v1645445298/emotional-piano-sad-background-music-for-videos-5688_uznqui.mp3',
        pic: 'https://res.cloudinary.com/dbn5orfpi/image/upload/v1645340956/ml3wtvykt4syjfqj40cs.jpg'
      }"
    />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
// import FooterPlayer from '@/components/FooterPlayer.vue'

export default {
  name: 'Front',
  components: {
    Header
    // FooterPlayer
  },
  data: () => ({
    //
  })
}
</script>
