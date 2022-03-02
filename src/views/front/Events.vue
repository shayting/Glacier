<template>
  <div id="event" class="my-container mt-100 mb-100">
    <v-overlay :value="isLoading" style="z-index:999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row>
      <v-col cols="12" md="6" v-for="(event, index) in events" :key="index">
        <v-card class="mx-auto" max-width="800">
          <v-img :src="event.cover" height="200px"></v-img>
          <v-card-title>{{event.title}}</v-card-title>
          <v-card-subtitle>演出者：{{event.performer}}</v-card-subtitle>
          <div class="px-4">日期：{{new Date(event.date).toLocaleDateString().replace(/\//g, '／')}}</div>
          <div class="px-4">地點：{{event.place}}</div>
          <div class="px-4">票價：{{event.price}}</div>

          <v-card-actions>
            <v-btn color="teal lighten-2" text>官網購票</v-btn>

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
      isLoading: false,
      events: [{}],
      show: false
    }
  },
  methods: {
    async getAllEvents () {
      this.isLoading = true
      try {
        const { data } = await this.api.get('/events/all')
        this.events = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得活動資料失敗'
        })
      }
      this.isLoading = false
    }
  },
  async created () {
    this.getAllEvents()
  }
}
</script>
