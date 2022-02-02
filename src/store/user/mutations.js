// state = user module 的 state
// this.state = vuex root state
// this.state.module名 ＝ 其他module 的state

// 將傳進來的data寫進vuex
export const login = (state, data) => {
  state.token = data.token
  state.account = data.account
  state.role = data.role
  state.email = data.email
}

export const logout = (state, data) => {
  state.token = ''
  state.account = ''
  state.role = 0
  state.email = ''
}

export const getUserInfo = (state, data) => {
  state.account = data.account
  state.role = data.role
  state.email = data.email
}

export const extend = (state, data) => {
  state.token = data
}
