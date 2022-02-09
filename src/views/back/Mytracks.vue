<template>
  <div class="my-container my-10">
    <v-card
      elevation="2"
      min-height="500"
      color="secondary"
      class="white--text py-10 mb-100"
      style="position: relative;"
    >
      <v-card-title class="mb-10 px-16 text-h4 py-">我的音樂</v-card-title>
      <v-card-text class="white--text px-16 text-body-1">
        <div>
          <v-dialog width="1000" v-model="dialog" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="theme-btn mt-10 me-12"
                absolute
                top
                right
                large
                v-on="on"
                v-bind="attrs"
              >
                <v-icon left>mdi-cloud-upload</v-icon>上傳音樂
              </v-btn>
            </template>
            <!-- 新增表單 -->
            <v-card>
              <v-card-title>新增音樂</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-5">
                <v-row class="px-10">
                  <v-col cols="6">
                    <file-pond
                      name="cover"
                      label-idle="點擊或拖曳上傳封面"
                      allow-multiple="false"
                      accepted-file-types="image/jpeg, image/png"
                      imageResizeTargetWidth="100"
                      @updatefiles="getCoverFiles($event)"
                    />
                  </v-col>
                  <v-col cols="6">
                    <file-pond
                      name="track"
                      label-idle="點擊或拖曳上傳音樂"
                      allow-multiple="false"
                      accepted-file-types="audio/mpeg"
                      @updatefiles="getFileFiles($event)"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text class="my-5">
                <v-form class="px-10" v-model="valid" ref="form">
                  <v-row>
                    <v-col cols="6">
                      <v-row class="text-body-1 align-center">
                        <v-col cols="3">歌名</v-col>
                        <v-col cols="9">
                          <v-text-field clearable v-model="form.title" required :rules="uploadRule"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="text-body-1">
                        <v-col cols="3">簡介</v-col>
                        <v-col cols="9">
                          <v-textarea outlined v-model="form.description"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row class="text-body-1 align-center">
                        <v-col cols="3">類型</v-col>
                        <v-col cols="9">
                          <v-select
                            v-model="form.type"
                            :items="items"
                            item-text="type"
                            required
                            :rules="uploadRule"
                            placeholder="請選擇類型"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row class="text-body-1">
                        <v-col cols="3">歌詞</v-col>
                        <v-col cols="9">
                          <v-textarea outlined v-model="form.lyric"></v-textarea>
                          <v-switch v-model="form.private" label="私人"></v-switch>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click="resetForm">取消</v-btn>
                <v-btn
                  color="success"
                  text
                  @click="submitModal"
                  type="submit"
                  :disabled="!valid || modalSubmitting || form.cover === null || form.file === null"
                >新增</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="ma-10 text-h3"></div>
          <div class="mx-10"></div>
        </div>
      </v-card-text>
      <v-card-text class="px-16">
        <v-row>
          <v-col cols="3" v-for="(track, index) in tracks" :key="index">
            <v-card class="px-4 py-4">
              <v-chip small class="ma-2">{{ track.private? '不公開': '公開'}}</v-chip>
              <div class>
                <v-img :src="track.cover" width="100%" />
                <div class="text-h6 my-2">{{ track.title }}</div>
              </div>
              <div class="d-flex justify-end">
                <v-btn class="theme-btn" @click="editTrack(index)">編輯</v-btn>
                <v-btn color="secondary ms-2">刪除</v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>

export default {
  data () {
    return {
      valid: true,
      uploadRule: [
        v => !!v || '必填欄位'
      ],
      modalSubmitting: false,
      tracks: [],
      form: {
        title: '',
        private: false,
        type: '',
        description: '',
        lyric: '',
        cover: null,
        file: null,
        uploadDate: Date.now(),
        _id: '',
        index: -1
      },
      dialog: false,
      items: [
        { type: 'Rock' },
        { type: 'Hip hop / Rap' },
        { type: 'Electronic' },
        { type: 'Pop' },
        { type: 'Folk' },
        { type: 'Alternative' },
        { type: 'Post rock' },
        { type: 'Metal' },
        { type: 'Punk' },
        { type: 'Reggae / Funk' },
        { type: 'Classic' },
        { type: 'Blues' },
        { type: 'Jazz' }
      ],
      myTracks: [
        { cover: 'https://source.boringavatars.com/marble/1/?square', title: '大風吹' },
        { cover: 'https://source.boringavatars.com/marble/2/?square', title: '污堵' },
        { cover: 'https://source.boringavatars.com/marble/3/?square', title: '花' },
        { cover: 'https://source.boringavatars.com/marble/4/?square', title: '秦皇島' },
        { cover: 'https://source.boringavatars.com/marble/5/?square', title: '殺死石家莊的人' },
        { cover: 'https://source.boringavatars.com/marble/6/?square', title: '海' }
      ]
    }
  },
  methods: {
    getCoverFiles (event) {
      this.form.cover = event[0].file
    },
    getFileFiles (event) {
      this.form.file = event[0].file
    },
    async submitModal () {
      if (this.form.cover === null || this.form.file === null || !this.valid) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      }
      // 停用送出按鈕
      this.modalSubmitting = true
      // 建立formdata物件
      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          // 把資料塞進formdata中
          fd.append(key, this.form[key])
        }
      }
      try {
        if (this.form._id.length === 0) {
          const { data } = await this.api.post('/tracks', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.tracks.push(data.result)
        } else {
          const { data } = await this.api.patch('/tracks/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.tracks[this.form.index] = { ...this.form, image: data.result.image }
          this.getTracks()
        }
        this.dialog = false
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增成功'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.modalSubmitting = false
    },
    resetForm () {
      if (this.modalSubmitting) {
        return
      }
      this.form = {
        artist: this.user.account,
        title: '',
        private: false,
        type: '',
        description: '',
        lyric: '',
        cover: null,
        file: null,
        date: '',
        _id: '',
        index: -1
      }
      this.$refs.form.resetValidation()
      this.dialog = false
    },
    editTrack (index) {
      this.form = { ...this.tracks[index], cover: null, file: null, index }
      this.dialog = true
      console.log('hello')
    },
    async getTracks () {
      try {
        const { data } = await this.api.get('/tracks', {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        console.log(data)
        this.tracks = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得音樂失敗'
        })
      }
    }
  },
  async created () {
    this.getTracks()
  }
}

</script>
