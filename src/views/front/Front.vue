<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- <FooterPlayer></FooterPlayer> -->
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
