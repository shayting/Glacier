<template>
  <div id="member" class="my-container white--text">
    <div>
      <v-row>
        <v-col cols="3">
          <v-avatar size="200" class="ma-10">
            <img src="https://source.boringavatars.com/beam/Shay" />
          </v-avatar>
        </v-col>
        <v-col cols="9" class="d-flex justify-space-between">
          <div class="ma-10 text-h3">Shay</div>
          <div class="d-flex ma-10">
            <v-dialog v-model="dialog" width="500" class="ma-10">
              <template v-slot:activator="{ on, attrs }">
                <div class="text-center mx-5">
                  <div class="fs-20">音樂</div>
                  <div>0</div>
                </div>
                <div class="text-center mx-5" v-on="on" v-bind="attrs">
                  <div class="fs-20">粉絲</div>
                  <div>12</div>
                </div>
                <div class="text-center mx-5" v-on="on" v-bind="attrs">
                  <div class="fs-20">追蹤中</div>
                  <div>0</div>
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
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      tab: null,
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
  }
}
</script>
