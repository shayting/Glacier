<template>
  <div>
    <BannerCarousel></BannerCarousel>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <DaySong></DaySong>
        </v-col>
        <v-col cols="12" md="8">
          <Instant></Instant>
        </v-col>
      </v-row>
        <v-divider color="white"></v-divider>
      <v-row>
        <v-col>
          <HomeList></HomeList>
        </v-col>
      </v-row>
      <v-divider color="white"></v-divider>
      <v-row>
        <v-col>
          <HomeEvent></HomeEvent>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
</style>

<script>
import BannerCarousel from '../components/BannerCarousel.vue'
import DaySong from '../components/DaySong.vue'
import Instant from '../components/Instant.vue'
import HomeList from '../components/HomeList.vue'
import HomeEvent from '../components/HomeEvent.vue'

export default {
  name: 'Home',
  components: {
    BannerCarousel,
    DaySong,
    Instant,
    HomeList,
    HomeEvent
  },
  data () {
    return {
    }
  }
}
</script>
