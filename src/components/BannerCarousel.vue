<template>
<div id="bannerCarousel">
  <swiper ref="mySwiper" :options="swiperOptions" :breakpoints="swiperOptions.breakpoints">
    <swiper-slide v-for="banner in banners" :key="banner._id">
      <img :src="banner.bannerImage" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
  </swiper>
</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '../../node_modules/swiper/css/swiper.css'
export default {
  name: 'carrousel',
  data () {
    return {
      banners: [],
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mountd () {
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  },
  async created () {
    try {
      const { data } = await this.api.get('/banners')
      this.banners = data.result
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}
</script>
