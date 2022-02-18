<template>
  <v-btn small elevation="2" color="#d7f3f5"
    fab id="pagetop" v-show="scY > 300" @click="toTop"><v-icon small>mdi-triangle</v-icon>
  </v-btn>
</template>

<script>
export default {
  data () {
    return {
      scTimer: 0,
      scY: 0
    }
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 100)
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
#pagetop{
  position: fixed;
  right: 50px;
  bottom: 80px;
  cursor: pointer;
}
</style>
