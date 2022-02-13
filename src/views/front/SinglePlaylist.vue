<template>
  <div id="singlePlaylist" class="my-container white--text mb-100 mt-100">
    <v-row>
      <v-col cols="3">
        <v-img width="400" src="https://source.boringavatars.com/marble/1/?square"></v-img>
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
        <div class="text-h4 mb-2">Chill Songs</div>
        <div class="grey--text text-h6">5首歌</div>
        <span class="grey--text">Published: 2022/02/07</span>
        <div class="mt-10 fs-20">這是一個很chill的歌單~~</div>
        <!-- 歌單 -->
        <v-sheet color="secondary" min-height="500" class="mt-10 pa-4" rounded>
          <ul class="white--text">
            <li class="d-flex align-center pa-2" style="height:100px;">
              <div class="text-h6">1</div>
              <img class="ms-2" src="https://source.boringavatars.com/marble/1/?square">
              <div class="me-auto ms-6">
                <div class="text-h6">Lover boy</div>
                <div class="text-body-2">Phum virit</div>
              </div>
              <div class="d-flex align-center">
                <v-btn icon color="white">
                  <v-icon medium>mdi-play-circle</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium>mdi-cards-heart-outline</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </li>
            <li class="d-flex align-center pa-2" style="height:100px;">
              <div class="text-h6">2</div>
              <img class="ms-2" src="https://source.boringavatars.com/marble/1/?square">
              <div class="me-auto ms-6">
                <div class="text-h6">Lover boy</div>
                <div class="text-body-2">Phum virit</div>
              </div>
              <div class="d-flex align-center">
                <v-btn icon color="white">
                  <v-icon medium>mdi-play-circle</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium>mdi-cards-heart-outline</v-icon>
                </v-btn>
                <v-btn icon color="white">
                  <v-icon medium>mdi-trash-can</v-icon>
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
      dialog: false
    }
  }
}
</script>
