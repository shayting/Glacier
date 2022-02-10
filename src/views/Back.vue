<template>
  <div>
    <Header></Header>
    <div v-if="user.role === 0" id="back" class="my-container white--text">
      <div>
        <v-row>
          <v-col cols="3">
            <v-avatar size="200" class="ma-10">
              <img src="https://source.boringavatars.com/beam/Shay" />
            </v-avatar>
          </v-col>
          <v-col cols="9" class="d-flex justify-space-between">
            <div style="position: relative;width:500px;">
            <!-- 編輯個人資料表單 -->
              <v-dialog width="500" v-model="dialog2">
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
                      <img src="https://source.boringavatars.com/beam/Shay" />
                    </v-avatar>
                    <div class="mt-5 avatar-upload" style="width:100px;">
                      <file-pond
                        v-if="changeAvatar"
                        name="avatar"
                        label-idle="上傳圖片"
                        allow-multiple="false"
                        accepted-file-types="image/jpeg, image/png"
                        stylePanelLayout="compact circle"
                        imageResizeTargetWidth="200"
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
                      type="submit" :disabled="modalSubmitting"
                    >Save</v-btn>
                    <v-btn color="secondary" text @click="dialog2 = false">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <div class="ma-10 text-h3">{{ user.account }}</div>
              <div class="mx-10">{{ userAbout }}</div>
            </div>
            <div class="d-flex my-10">
              <v-dialog v-model="dialog" width="500" class="ma-10">
                <template v-slot:activator="{ on, attrs }">
                  <div class="text-center ms-8">
                    <div class="fs-20">音樂</div>
                    <div>{{user.tracks.length}}</div>
                  </div>
                  <div class="text-center ms-8" v-on="on" v-bind="attrs">
                    <div class="fs-20">粉絲</div>
                    <div>{{ user.followers.length }}</div>
                  </div>
                  <div class="text-center ms-8" v-on="on" v-bind="attrs">
                    <div class="fs-20">追蹤中</div>
                    <div>{{ user.following.length }}</div>
                  </div>
                </template>
                <v-card>
                  <v-tabs fixed-tabs v-model="tab">
                    <v-tab href="#followers">粉絲</v-tab>
                    <v-tab href="#following">追蹤中</v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                    <v-tab-item value="followers">
                      <v-card-text>
                        <ul class="ps-0">
                          <li
                            class="d-flex align-center justify-space-between my-2"
                            v-for="(follower, index) in followers"
                            :key="index"
                          >
                            <div class="d-flex align-center">
                              <v-avatar>
                                <img :src="follower.image" />
                              </v-avatar>
                              <div class="fs-20 mx-5">{{ follower.name }}</div>
                            </div>
                            <v-btn
                              width="80"
                              v-if="follower.following"
                              color="primary"
                              outlined
                              elevation="2"
                            >追蹤中</v-btn>
                            <v-btn width="80" v-else color="primary" elevation="2">追蹤</v-btn>
                          </li>
                        </ul>
                      </v-card-text>
                    </v-tab-item>
                    <v-tab-item value="following">
                      <v-card-text>
                        <ul class="ps-0">
                          <li
                            v-for="(following, index) in followings"
                            :key="index"
                            class="d-flex align-center justify-space-between my-2"
                          >
                            <div class="d-flex align-center">
                              <v-avatar>
                                <img :src="following.image" />
                              </v-avatar>
                              <div class="fs-24 mx-5">{{ following.name }}</div>
                            </div>
                            <v-btn
                              width="80"
                              v-if="following.following"
                              color="primary"
                              outlined
                              elevation="2"
                            >追蹤中</v-btn>
                            <v-btn width="80" v-else color="primary" elevation="2">追蹤</v-btn>
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
            </div>
          </v-col>
        </v-row>
      </div>
      <v-app-bar color="secondary" elevation="2" class="d-flex justify-center" rounded>
        <div class="px-10 fs-20 back-item">
          <router-link :to="'/back/user/' + user._id">關於</router-link>
        </div>
        <div class="px-10 fs-20 back-item">
          <router-link :to="'/back/user/' + user._id + '/tracks'">音樂</router-link>
        </div>
        <div class="px-10 fs-20 back-item">
          <router-link :to="'/back/user/' + user._id + '/playlists'">歌單</router-link>
        </div>
        <div class="px-10 fs-20 back-item">
          <router-link :to="'/back/user/' + user._id + '/likes'">喜歡</router-link>
        </div>
        <div class="px-10 fs-20 back-item">
          <router-link :to="'/back/user/' + user._id + '/events'">活動</router-link>
        </div>
      </v-app-bar>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  name: 'Back',
  components: {
    Header
  },
  data () {
    return {
      form: {
        avatar: null,
        userName: '',
        description: ''
      },
      userInfo: [],
      dialog: false,
      dialog2: false,
      modalSubmitting: false,
      tab: null,
      changeAvatar: false,
      // 假資料
      userAbout: 'hi 我是Shay 最喜歡的樂團是草東沒有派對',
      profileEdit: {
        userName: 'Shay',
        userAbout: 'hi 我是Shay 最喜歡的樂團是草東沒有派對'
      },
      // 追蹤假資料
      followers: [
        { name: 'Shay', image: 'https://source.boringavatars.com/beam/Shay', following: true },
        { name: 'Teddy', image: 'https://source.boringavatars.com/beam/Teddy', following: false },
        { name: 'Ken', image: 'https://source.boringavatars.com/beam/Ken', following: false },
        { name: 'Amber', image: 'https://source.boringavatars.com/beam/Amber', following: true }
      ],
      followings: [
        { name: 'Ben', image: 'https://source.boringavatars.com/beam/Ben', following: true },
        { name: 'Ray', image: 'https://source.boringavatars.com/beam/Ray', following: true },
        { name: 'Coco', image: 'https://source.boringavatars.com/beam/Coco', following: true },
        { name: 'Sam', image: 'https://source.boringavatars.com/beam/Sam', following: true }
      ]
    }
  },
  methods: {
    getAvatar (event) {
      this.form.avatar = event[0].file
    },
    async submitModal () {
      console.log('submitting')
      // 停用送出按鈕
      this.modalSubmitting = true
      // 建立formdata物件
      const fd = new FormData()
      for (const key in this.form) {
        fd.append(key, this.form[key])
      }
      try {
        console.log(fd)
        console.log(this.user._id)
        const { data } = await this.api.patch('/users/' + this.user._id, fd, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        console.log(data.result)
        this.userInfo.push(data.result)
        this.dialog = false
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增成功'
        })
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.modalSubmitting = false
    }
  }
}
</script>
