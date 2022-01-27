<template>
  <div>
    <BannerCarousel></BannerCarousel>
  </div>
</template>

<style lang="scss">
</style>

<script>
import BannerCarousel from '../components/BannerCarousel.vue'
export default {
  name: 'Home',
  components: {
    BannerCarousel
  },
  data () {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth'
      ]
    }
  }
}
</script>
