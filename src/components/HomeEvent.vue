<template>
  <div id="homeEvent" class="my-12">
    <div class="fs-24 text-center white--text">近期活動</div>
    <swiper class="swiper" :options="swiperOption" style="width: 100%;">
      <swiper-slide v-for="(item,index) in events" :key="index" class="xyCenter">
        <v-card class="mx-auto event-card" width="500" style="position: relative;" to="/events">
        <div>
          <v-img
            class="align-end"
            height="300px"
            :src="item.cover"
            style="border-radius: 4px 4px 0 0 ;"
          >
            <v-card-text><v-chip label color="#d7f3f5">{{item.performer}}</v-chip></v-card-text>
          </v-img>
        </div>
          <v-card-title>{{item.title}}</v-card-title>
          <v-card-subtitle class="pb-0">{{ item.date }}</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ item.place }}</div>
          </v-card-text>

        </v-card>
      </swiper-slide>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
    </swiper>
  </div>
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
      events: [],
      swiperOption: {
        freeMode: true,
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          // when window width is >= 640px
          920: {
            slidesPerView: 2,
            spaceBetween: 30
          }
        }
      }
    }
  },
  methods: {
    async getAllEvents () {
      try {
        const { data } = await this.api.get('/events/all')
        this.events = data.result
        for (let i = 0; i < this.events.length; i++) {
          this.events[i].date = new Date(this.events[i].date).toLocaleDateString().replace(/\//g, '.')
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得活動資料失敗'
        })
      }
    }
  },
  async created () {
    this.getAllEvents()
  }
}
</script>
