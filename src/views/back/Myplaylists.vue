<template>
  <div class="my-10 my-container">
    <v-sheet color="secondary" min-height="500" class="myPlaylists mb-100 py-10" rounded style="position: relative;">
      <v-dialog width="500" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="theme-btn"
                absolute
                top
                right
                large
                v-on="on"
                v-bind="attrs"
              >
                <v-icon left>mdi-plus</v-icon>建立歌單
              </v-btn>
            </template>
            <v-card>
              <v-card-title>建立歌單</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-5">
                <v-row class="px-10">
                  <v-col cols="12">
                    <file-pond
                      name="cover"
                      label-idle="上傳封面"
                      allow-multiple="false"
                      accepted-file-types="image/jpeg, image/png"
                      imageResizeTargetWidth="100"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text class="my-5">
                <v-form class="px-10">
                  <v-row>
                    <v-col cols="12">
                      <v-row class="text-body-1 align-center">
                        <v-col cols="3">歌單名稱</v-col>
                        <v-col cols="9">
                          <v-text-field clearable></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="text-body-1">
                        <v-col cols="3">簡介</v-col>
                        <v-col cols="9">
                          <v-textarea outlined></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false" type="submit">Save</v-btn>
                <v-btn color="secondary" text @click="dialog = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
      </v-dialog>
      <div class="white--text text-h4 px-16 mb-10">我的歌單</div>
      <v-row class="px-16">
        <v-col cols="3" v-for="(playlist, index) in playlists" :key="index">
          <v-card class="pa-4">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-img :src="playlist.playlistSongs[0].cover">
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-icon x-large>mdi-play-circle-outline</v-icon>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
              </template>
            </v-hover>
            <v-card-title>{{ playlist.playlistName }}</v-card-title>
            <v-card-text class="d-flex justify-space-between">
              <span>{{ playlist.playlistSongs.length}}首歌</span>
              <v-btn class="theme-btn">查看全部</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>
<script>
export default {
  data () {
    return {
      playlists: [
        {
          playlistName: 'chill songs',
          playlistSongs: [{ name: 'chill', cover: 'https://source.boringavatars.com/marble/120/Maria%20Mitchell?square' }, { name: '', cover: '' }, { name: '', cover: '' }, { name: '', cover: '' }]
        },
        {
          playlistName: 'study songs',
          playlistSongs: [{ name: 'hello', cover: 'https://source.boringavatars.com/marble/1/?square' }]
        },
        {
          playlistName: 'work songs',
          playlistSongs: [{ name: 'bye', cover: 'https://source.boringavatars.com/marble/2/?square' }]
        },
        {
          playlistName: 'run songs',
          playlistSongs: [{ name: 'new', cover: 'https://source.boringavatars.com/marble/13/?square' }]
        },
        {
          playlistName: 'dirve songs',
          playlistSongs: [{ name: 'tint', cover: 'https://source.boringavatars.com/marble/1/?square' }]
        }
      ],
      dialog: false,
      myTracks: [
        { cover: 'https://source.boringavatars.com/marble/1/?square', title: '大風吹' },
        { cover: 'https://source.boringavatars.com/marble/2/?square', title: '污堵' },
        { cover: 'https://source.boringavatars.com/marble/3/?square', title: '花' },
        { cover: 'https://source.boringavatars.com/marble/4/?square', title: '秦皇島' },
        { cover: 'https://source.boringavatars.com/marble/5/?square', title: '殺死石家莊的人' },
        { cover: 'https://source.boringavatars.com/marble/6/?square', title: '海' },
        { cover: 'https://source.boringavatars.com/marble/6/?square', title: '海' },
        { cover: 'https://source.boringavatars.com/marble/6/?square', title: '海' },
        { cover: 'https://source.boringavatars.com/marble/6/?square', title: '海' },
        { cover: 'https://source.boringavatars.com/marble/6/?square', title: '海' },
        { cover: 'https://source.boringavatars.com/marble/6/?square', title: '海' },
        { cover: 'https://source.boringavatars.com/marble/6/?square', title: '海' },
        { cover: 'https://source.boringavatars.com/marble/6/?square', title: '海' }
      ]
    }
  }
}
</script>
