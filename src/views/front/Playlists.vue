<template>
  <div id="playlists" class>
    <v-overlay :value="isLoading" style="z-index:999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div id="festival-playlist" class="d-flex flex-column justify-center">
      <div class="text-center text-h4">特別企劃</div>
      <div class="example-3d">
        <swiper class="swiper" :options="swiperOption" style="width: 80%;">
          <swiper-slide v-for="(item, index) in festivalPlaylists" :key="index">
            <router-link :to="'/playlist/' + item._id">
              <v-img :src="item.cover" style="border-radius: 4px 4px 0 0 ;"></v-img>
            </router-link>
          </swiper-slide>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
        </swiper>
      </div>
    </div>
    <div id="vibe-playlist" class="d-flex flex-column justify-center">
      <div class="white--text text-center text-h4">情境歌單</div>
      <div class="example-3d">
        <swiper class="swiper" :options="swiperOption" style="width: 80%;">
          <swiper-slide v-for="(item, index) in vibePlaylists" :key="index">
            <router-link :to="'/playlist/' + item._id">
              <v-img :src="item.cover" style="border-radius: 4px 4px 0 0 ;"></v-img>
            </router-link>
          </swiper-slide>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
        </swiper>
      </div>
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
      isLoading: false,
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
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    // 取得adminplaylists
    async getAdminPlaylists () {
      this.isLoading = true
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
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得歌單失敗'
        })
      }
      this.isLoading = false
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
  height: 400px;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper {
  height: 100%;
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px !important;
    height: 300px;
    text-align: center;
    font-weight: bold;
    border-radius: 4px;
    background-color: #000;
    background-position: center;
    background-size: cover;
    color: white;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .swiper-pagination {
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background-color: white;
    }
  }
}
</style>
