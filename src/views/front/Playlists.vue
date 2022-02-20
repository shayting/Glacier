<template>
  <div id="playlists">
    <div id="festival-playlist" class="example-3d py-10">
      <div class=" text-center text-h4">特別企劃</div>
      <swiper class="swiper" :options="swiperOption" style="width: 80%;">
        <swiper-slide v-for="(item, index) in festivalPlaylists" :key="index" class="xyCenter">
          <router-link
            :to="'/playlist/' + item._id"
            style="display: block;width:300px;height: 300px;"
          >
            <v-img
              class="align-end"
              height="300px"
              width="300px"
              :src="item.cover"
              style="border-radius: 4px 4px 0 0 ;"
            ></v-img>
          </router-link>
        </swiper-slide>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
      </swiper>
    </div>
    <div id="vibe-playlist" class="example-3d py-10">
      <div class="white--text text-center text-h4">情境歌單</div>
      <swiper class="swiper" :options="swiperOption" style="width: 80%;">
        <swiper-slide v-for="(item, index) in vibePlaylists" :key="index" class="xyCenter">
          <router-link
            :to="'/playlist/' + item._id"
            style="display: block;width:300px"
          >
            <v-img
              class="align-end"
              height="300px"
              width="300px"
              :src="item.cover"
              style="border-radius: 4px 4px 0 0 ;"
            ></v-img>
          </router-link>
        </swiper-slide>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '../../../node_modules/swiper/css/swiper.css'
export default {
  name: 'swiper-example-free-mode',
  title: 'Free mode / No fixed positions',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      admin: '61f80ddc3e24fd41116fc86d',
      events: [],
      playlists: [],
      festivalPlaylists: [],
      vibePlaylists: [],
      overlay: false,
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        freeMode: true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          920: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }
      }
    }
  },
  methods: {
    // 取得adminplaylists
    async getAdminPlaylists () {
      try {
        const { data } = await this.api.get('/playlists?owner=' + this.admin)
        this.playlists = data.result
        for (let i = 0; i < this.playlists.length; i++) {
          this.playlists[i].createDate = new Date(this.playlists[i].createDate).toLocaleDateString().replace(/\//g, '.')
        }
        this.festivalPlaylists = this.playlists.filter(p => {
          return p.type === 'festival'
        })
        this.vibePlaylists = this.playlists.filter(p => {
          return p.type === 'vibe'
        })
        console.log(this.festivalPlaylists)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得歌單失敗'
        })
      }
    }
  },
  async created () {
    this.getAdminPlaylists()
  }
}
</script>
<style lang="scss" scoped>
.example-3d {
  width: 100%;
  height: 600px;
  padding-top: 120px !important;
  padding-bottom: 150px !important;
}

.swiper {
  height: 100%;
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    text-align: center;
    font-weight: bold;
    background-position: center;
    background-size: cover;
  }
}
</style>
