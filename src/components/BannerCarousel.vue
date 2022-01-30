<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>
      <img src="https://miro.medium.com/max/1200/1*bsukUGpEQQQLwXqewNDRfw.jpeg" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://miro.medium.com/max/1200/1*bsukUGpEQQQLwXqewNDRfw.jpeg" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://t.kfs.io/upload_images/106426/1126-_____-__tcrc___banner--01_original.jpg" />
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
