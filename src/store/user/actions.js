// actions 執行非同步的function
import { api } from '@/plugins/axios.js'
import swal from 'sweetalert2'
import router from '@/router'
export const login = async ({ commit, dispatch }, form) => {
  try {
    const { data } = await api.post('/users/login', form)
    // commit同個module mutation的login
    commit('login', data.result)
    // 登入馬上抓資料
    await dispatch('getUserInfo')
    router.push('/')
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登入成功',
      confirmButtonColor: '#4DB6AC'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message,
      confirmButtonColor: '#4DB6AC'
    })
  }
}

export const logout = async ({ commit, state }) => {
  try {
    await api.delete('users/logout', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('logout')
    router.push('/')
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登出成功',
      confirmButtonColor: '#4DB6AC'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message,
      confirmButtonColor: '#4DB6AC'
    })
  }
}

export const getUserInfo = async ({ commit, state }) => {
  if (state.token.length === 0) return
  try {
    const { data } = await api.get('/users/me', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('getUserInfo', data.result)
  } catch (error) {
    commit('logout')
  }
}
