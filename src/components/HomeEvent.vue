<template>
  <v-container class="my-12">
    <div class="fs-24 text-center white--text">近期活動</div>
    <swiper class="swiper" :options="swiperOption" style="width: 100%;">
      <swiper-slide v-for="item in items" :key="item.title" class="xyCenter">
        <v-card class="mx-auto" width="500">
          <v-img
            class="align-end"
            height="300px"
            :src="item.img"
          >
            <v-card-text><v-chip label color="#d7f3f5">{{item.title}}</v-chip></v-card-text>
          </v-img>

          <v-card-subtitle class="pb-0">{{ item.date }} • {{ item.time }}</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ item.place }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn class="theme-btn" text>更多資訊</v-btn>

            <v-btn class="theme-btn" text>點我收藏</v-btn>
          </v-card-actions>
        </v-card>
      </swiper-slide>
      <!-- <swiper-slide>
        <img src="https://cdn.ndtv.com/tech/images/gadgets/pikachu_hi_pokemon.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="https://cdn.ndtv.com/tech/images/gadgets/pikachu_hi_pokemon.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="https://cdn.ndtv.com/tech/images/gadgets/pikachu_hi_pokemon.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="https://cdn.ndtv.com/tech/images/gadgets/pikachu_hi_pokemon.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="https://cdn.ndtv.com/tech/images/gadgets/pikachu_hi_pokemon.jpg" alt />
      </swiper-slide> -->
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
    </swiper>
  </v-container>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '../../node_modules/swiper/css/swiper.css'

export default {
  name: 'swiper-example-free-mode',
  title: 'Free mode / No fixed positions',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      items: [
        { title: 'Deca joins 巡迴演唱會', date: '2021,02,13', img: 'https://static.accupass.com/userupload/bfbc6468bff34439910ce1f770b80e29.jpg', place: '駁二藝術特區', time: '20:00' }, { title: 'Deca joins 巡迴演唱會', date: '2021,02,13', img: 'http://urbannomad.tw/wp-content/uploads/2020/02/2020_banner_KKTix.jpg', place: '駁二藝術特區', time: '20:00' }, { title: 'Deca joins 巡迴演唱會', date: '2021,02,13', img: 'https://blow.streetvoice.com/wp-content/uploads/2020/05/95340219_696944227799792_201425337593102336_o.jpg', place: '駁二藝術特區', time: '20:00' }, { title: 'Deca joins 巡迴演唱會', date: '2021,02,13', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjQDpKJ62XEaCLq8-HutoPXT5kvfMASmkJ0kgtm-wSxmHNljYb8v_ORKwBHQr5XggDpV8&usqp=CAU', place: '駁二藝術特區', time: '20:00' }, { title: 'Deca joins 巡迴演唱會', date: '2021,02,13', img: 'https://t.kfs.io/upload_images/134658/2022___-__banner_1200x630_large.jpg', place: '駁二藝術特區', time: '20:00' }, { title: 'Deca joins 巡迴演唱會', date: '2021,02,13', img: 'https://tmc.taipei/wp-content/uploads/2021/09/%E5%AF%AC1360px%EF%BC%8C%E9%AB%98680px.jpg', place: '駁二藝術特區', time: '20:00' }
      ],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style scoped>
.swiper-container{
  margin-top: 0;
}
</style>
