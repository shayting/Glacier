<template>
  <div
    class="instantRank my-12 d-flex flex-column justify-center pb-16 my-container"
    style="background-color: #1e1e1e; color:white; position: relative; "
  >
    <ul>
      <li class="py-4 fs-20">即時熱門</li>
      <li v-for="(item, index) in sortItems" :key="index" class="d-flex align-center">
        <div class="instantNum">{{ index + 1 }}</div>
        <router-link :to="'/track/' + item._id">
          <img :src="item.cover" />
        </router-link>
        <div class="me-auto">
          <div class="ms-2">{{ item.title }}</div>
          <div class="ms-2 text-body-2">{{ item.artist.userName }}</div>
        </div>
        <div class="d-flex xyCenter" style="width: 130px;">
          <v-btn icon color="white" class="mx-1">
            <v-icon medium>mdi-play-circle</v-icon>
          </v-btn>
          <v-btn
            outlined
            rounded
            :color="myLikes.includes(item._id) ? 'red' : 'white'"
            class="mx-1"
            @click="likes(item._id)"
          >
            <v-icon v-if="!myLikes.includes(item._id)" small>mdi-cards-heart-outline</v-icon>
            <v-icon v-else small>mdi-cards-heart</v-icon>
            <div class="ms-2">{{ item.likes.length }}</div>
          </v-btn>
          <v-btn icon color="white" class="mx-1">
            <v-icon medium>mdi-plus</v-icon>
          </v-btn>
        </div>
      </li>
    </ul>
    <!-- Back to top button -->
    <v-btn elevation="2" color="#d7f3f5"
  fab id="pagetop" v-show="scY > 300" @click="toTop"><v-icon small>mdi-triangle</v-icon>
    </v-btn>
  </div>
</template>
<style lang="scss">
#pagetop{
  position: fixed;
  right: 100px;
  bottom: 100px;
  cursor: pointer;
}
.instantRank {
  background: #ffffff;
  padding-bottom: 20px;
  border-radius: 4px;
  ul {
    padding: 0;
  }

  li {
    border-bottom: 1px solid #ccc;
    padding: 5px 30px;
  }
  li ~ li {
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .instantNum {
      width: 30px;
    }
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      font-size: 20px;
      img {
        width: 80px;
      }
    }
  }
  img {
    width: 60px;
  }
}
</style>
<script>

export default {
  data: () => ({
    publicTracks: [],
    scTimer: 0,
    scY: 0
  }),
  methods: {
    async getAllPublic () {
      try {
        const { data } = await this.api.get('/tracks/public')
        this.publicTracks = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    },
    // 加入/取消 喜歡功能
    async likes (id) {
      try {
        if (this.user.isLogin) {
          await this.api.patch('/users/likes/' + this.user._id, { _id: id }, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
        }
        // 重新渲染喜歡icon
        await this.$store.dispatch('user/getUserInfo')
        // 重新渲染喜歡數
        await this.getAllPublic()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    handleScroll: function () {
      if (this.scTimer) return
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 100)
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  computed: {
    // 愛心數排序
    sortItems () {
      // 需深層複製
      const arr = JSON.parse(JSON.stringify(this.publicTracks))
      return arr.sort((a, b) => {
        return b.likes.length - a.likes.length
      })
    },
    // 判斷是否按過讚
    myLikes () {
      const myLikes = []
      for (let i = 0; i < this.user.likes.length; i++) {
        myLikes.push(this.user.likes[i].tracks)
      }
      return myLikes
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  async created () {
    this.getAllPublic()
  }
}
</script>
