<template>
  <v-container class="log-container xyCenter">
    <v-row class="xyCenter">
      <v-col cols="12" lg="8">
        <v-card outlined>
          <v-window v-model="step">
          <!-- 登入 -->
            <v-window-item :value="1">
              <v-row align="center">
                <v-col cols="6" class="pa-12 theme-btn xyCenter change-form">
                  <div class="xyCenter flex-column">
                    <h3 class="text-center my-10">還沒有註冊嗎？</h3>
                    <v-card-actions class="xyCenter">
                      <v-btn outlined rounded width="100" color="blue-gray" @click="step++">註冊</v-btn>
                    </v-card-actions>
                  </div>
                </v-col>
                <v-col cols="6" class="pa-16">
                  <v-form @submit.prevent="login">
                    <h2>會員登入</h2>
                    <v-text-field
                      class="my-2"
                      v-model="loginForm.account"
                      :error-messages="loginAccountErrors"
                      :counter="20"
                      label="帳號"
                      required
                      type="text"
                      @input="$v.loginForm.account.$touch()"
                      @blur="$v.loginForm.account.$touch()"
                    ></v-text-field>
                    <v-text-field
                      class="my-2"
                      v-model="loginForm.password"
                      :error-messages="loginPasswordErrors"
                      :counter="20"
                      label="密碼"
                      type="password"
                      required
                      @input="$v.loginForm.password.$touch()"
                      @blur="$v.loginForm.password.$touch()"
                    ></v-text-field>
                    <v-btn class="mr-4 mt-8 white--text" type="submit" rounded width="100" color="#66BB6A">登入</v-btn>
                  </v-form>
                </v-col>
              </v-row>
            </v-window-item>
            <!-- 註冊 -->
            <v-window-item :value="2">
              <v-row align="center">
                <v-col cols="6" class="pa-16">
                  <v-form @submit.prevent="register">
                    <h2>會員註冊</h2>
                    <v-text-field
                      class="my-2"
                      v-model="registerForm.account"
                      :error-messages="registerAccountErrors"
                      :counter="20"
                      label="帳號"
                      required
                      type="text"
                      @input="$v.registerForm.account.$touch()"
                      @blur="$v.registerForm.account.$touch()"
                    ></v-text-field>
                    <v-text-field
                    class="my-2"
                    v-model="registerForm.email"
                    :error-messages="registerEmailErrors"
                    label="信箱"
                    required
                    type="text"
                    @input="$v.registerForm.email.$touch()"
                    @blur="$v.registerForm.email.$touch()"
                    >
                    </v-text-field>
                    <v-text-field
                      class="my-2"
                      v-model="registerForm.password"
                      :error-messages="registerPasswordErrors"
                      :counter="20"
                      label="密碼"
                      type="password"
                      required
                      @input="$v.registerForm.password.$touch()"
                      @blur="$v.registerForm.password.$touch()"
                    ></v-text-field>
                    <v-text-field
                      class="my-2"
                      v-model="registerForm.confirmPassword"
                      :error-messages="confirmPasswordErrors"
                      :counter="20"
                      label="確認密碼"
                      type="password"
                      required
                      @input="$v.registerForm.confirmPassword.$touch()"
                      @blur="$v.registerForm.confirmPassword.$touch()"
                    ></v-text-field>
                    <v-btn class="mr-4 mt-8 white--text" type="submit" rounded width="100" color="#66BB6A">註冊</v-btn>
                  </v-form>
                </v-col>
                <v-col cols="6" class="pa-12 theme-btn xyCenter change-form">
                  <div class="xyCenter flex-column">
                    <h3 class="text-center my-10">已經註冊過了？</h3>
                    <v-card-actions class="xyCenter">
                      <v-btn outlined rounded width="100" color="blue-gray" @click="step++">登入</v-btn>
                    </v-card-actions>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.change-form {
  height: 550px;
  background: #d7f3f5 !important;
}
.log-container{
  height: 100vh!important;
}
</style>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  // 表單驗證
  validations: {
    registerForm: {
      account: { required, minLength: minLength(4), maxLength: maxLength(20) },
      password: { required, minLength: minLength(4), maxLength: maxLength(20) },
      email: { required, email },
      confirmPassword: { required, sameAsPassword: sameAs('password') }
    },
    loginForm: {
      account: { required, minLength: minLength(4), maxLength: maxLength(20) },
      password: { required, minLength: minLength(4), maxLength: maxLength(20) }
    }
  },
  data: () => ({
    step: 0,
    registerForm: {
      account: '',
      password: '',
      email: '',
      confirmPassword: ''
    },
    loginForm: {
      account: '',
      password: ''
    }
  }),

  computed: {
    registerAccountErrors () {
      const errors = []
      if (!this.$v.registerForm.account.$dirty) return errors
      !this.$v.registerForm.account.minLength && errors.push('帳號長度至少4個字')
      !this.$v.registerForm.account.maxLength && errors.push('帳號長度不超過20個字')
      !this.$v.registerForm.account.required && errors.push('必填欄位')
      return errors
    },
    registerPasswordErrors () {
      const errors = []
      if (!this.$v.registerForm.password.$dirty) return errors
      !this.$v.registerForm.password.minLength && errors.push('密碼長度至少4個字')
      !this.$v.registerForm.password.maxLength && errors.push('密碼長度不超過20個字')
      !this.$v.registerForm.password.required && errors.push('必填欄位')
      return errors
    },
    registerEmailErrors () {
      const errors = []
      if (!this.$v.registerForm.email.$dirty) return errors
      !this.$v.registerForm.email.email && errors.push('信箱格式不符')
      !this.$v.registerForm.email.required && errors.push('必填欄位')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.registerForm.confirmPassword.$dirty) return errors
      !this.$v.registerForm.confirmPassword.sameAsPassword && errors.push('請輸入相同密碼')
      !this.$v.registerForm.confirmPassword.required && errors.push('必填欄位')
      return errors
    },
    loginAccountErrors () {
      const errors = []
      if (!this.$v.loginForm.account.$dirty) return errors
      !this.$v.loginForm.account.minLength && errors.push('帳號長度至少4個字')
      !this.$v.loginForm.account.maxLength && errors.push('帳號長度不超過20個字')
      !this.$v.loginForm.account.required && errors.push('必填欄位')
      return errors
    },
    loginPasswordErrors () {
      const errors = []
      if (!this.$v.loginForm.password.$dirty) return errors
      !this.$v.loginForm.password.minLength && errors.push('密碼長度至少4個字')
      !this.$v.loginForm.password.maxLength && errors.push('密碼長度不超過20個字')
      !this.$v.loginForm.password.required && errors.push('必填欄位')
      return errors
    }
  },
  watch: {
    step (value) {
      if (value === 1) {
        this.$router.replace({ params: { action: 'login' } }).catch(() => {})
        this.$v.registerForm.$reset()
      } else {
        this.$router.replace({ params: { action: 'register' } }).catch(() => {})
        this.$v.loginForm.$reset()
      }
    }
  },
  methods: {
    async register () {
      this.$v.registerForm.$touch()
      // 判斷是否所有欄位都通過驗證（true 驗證未通過）
      if (this.$v.registerForm.$invalid) return
      try {
        await this.api.post('/users', { account: this.registerForm.account, password: this.registerForm.password, email: this.registerForm.email })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '註冊成功',
          confirmButtonColor: '#4DB6AC'
        })
        // 導向登入頁
        this.step--
        // 清空欄位
        this.registerForm.account = ''
        this.registerForm.password = ''
        this.registerForm.email = ''
        this.registerForm.confirmPassword = ''
        // 重置驗證
        this.$v.registerForm.$reset()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message,
          confirmButtonColor: '#4DB6AC'
        })
      }
    },
    login () {
      // dispatch('module名/function',丟出去的資料)呼叫 action
      this.$store.dispatch('user/login', this.loginForm)
      // try {
      //   const { data } = await this.api.post('/users/login', this.loginForm)
      //   this.$store.commit('user/login', data.result)
      //   console.log(data.result)
      //   // 導回首頁
      //   this.$router.push('/')
      // } catch (error) {
      //   console.log(error)
      // }
    }
  }
}
</script>
