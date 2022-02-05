<template>
  <div id="singleTrack" class="my-container white--text">
    <v-row>
      <v-col cols="3" class="py-4">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-img
              width="400"
              src="https://source.boringavatars.com/marble/120/Maria%20Mitchell?square"
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
            <img src="https://source.boringavatars.com/beam/Shay" />
          </v-avatar>
          <router-link to="/" class="ms-4 me-auto">
            <div>Shay</div>
          </router-link>
          <v-btn class="theme-btn">追蹤</v-btn>
        </div>
      </v-col>
      <v-col cols="9" style="position: relative;">
        <div class="text-h4 mb-5">大風吹</div>
        <v-divider color="grey"></v-divider>
        <v-chip x-small class="mt-4">Rock</v-chip>
        <div class="grey--text mt-4">Published:2022-01-22</div>
        <div class="mt-4 text-h6">喜歡</div>
        <span class="primary-text text-h4">126</span>
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
          <v-btn fab dark x-small color="red">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col cols="6">
        <v-card>
          <v-tabs fixed-tabs v-model="tab" dark>
            <v-tab href="#intro">介紹</v-tab>
            <v-tab href="#lyric">歌詞</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="white--text" dark>
            <v-tab-item value="intro">
              <v-card-text>
                這是一首有關大風吹的歌
              </v-card-text>
            </v-tab-item>
            <v-tab-item value="lyric">
              <v-card-text>
                大風吹著誰 誰就倒霉
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="secondary" min-height="500px">
          <v-card-title></v-card-title>
          <v-card-text></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    overlay: false,
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
    tab: null
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
  }
}
</script>
