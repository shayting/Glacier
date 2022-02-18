<template>
  <div class="my-container mt-100 mb-100">
    <v-row>
      <v-col cols="6" v-for="(event, index) in events" :key="index">
        <v-card class="mx-auto" max-width="600">
          <v-img :src="event.cover" height="200px"></v-img>

          <v-card-title>{{event.title}}</v-card-title>

          <v-card-subtitle>演出者：{{event.performer}}</v-card-subtitle>
          <div class="px-4">日期：{{new Date(event.date).toLocaleDateString().replace(/\//g, '／')}}</div>
          <div class="px-4">地點：{{event.place}}</div>
          <div class="px-4">票價：{{event.price}}</div>

          <v-card-actions>
            <v-btn color="teal lighten-2" text>Explore</v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{ event.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition hide-on-leave>
            <div v-show= "show">
              <v-divider></v-divider>

              <v-card-text>{{event.content}}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      events: [{}],
      show: false
    }
  },
  methods: {
    async getAllEvents () {
      try {
        const { data } = await this.api.get('/events/all')
        this.events = data.result
        console.log(this.events)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得活動資料失敗'
        })
      }
    }
  },
  async created () {
    this.getAllEvents()
  }
}
</script>
