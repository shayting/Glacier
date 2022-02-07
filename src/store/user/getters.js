// getters 取出vuex的資料可以經過一些運算再把資料丟出去

export const user = (state) => {
  return {
    // 如果用account來判斷 可能會有延遲問題 created時還沒取到資料 所以改用token
    isLogin: state.token.length > 0,
    isAdmin: state.role === 1,
    ...state
  }
}
