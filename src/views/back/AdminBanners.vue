<template>
  <div id="adminBanner" style="position: relative;">
    <v-overlay :value="isLoading" style="z-index:999">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <div class="white--text text-h5 mb-10">廣告管理</div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600" >
      <!-- 開啟dialog按鈕 -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="theme-btn" v-bind="attrs" v-on="on" absolute top right>新增廣告</v-btn>
      </template>
        <v-card class="pa-4">
          <v-card-text>
            <file-pond
              ref="pond"
              name="cover"
              label-idle="點擊或拖曳上傳封面"
              allow-multiple="false"
              accepted-file-types="image/jpeg, image/png"
              imageResizeTargetWidth="100"
              @updatefiles="getBannerFile($event)"
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="resetForm">取消</v-btn>
            <v-btn color="success" @click="addBanner">新增</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- banner展示 -->
    <v-row>
      <v-col cols="6" v-for="banner in banners" :key="banner._id">
        <v-img
          height="200"
          :src="banner.bannerImage"
          style="position:relative"
          lazy-src
          class="banner"
        >
          <v-btn icon absolute top right>
            <v-icon color="white" @click="deleteBanner(banner._id)">mdi-trash-can</v-icon>
          </v-btn>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    isLoading: false,
    loading: false,
    selection: 1,
    banners: [],
    banner: '',
    dialog: false
  }),

  methods: {
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    getBannerFile (event) {
      if (event[0]) {
        this.banner = event[0].file
      }
    },
    resetForm () {
      this.$refs.pond.removeFile()
      this.dialog = false
    },
    // 新增廣告
    async addBanner () {
      // 建立formdata
      const fd = new FormData()
      this.isLoading = true
      fd.append('cover', this.banner)
      try {
        await this.api.post('/banners', fd, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增成功'
        })
        this.getBanners()
        this.resetForm()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: error.response.data.message
        })
      }
      this.isLoading = false
    },
    // 刪除
    async deleteBanner (id) {
      this.$swal({
        icon: 'warning',
        title: '刪除確認',
        text: '確定要刪除此廣告嗎？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '刪除',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.delete('/banners/' + id, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          }).then(() => {
            this.getBanners()
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '刪除成功'
            })
          }).catch((error) => {
            this.$swal({
              icon: 'error',
              title: '失敗',
              text: error.response.data.message
            })
          })
        } else {
          this.$swal.close()
        }
      })
    },
    // 拿到最新輪播圖
    async getBanners () {
      try {
        const { data } = await this.api.get('/banners')
        this.banners = data.result
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  },
  created () {
    this.getBanners()
  }
}
</script>
<style lang="scss">
#adminBanner {
  .banner {
    border-radius: 4px;
  }
}
</style>
