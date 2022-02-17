<template>
  <div class="my-container mt-100 mb-100 white--text">
    <div class="text-h4" style="margin-bottom: 50px;">Events</div>
    <v-row>
      <v-col cols="12" md="6" v-for="(event,index) in events" :key="index">
        <v-card elevation="2">
          <div class="eventCoverBox">
          <v-img class="eventCover"
            :src="event.cover"
          ></v-img>
          </div>
          <v-card-title class="text-h6">{{event.title}}</v-card-title>
          <v-card-text class="black--text text-body-1">
            <div>
              演出日期 :
              <span>{{ new Date(event.date).toLocaleDateString().replace(/\//g, '／')}}</span>
            </div>
            <div>
              演出者 :
              <span>{{event.performer}}</span>
            </div>
            <div>
              票價 :
              <span>{{event.price}}</span>
            </div>
            <div style="margin-bottom: 30px;">
              簡介 :
            </div>
            <div class="text-wrapper">
              {{event.content}}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn large color="orange" text block>售票網站</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      events: [{}]
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
