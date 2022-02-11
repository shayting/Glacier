<template>
  <div class="white--text">
    <template>
      <v-card style="position: relative;">
        <!-- 新增/編輯表單 -->
        <v-dialog max-width="500" v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="theme-btn" dark v-bind="attrs" v-on="on" absolute bottom @click="createAccount">新增帳號</v-btn>
          </template>
          <v-card>
            <v-card-title>{{ formtitle }}</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="帳號"></v-text-field>
                    <v-text-field label="密碼" v-if="editedIndex === -1"></v-text-field>
                    <v-text-field label="信箱"></v-text-field>
                    <v-text-field label="用戶名稱" v-if="editedIndex !== -1"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn>取消</v-btn>
              <v-btn color="success">保存</v-btn>
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
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editAccount(item)">mdi-pencil</v-icon>
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
        { text: '編輯', value: 'actions', sortable: false }
      ],
      accounts: []
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
        console.log(data.result)
        this.accounts = data.result.map(r => {
          if (r.userName === undefined || r.userName === null) {
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
    editAccount (item) {
      this.editedIndex = 1
      this.dialog = true
    },
    createAccount () {
      this.editedIndex = -1
    }
  },
  async created () {
    this.getAllUsers()
  }
}
</script>
