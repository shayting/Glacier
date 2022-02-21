<template>
  <div>
    <Header></Header>
    <loading :active.sync="isLoading" color="#fb8c00"></loading>
    <div v-if="user.role !== 1" id="back" class="my-container white--text">
      <div>
        <v-row>
          <v-col cols="3">
            <v-avatar v-if="userPage.avatar" size="200" class="ma-10">
              <img :src="userPage.avatar" />
            </v-avatar>
            <v-avatar v-else size="200" class="ma-10">
              <img :src="randomAvatar" />
            </v-avatar>
          </v-col>

          <v-col cols="9" class="d-flex justify-space-between">
            <div style="position: relative;width:570px;">
              <!-- 編輯個人資料button/modal -->
              <v-dialog width="500" v-model="dialog2" v-if="user._id === userPage._id">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="theme-btn ma-8" absolute top right small v-on="on" v-bind="attrs">
                    <v-icon small left>mdi-pencil</v-icon>編輯個人資料
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>個人資料</v-card-title>
                  <v-divider></v-divider>
                  <div class="xyCenter flex-column">
                    <v-avatar v-if="!changeAvatar" size="100" class="mt-5">
                      <img v-if="!userInfo.avatar" :src="randomAvatar" />
                      <img v-else :src="userInfo.avatar" />
                    </v-avatar>
                    <div class="mt-5 avatar-upload" style="width:100px;">
                      <file-pond
                        v-if="changeAvatar"
                        imageCropAspectRatio="1"
                        imageResizeTargetWidth="250"
                        stylePanelLayout="compact circle"
                        styleLoadIndicatorPosition="center bottom"
                        styleProgressIndicatorPosition="right bottom"
                        styleButtonRemoveItemPosition="left bottom"
                        styleButtonProcessItemPosition="right bottom"
                        accepted-file-types="image/jpeg, image/png"
                        label-idle="選擇圖片"
                        @updatefiles="getAvatar($event)"
                      />
                    </div>
                    <v-btn
                      v-if="!changeAvatar"
                      text
                      small
                      color="primary"
                      @click="changeAvatar = !changeAvatar"
                    >更換大頭貼</v-btn>
                    <v-btn
                      v-if="changeAvatar"
                      text
                      small
                      color="secondary"
                      @click="changeAvatar = !changeAvatar"
                    >取消</v-btn>
                  </div>
                  <v-card-text class="my-5">
                    <v-form>
                      <v-row class="px-10 text-body-1">
                        <v-col cols="4">用戶帳號</v-col>
                        <v-col cpls="8">{{ user.account }}</v-col>
                      </v-row>
                      <v-row class="px-10 text-body-1 align-center">
                        <v-col cols="4">用戶名稱</v-col>
                        <v-col cols="8">
                          <v-text-field v-model="form.userName" clearable></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="px-10 text-body-1">
                        <v-col cols="4">用戶簡介</v-col>
                        <v-col cols="8">
                          <v-textarea v-model="form.description" outlined></v-textarea>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="submitModal"
                      type="submit"
                      :disabled="modalSubmitting"
                    >儲存</v-btn>
                    <v-btn color="secondary" text @click="dialog2 = false, changeAvatar = false">取消</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 追蹤按鈕 -->
              <v-btn
                v-if="user._id !== $route.params.id && !followState"
                @click="follow"
                class="theme-btn ma-8"
                absolute
                top
                right
                medium
              >+ 追蹤</v-btn>
              <v-btn
                v-if="user._id !== $route.params.id && followState"
                @click="follow"
                class="ma-8"
                outlined
                color="teal"
                absolute
                top
                right
                medium
              >已追蹤</v-btn>
              <!-- 用戶名 -->
              <div v-if="userPage.userName" class="ma-10 text-h3">{{ userPage.userName }}</div>
              <div v-else class="ma-10 text-h3">{{ userPage.account }}</div>
              <div class="mx-10 text-wrapper">{{ splitText }}</div>
            </div>
            <div class="d-flex my-10">
              <!-- 追蹤modal -->
              <v-dialog v-model="dialog" width="500" class="ma-10">
                <template v-slot:activator="{ on, attrs }" @click="renderNew">
                  <div class="text-center ms-8">
                    <div class="fs-20">音樂</div>
                    <div>{{ tracksCount }}</div>
                  </div>
                  <div class="text-center ms-8" v-on="on" v-bind="attrs">
                    <div class="fs-20">粉絲</div>
                    <div>{{ userPage.followers.length }}</div>
                  </div>
                  <div class="text-center ms-8" v-on="on" v-bind="attrs">
                    <div class="fs-20">追蹤中</div>
                    <div>{{ userPage.following.length }}</div>
                  </div>
                </template>
                <v-card>
                  <v-tabs fixed-tabs v-model="tab">
                    <v-tab href="#followers">粉絲</v-tab>
                    <v-tab href="#following">追蹤中</v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                    <v-tab-item value="followers">
                      <!-- 粉絲tab -->
                      <v-card-text>
                        <ul class="ps-0" v-if="userPage.followers">
                          <li
                            class="d-flex align-center justify-space-between my-2"
                            v-for="follower in userPage.followers"
                            :key="follower._id"
                          >
                            <div class="d-flex align-center">
                              <v-avatar>
                                <img v-if="follower.users.avatar" :src="follower.users.avatar" />
                                <img
                                  v-else
                                  :src="`https://source.boringavatars.com/beam/${follower.users.account}`"
                                />
                              </v-avatar>
                              <div
                                v-if="follower.users.userName"
                                class="fs-20 mx-5"
                              >{{ follower.users.userName }}</div>
                              <div v-else class="fs-20 mx-5">{{ follower.users.account }}</div>
                            </div>
                            <v-btn
                              width="80"
                              v-if="followCheck(follower.users._id)"
                              color="primary"
                              outlined
                              elevation="2"
                              @click="followById(follower.users._id)"
                            >追蹤中</v-btn>
                            <v-btn
                              width="80"
                              v-else
                              color="primary"
                              elevation="2"
                              @click="followById(follower.users._id)"
                            >追蹤</v-btn>
                          </li>
                        </ul>
                      </v-card-text>
                    </v-tab-item>
                    <v-tab-item value="following">
                      <!-- 追蹤tab -->
                      <v-card-text>
                        <ul class="ps-0">
                          <li
                            v-for="following in userPage.following"
                            :key="following._id"
                            class="d-flex align-center justify-space-between my-2"
                          >
                            <div class="d-flex align-center">
                              <v-avatar>
                                <img v-if="following.users.avatar" :src="following.users.avatar" />
                                <img
                                  v-else
                                  :src="`https://source.boringavatars.com/beam/${following.users.account}`"
                                />
                              </v-avatar>
                              <div
                                v-if="following.users.userName"
                                class="fs-24 mx-5"
                              >{{ following.users.userName }}</div>
                              <div v-else class="fs-24 mx-5">{{ following.users.account }}</div>
                            </div>
                            <v-btn
                              width="80"
                              v-if="followCheck(following.users._id)"
                              color="primary"
                              outlined
                              elevation="2"
                              @click="followById(following.users._id)"
                            >追蹤中</v-btn>
                            <v-btn
                              width="80"
                              v-else
                              color="primary"
                              elevation="2"
                              @click="followById(following.users._id)"
                            >追蹤</v-btn>
                          </li>
                        </ul>
                      </v-card-text>
                    </v-tab-item>
                  </v-tabs-items>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 追蹤modal end-->
            </div>
          </v-col>
        </v-row>
      </div>
      <v-app-bar color="secondary" elevation="2" class="d-flex justify-center" rounded>
        <div class="px-10 fs-20 back-item">
          <router-link :to="'/back/user/' + this.$route.params.id">ABOUT</router-link>
        </div>
        <div class="px-10 fs-20 back-item">
          <router-link :to="'/back/user/' + this.$route.params.id + '/tracks'">MUSIC</router-link>
        </div>
        <div class="px-10 fs-20 back-item">
          <router-link :to="'/back/user/' + this.$route.params.id + '/playlists'">PLAYLIST</router-link>
        </div>
        <div class="px-10 fs-20 back-item">
          <router-link :to="'/back/user/' + this.$route.params.id + '/likes'">LIKE</router-link>
        </div>
      </v-app-bar>
    </div>
    <router-view @deleteTrack="tracksCount--"></router-view>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
