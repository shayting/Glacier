// mixin 放所有元件都會用到的東西
export default {
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  }
}
