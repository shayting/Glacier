<template>
  <div id="homeEvent">
    <div class="fs-24 text-center white--text my-10">近期活動</div>
    <swiper class="swiper" :options="swiperOption" style="width: 100%;height: 500px;">
      <swiper-slide v-for="(item,index) in events" :key="index" class="xyCenter">
        <v-card class="mx-auto event-card" width="800" style="position: relative;" to="/events" color="transparent">
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
          <v-card-title class="white--text">{{item.title}}</v-card-title>
          <v-card-subtitle class="pb-0 grey--text">{{ item.date }}</v-card-subtitle>

          <v-card-text class="white--text">
            <div>{{ item.place }}</div>
          </v-card-text>

        </v-card>
      </swiper-slide>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
    </swiper>
    <div id="copyright">
      網站為學習用途，無商業使用。圖片音樂均取自網路(音樂僅為範例音樂不代表歌手作品)
    </div>
  </div>
</template>

<style lang="scss">
  #homeEvent{
    margin-bottom: 100px;
    .swiper-button-next{
      transform: rotate(90deg) !important;
    }
    .swiper-button-prev{
      transform: rotate(90deg) !important;
    }
  }
</style>

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
        direction: 'vertical',
        autoplay: true,
        slidesPerView: 1,
        allowTouchMove: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
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
