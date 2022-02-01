// getters 取出vuex的資料可以經過一些運算再把資料丟出去

export const user = (state) => {
  return {
    isLogin: state.account.length > 0,
    isAdmin: state.role === 1,
    ...state
  }
}

// this.$store.getters['user/user'].isLogin
