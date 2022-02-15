<template>
<v-app>
  <!--若沒有綁定:key 會視同一個元件所以不會更新  -->
  <router-view :key="$route.fullPath"></router-view>
</v-app>

</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  async created () {
    this.$store.dispatch('user/getUserInfo')
  }
}
</script>
