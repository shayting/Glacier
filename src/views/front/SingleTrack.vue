<template>
  <div id="singleTrack" class="my-container white--text">
    <v-row>
      <!-- 音樂封面 -->
      <v-col cols="4" class="py-4">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-img
              width="400"
              :src="track.cover"
            >
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <v-icon x-large>mdi-play-circle-outline</v-icon>
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </template>
        </v-hover>
        <div class="d-flex align-center mt-6">
          <v-avatar size="50">
            <img v-if="track.artist.avatar !== null" :src="track.artist.avatar" />
            <img v-else :src="randomAvatar" />
          </v-avatar>
          <router-link :to="'/back/user/' + track.artist._id" class="ms-4 me-auto">
            <div class="white--text text-h6" v-if="track.artist.userName.length!==0">{{track.artist.userName}}</div>
            <div class="white--text text-h6" v-else>{{track.artist.account}}</div>
          </router-link>
          <v-btn class="theme-btn">追蹤</v-btn>
        </div>
      </v-col>
      <!-- 音樂資訊 -->
      <v-col cols="8" style="position: relative;">
        <div class="text-h4 mb-5">{{track.title}}</div>
        <v-divider color="grey"></v-divider>
        <v-chip x-small class="mt-4">{{track.type}}</v-chip>
        <div class="grey--text mt-4">Published:{{track.uploadDate}}</div>
        <div class="mt-4 text-h6">喜歡</div>
        <span class="primary-text text-h4">{{track.likes.length}}</span>
        <v-speed-dial
          v-model="fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
          absolute
        >
        <!-- 功能選單按鈕 -->
          <template v-slot:activator>
            <v-btn small v-model="fab" color="#d7f3f5" fab>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark x-small color="amber">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn fab dark x-small color="cyan">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn v-if="!likeState" @click="likes" fab dark x-small color="secondary">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn v-else @click="likes" fab dark x-small color="red">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <!-- 歌詞與介紹 -->
      <v-col cols="4">
        <v-card>
          <v-tabs fixed-tabs v-model="tab" dark>
            <v-tab href="#intro">介紹</v-tab>
            <v-tab href="#lyric">歌詞</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="white--text pa-10 singleTrack-intro" dark>
            <v-tab-item value="intro">
              <v-card-text class="text-body-1 text-wrapper">{{track.description}}</v-card-text>
            </v-tab-item>
            <v-tab-item value="lyric">
              <v-card-text class="text-body-1 text-wrapper">
                {{track.lyric}}
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <!-- 留言區 -->
      <v-col cols="8">
        <v-sheet dark min-height="548px" class="white--text pa-6 singleTrack-messages" rounded>
          <div class="text-h6">留言</div>
          <v-sheet color="secondary" height="240px" rounded class="mt-5 py-4 px-3" style="position: relative;">
            <div class="d-flex">
              <v-avatar size="50">
                <img src="https://source.boringavatars.com/beam" />
              </v-avatar>
              <v-textarea outlined no-resize label="我想要說..." class="ms-4"></v-textarea>
            </div>
            <v-btn class="theme-btn" absolute right bottom>留言</v-btn>
          </v-sheet>
          <v-sheet
            v-for="(message, index) in messages"
            :key="index"
            color="secondary"
            height="140px"
            class="mt-5 py-2 px-3"
            rounded
          >
            <div class="d-flex justify-space-between">
              <div class="publisher d-flex">
                <v-avatar size="40" class="mb-3">
                  <img :src="message.img" />
                </v-avatar>
                <div class="ms-2 text-h6">{{ message.name }}</div>
              </div>
              <div class="grey--text">Published:{{ message.date }}</div>
            </div>
            <div class="ms-14">{{ message.text }}</div>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    // 存放get到的東西
    track: {
      artist: {
        userName: '',
        account: ''
      },
      likes: []
    },
    likeState: false,
    // ---- 播放overlay
    overlay: false,
    // -----彈跳按鈕------
    direction: 'left',
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: true,
    right: true,
    bottom: false,
    left: false,
    transition: 'scale-transition',
    // ----介紹歌詞tab-----
    tab: null,
    // ----留言-----
    messages: [{
      name: 'Ben',
      img: 'https://source.boringavatars.com/beam/Ben',
      text: '這首太炸！！',
      date: '2022/01/20'
    }, {
      name: 'Lindy',
      img: 'https://source.boringavatars.com/beam/Lindy',
      text: '豪豪聽！！',
      date: '2022/01/20'
    }, {
      name: 'Jay',
      img: 'https://source.boringavatars.com/beam/Jay',
      text: '>_< 耳朵懷孕',
      date: '2022/01/21'
    }, {
      name: 'Coco',
      img: 'https://source.boringavatars.com/beam/Coco',
      text: '唷唷唷讚拉',
      date: '2022/01/22'
    }]
  }),
  watch: {
    top (val) {
      this.bottom = !val
    },
    right (val) {
      this.left = !val
    },
    bottom (val) {
      this.top = !val
    },
    left (val) {
      this.right = !val
    }
  },
  methods: {
    async getTrackById () {
      try {
        const { data } = await this.api.get('/tracks/' + this.$route.params.id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.track = data.result
        this.track.uploadDate = data.result.uploadDate.slice(0, 10)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    },
    async likes () {
      try {
        if (this.user.isLogin) {
          await this.api.patch('/users/likes/' + this.user._id, { _id: this.$route.params.id }, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  computed: {
    randomAvatar () {
      if (this.track.artist.avatar === null) {
        return 'https://source.boringavatars.com/beam/' + this.track.artist.account
      }
      return undefined
    }
  },
  async created () {
    this.getTrackById()
  }
}
</script>
