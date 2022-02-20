<template>
  <div id="singlePlaylist" class="my-container white--text mb-100 mt-100">
    <v-row>
      <v-col cols="3">
        <v-img v-if="playlist.cover" width="400" :src="playlist.cover"></v-img>
        <v-img v-else-if="songs.length > 0" :src="songs[0].song.cover"></v-img>
        <v-img v-else width="400" src="https://source.boringavatars.com/marble/1/?square"></v-img>
      </v-col>
      <v-col cols="9" style="position: relative;">
      <!-- 編輯歌單彈跳視窗 -->
        <v-dialog width="500" v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="theme-btn" absolute top right large v-on="on" v-bind="attrs">
              <v-icon left>mdi-pencil</v-icon>編輯歌單
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
        <div class="text-h4 mb-2">{{ playlist.title}}</div>
        <div v-if="playlist.songs" class="grey--text text-h6">{{ playlist.songs.length }}首歌</div>
        <span class="grey--text">Published: {{ playlist.createDate }}</span>
        <div class="mt-10 fs-20">{{ playlist.description }}</div>
        <!-- 歌單 -->
        <v-sheet color="secondary" min-height="500" class="mt-10 pa-4" rounded>
          <ul class="white--text" v-if="this.songs">
            <li class="d-flex align-center pa-2" style="height:100px;" v-for="(song, index) in songs" :key="song._id">
              <div class="text-h6">{{index + 1}}</div>
              <img class="ms-2" :src="song.song.cover">
              <div class="me-auto ms-6">
                <div class="text-h6">{{song.song.title}}</div>
                <div class="text-body-2">{{song.song.artist.userName}}</div>
              </div>
              <div class="d-flex align-center">
                <v-btn icon color="white">
                  <v-icon medium>mdi-play-circle</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium>mdi-cards-heart-outline</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium @click="deleteSong(song.song._id)">mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </li>
          </ul>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      playlist: {},
      songs: []
    }
  },
  methods: {
    async getPlaylist () {
      try {
        const { data } = await this.api.get('/playlists/' + this.$route.params.id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.playlist = data.result
        this.playlist.createDate = data.result.createDate.slice(0, 10)
        this.songs = this.playlist.songs
        console.log(this.songs)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得歌單失敗'
        })
      }
    },
    async deleteSong (id) {
      console.log(id)
      this.$swal({
        icon: 'warning',
        title: '刪除確認',
        text: '確定要從歌單移除此音樂',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '移除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.patch('/playlists/deletesong/' + this.$route.params.id, { _id: id },
            {
              headers: {
                authorization: 'Bearer ' + this.user.token
              }
            }).then(() => {
            this.getPlaylist()
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '刪除成功'
            })
          }).catch((error) => {
            this.$swal({
              icon: 'error',
              title: '失敗',
              text: error.message
            })
          })
        } else {
          this.$swal.close()
        }
      })
    }
  },
  async created () {
    this.getPlaylist()
  }
}
</script>
