<template>
  <div class="white--text">
    <template>
      <v-card style="position: relative;">
        <!-- 新增/編輯表單 -->
        <v-dialog max-width="800" v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="theme-btn ml-4"
              dark
              v-bind="attrs"
              v-on="on"
              absolute
              bottom
              @click="openCreateForm"
            >新增活動</v-btn>
          </template>
          <v-card>
            <v-card-title>{{ formtitle }}</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
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
                    <v-text-field label="活動名稱" v-model="form.title"></v-text-field>
                    <v-text-field label="演出者" v-model="form.performer"></v-text-field>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.date"
                          label="活動日期"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="form.date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="地點" v-model="form.place"></v-text-field>
                    <v-text-field label="票價" v-model="form.price"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="簡介" v-model="form.content" class="text-wrapper"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="resetForm">取消</v-btn>
              <v-btn
                v-if="this.editedIndex === -1"
                color="success"
                @click="createEvent"
                :disabled="modalSubmitting"
              >新增</v-btn>
              <v-btn v-else color="success" :disabled="modalSubmitting" @click="editAccount">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card-title>
          活動管理
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <!-- 表格 -->
        <v-data-table :headers="headers" :items="events" :search="search">
          <template v-slot:item.active="{ item }">
            <v-switch v-model="item.active" readonly @click="changeState(item)"></v-switch>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="openEditForm(item)">mdi-pencil</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      search: '',
      headers: [
        {
          text: '活動名稱',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: '表演者', value: 'performer' },
        { text: '日期', value: 'date' },
        { text: '地點', value: 'place' },
        { text: '票價', value: 'price' },
        { text: '編輯', value: 'actions', sortable: false }
      ],
      events: [],
      modalSubmitting: false,
      // 要傳出去的表單
      form: {
        title: '',
        content: '',
        cover: null,
        date: '',
        performer: '',
        place: '',
        price: null
      },
      id: '',
      state: true,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? '新增活動' : '編輯活動'
    }
  },
  methods: {
    getCoverFiles (event) {
      this.form.cover = event[0].file
    },
    async getAllEvents () {
      try {
        const { data } = await this.api.get('/events/all')
        this.events = data.result
        console.log(this.events)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得活動資料失敗'
        })
      }
    },
    openEditForm (item) {
      // 將點擊到的帳號id存入data
      this.id = item._id
      this.editedIndex = 1
      this.dialog = true
      this.form.account = item.account
      this.form.email = item.email
      this.form.userName = item.userName
    },
    openCreateForm () {
      this.editedIndex = -1
    },
    resetForm () {
      this.dialog = false
      this.form = {
        account: '',
        password: '',
        email: '',
        userName: '',
        _id: ''
      }
    },
    async createEvent () {
      try {
        // 停用送出按鈕
        this.modalSubmitting = true
        // 建立formdata物件
        const fd = new FormData()
        for (const key in this.form) {
          // 把資料塞進formdata中
          fd.append(key, this.form[key])
        }
        await this.api.post('/events', fd, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增成功',
          confirmButtonColor: '#4DB6AC'
        })
        this.resetForm()
        // this.getAllEvents()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message,
          confirmButtonColor: '#4DB6AC'
        })
      }
      this.modalSubmitting = false
    },
    async editEvent () {
      this.modalSubmitting = true
      try {
        await this.api.patch('/events/' + this.id, { account: this.form.account, email: this.form.email, userName: this.form.userName }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.dialog = false
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '修改成功'
        })
        // this.getAllEvents()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.modalSubmitting = false
    },
    async changeState (item) {
      this.id = item._id
      let state = item.active
      state = !state
      try {
        await this.api.patch('/users/admin/' + this.id, { active: state }, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '修改成功'
        })
        // this.getAllEvents()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  async created () {
    this.getAllEvents()
  }
}
</script>
