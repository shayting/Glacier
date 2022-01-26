<template>
<v-app>
  <Header></Header>``
  <router-view></router-view>
</v-app>

</template>

<script>

import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data: () => ({
    //
  })
}
</script>
