<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Front',
  components: {
    Header
  },
  data: () => ({
    //
  })
}
</script>