// import user from '../../store/user'
export default {
  name: 'Back',
  components: {
    Header
  },
  data () {
    return {
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2
      },
      form: {
        cover: null,
        userName: '',
        description: ''
      },
      // 追蹤狀態
      followState: false,
      // 登入者資料(供表單使用)
      userInfo: {},
      // 此路由頁面使用者資料
      userPage: {
        tracks: [],
        followers: [],
        following: [],
        account: '',
        avatar: ''
      },
      // 登入者follow資訊
      myFollow: {
        followers: [],
        following: []
      },
      tracksCount: 0,
      dialog: false,
      dialog2: false,
      modalSubmitting: false,
      tab: null,
      changeAvatar: false,
      isLoading: false
    }
  },
  methods: {
    getAvatar (event) {
      this.form.cover = event[0].file
    },
    async submitModal () {
      // 停用送出按鈕
      this.modalSubmitting = true
      // 建立formdata物件
      const fd = new FormData()
      for (const key in this.form) {
        fd.append(key, this.form[key])
      }
      try {
        const { data } = await this.api.patch('/users/' + this.user._id, fd, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.userInfo = data.result
        this.dialog2 = false
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '修改成功'
        })
        this.changeAvatar = false
        this.updateProfile()
        this.getUser()
        this.getOtherUser()
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.modalSubmitting = false
    },
    updateProfile () {
      // form表單原先資料渲染
      this.form = {
        cover: this.userInfo.avatar,
        description: this.userInfo.description,
        userName: this.userInfo.userName
      }
    },
    // 抓登入者資料
    async getUser () {
      const { data } = await this.api.get('/users/me', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      // 抓取最新資料庫資料並存放在userInfo 可以拿來渲染
      this.userInfo = {
        userName: data.result.userName,
        description: data.result.description,
        avatar: data.result.avatar
      }
    },
    // 根據路由參數抓用戶資料
    async getOtherUser () {
      this.isLoading = true
      const { data } = await this.api.get('/users/' + this.$route.params.id)
      this.userPage.account = data.result.account
      this.userPage.description = data.result.description
      this.userPage.avatar = data.result.avatar
      this.userPage.userName = data.result.userName
      this.userPage._id = data.result._id
      this.userPage.tracks = data.result.tracks
      this.isLoading = false
      const nowUserFollowing = this.user.following
      // .some 陣列只要有其中一個符合條件就會回傳true
      if (nowUserFollowing !== undefined && nowUserFollowing.some(following => following.users === this.$route.params.id)) {
        this.followState = true
      } else {
        this.followState = false
      }
    },
    // 若登入者或未登入者 非當前頁面持有者 顯示此頁面公開音樂
    async getUserTracks () {
      try {
        const { data } = await this.api.get('/tracks?artist=' + this.$route.params.id)
        this.tracksCount = data.result.length
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    },
    // 若是當前登入者 會顯示包含私人音樂
    async getPrivate () {
      try {
        const { data } = await this.api.get('/tracks/private/' + this.user._id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.tracksCount = data.result.length
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    },
    // 追蹤與取消追蹤功能
    async follow () {
      try {
        await this.api.patch('/users/follow/' + this.user.id, { _id: this.$route.params.id }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        // 重新抓使用者資料
        await this.$store.dispatch('user/getUserInfo')
        await this.getOtherUser()
        this.$swal({
          icon: 'success',
          title: '成功',
          text: this.followState ? '成功追蹤' : '取消追蹤'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    async followById (id) {
      try {
        await this.api.patch('/users/follow/' + this.user.id, { _id: id }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        // 重新抓使用者資料
        await this.$store.dispatch('user/getUserInfo')
        await this.getOtherUser()
        await this.getUserFollow()
        await this.getMyFollow()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    async getUserFollow () {
      const { data } = await this.api.get('/users/' + this.$route.params.id + '/follow')
      this.userPage.followers = data.result.followers
      this.userPage.following = data.result.following
    },
    async getMyFollow () {
      const { data } = await this.api.get('/users/' + this.user._id + '/myfollow')
      this.myFollow.following = data.result.following
    },
    renderNew () {
      this.getOtherUser()
      this.getUserFollow()
      this.getMyFollow()
    },
    followCheck (id) {
      return this.myFollow.following.some(following => following.users._id === id)
    }
  },
  computed: {
    // 如果有抓到才去轉換
    splitText () {
      if (this.userPage.description) {
        return this.userPage.description.split(/[\r\n]/)[0] + '...'
      }
      return undefined
    },
    randomAvatar () {
      if (this.userPage.avatar === null) {
        return 'https://source.boringavatars.com/beam/' + this.userPage.account
      }
      return undefined
    }
  },
  async created () {
    // 表單內原先資料渲染
    this.form.userName = this.user.userName
    this.form.description = this.user.description
    this.form.cover = this.user.avatar

    // 讓進入管理頁的時候不要執行以下function
    const routeName = ['About', 'Mytracks', 'Myplaylists', 'Mylikes'].includes(this.$route.name)
    if (routeName) {
      this.getOtherUser()
      this.getUserFollow()
    }

    if (this.user._id.length > 0) {
      this.getUser()
      if (this.user.role !== 1) {
        this.getMyFollow()
        if (this.user._id === this.$route.params.id) {
          this.getPrivate()
        } else {
          this.getUserTracks()
        }
      }
    }
  }
}
</script>
