<template>
  <div class="white--text">
    <template>
      <v-card style="position: relative;">
        <!-- 新增/編輯表單 -->
        <v-dialog max-width="500" v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="theme-btn ml-4" dark v-bind="attrs" v-on="on" absolute bottom @click="openCreateForm">新增帳號</v-btn>
          </template>
          <v-card>
            <v-card-title>{{ formtitle }}</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="帳號" v-model="form.account"></v-text-field>
                    <v-text-field label="密碼" v-model="form.password" v-if="editedIndex === -1"></v-text-field>
                    <v-text-field label="信箱" v-model="form.email"></v-text-field>
                    <v-text-field label="用戶名稱" v-model="form.userName" v-if="editedIndex !== -1"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="resetForm">取消</v-btn>
              <v-btn v-if="this.editedIndex === -1" color="success" @click="createAccount" :disabled="modalSubmitting">新增</v-btn>
              <v-btn v-else color="success" :disabled="modalSubmitting" @click="editAccount">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card-title>
          帳號管理
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
        <v-data-table :headers="headers" :items="accounts" :search="search">
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
          text: '帳號',
          align: 'start',
          sortable: false,
          value: 'account'
        },
        { text: '使用者名稱', value: 'userName' },
        { text: '電子信箱', value: 'email' },
        { text: '啟用狀態', value: 'active' },
        { text: '編輯', value: 'actions', sortable: false }
      ],
      accounts: [],
      modalSubmitting: false,
      form: {
        account: '',
        password: '',
        email: '',
        userName: ''
      },
      id: '',
      state: true
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? '新增帳號' : '編輯帳號'
    }
  },
  methods: {
    async getAllUsers () {
      try {
        const { data } = await this.api.get('/users/all', {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.accounts = data.result.map(r => {
          if (r.userName.length === 0 || r.userName === null) {
            r.userName = '未設定'
          }
          return r
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得會員資料失敗'
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
    async createAccount () {
      try {
        // 停用送出按鈕
        this.modalSubmitting = true
        await this.api.post('/users', { account: this.form.account, password: this.form.password, email: this.form.email })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '註冊成功',
          confirmButtonColor: '#4DB6AC'
        })
        this.resetForm()
        this.getAllUsers()
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
    async editAccount () {
      this.modalSubmitting = true
      try {
        await this.api.patch('/users/admin/' + this.id, { account: this.form.account, email: this.form.email, userName: this.form.userName }, {
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
        this.getAllUsers()
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
        this.getAllUsers()
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
    this.getAllUsers()
  }
}
</script>
