<template>
  <div class="my-container">
    <v-card elevation="2" min-height="500" color="secondary" class="white--text aboutMe mb-100">
      <v-card-title class="my-5 my-sm-10 px-8 px-sm-16 pt-5 pt-sm-10 text-h4">About me</v-card-title>
      <v-card-text class="white--text px-8 px-sm-16 text-body-1 text-wrapper">{{ userPage.description }}</v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userPage: {}
    }
  },
  methods: {
    async getOtherUser () {
      const { data } = await this.api.get('/users/' + this.$route.params.id)
      this.userPage = {
        description: data.result.description
      }
    }
  },
  async created () {
    this.getOtherUser()
  }
}
</script>
