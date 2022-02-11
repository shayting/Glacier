<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>
      <img src="https://miro.medium.com/max/1200/1*bsukUGpEQQQLwXqewNDRfw.jpeg" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://miro.medium.com/max/1200/1*bsukUGpEQQQLwXqewNDRfw.jpeg" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://static.tixcraft.com/images/activity/21_CaoDong_8607828626055eb10839adadf0e26f4a.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img
        src="https://i0.wp.com/hackazine-tw.com/wp-content/uploads/2020/08/httpscdn.evbuc_.comimages92147907.png?resize=825%2C500&ssl=1"
      />
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '../../node_modules/swiper/css/swiper.css'
export default {
  name: 'carrousel',
  data () {
    return {
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
        // Some Swiper option/callback...
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
  }
}
</script>
