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
  state._id = data._id
  // ---
  state.userName = data.userName
  state.avatar = data.avatar
  state.description = data.description
  state.tracks = data.tracks
  state.events = data.events
  state.likes = data.likes
  state.playlists = data.playlists
  state.following = data.following
  state.followers = data.followers
}

export const extend = (state, data) => {
  state.token = data
}
