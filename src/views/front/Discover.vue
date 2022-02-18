<template>
  <div id="discover" class="my-container mt-100 mb-100">
    <v-sheet class="secondary pa-4 chips-sheet" rounded>
      <div class="text-h5 mb-2 white--text">類別</div>
      <!-- 類別chips -->
      <v-chip-group active-class="light-blue--text" column dark>
        <v-chip @click="filter = ''">All</v-chip>
        <v-chip @click="filter = 'Rock'">Rock</v-chip>
        <v-chip @click="filter = 'Hip hop / Rap'">Hip hop / Rap</v-chip>
        <v-chip @click="filter = 'Electronic'">Electronic</v-chip>
        <v-chip @click="filter = 'Pop'">Pop</v-chip>
        <v-chip @click="filter = 'Folk'">Folk</v-chip>
        <v-chip @click="filter = 'Alternative'">Alternative</v-chip>
        <v-chip @click="filter = 'Post rock'">Post rock</v-chip>
        <v-chip @click="filter = 'Metal'">Metal</v-chip>
        <v-chip @click="filter = 'Reggae / Funk'">Reggae / Funk</v-chip>
        <v-chip @click="filter = 'R&B / Soul'">R&B / Soul</v-chip>
        <v-chip @click="filter = 'Classic'">Classic</v-chip>
        <v-chip @click="filter = 'Blues'">Blues</v-chip>
        <v-chip @click="filter = 'Jazz'">Jazz</v-chip>
        <v-chip @click="filter = 'Punk'">Punk</v-chip>
      </v-chip-group>
    </v-sheet>
    <!-- list -->
    <v-sheet color="secondary" min-height="800" class="pa-4 discover-list" rounded>
      <ul class="white--text">
        <li
          class="d-flex align-center pa-2"
          style="height:80px;"
          v-for="(track, index) in filterItems"
          :key="index"
        >
          <div class="text-h6 instantNum">{{ index + 1 }}</div>
          <router-link :to="'/track/' + track._id">
            <img class="ms-2 discover-cover" :src="track.cover" />
          </router-link>
          <div class="me-auto ms-6">
            <div class="text-h6">{{ track.title }}</div>
            <div class="text-body-2">{{ track.artist.userName }}</div>
          </div>
          <div class="d-flex align-center">
            <v-btn icon color="white" class="mx-1">
              <v-icon medium>mdi-play-circle</v-icon>
            </v-btn>
            <v-btn
              :color="myLikes.includes(track._id) ? 'red' : 'white'"
              rounded
              outlined
              class="mx-1"
            >
              <v-icon v-if="!myLikes.includes(track._id)" small>mdi-cards-heart-outline</v-icon>
              <v-icon v-else small>mdi-cards-heart</v-icon>
              <div class="ms-2">{{ track.likes.length }}</div>
            </v-btn>
            <v-btn icon color="white" class="mx-1">
              <v-icon medium>mdi-plus</v-icon>
            </v-btn>
          </div>
        </li>
      </ul>
    </v-sheet>
    <!-- <div class="text-center my-4">
      <v-pagination v-model="page" :length="4" circle dark color="secondary"></v-pagination>
    </div> -->
    <BackToTop></BackToTop>
  </div>
</template>
<script>
import BackToTop from '@/components/BackToTop.vue'

export default {
  components: {
    BackToTop
  },
  data: () => ({
    page: 1,
    publicTracks: [],
    filter: ''
  }),
  methods: {
    async getAllPublic () {
      try {
        const { data } = await this.api.get('/tracks/public')
        this.publicTracks = data.result
        console.log(this.publicTracks)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    }
  },
  computed: {
    filterItems () {
      return this.publicTracks.filter(item => {
        if (this.filter === '') return true
        return item.type === this.filter
      })
    },
    myLikes () {
      const myLikes = []
      for (let i = 0; i < this.user.likes.length; i++) {
        myLikes.push(this.user.likes[i].tracks)
      }
      return myLikes
    }
  },
  async created () {
    this.getAllPublic()
  }
}
</script>
<style lang="scss" scoped>
li {
  img {
    height: 100%;
  }
  border-bottom: 1px solid white !important;
}
</style>
