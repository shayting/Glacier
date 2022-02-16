<template>
  <v-card dark color="my-12" class="white--text">
    <v-card-title class="text-center justify-center py-6">
      <div class="font-weight-bold fs-20 basil--text">
        歌單推薦
      </div>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      dark
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item.tag"
      >
        {{ item.tag }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" dark>
      <v-tab-item
        v-for="(item,index) in items"
        :key="index"
      >
        <v-card
          flat
        >
        <v-row class="pa-4">
          <v-col cols="12" md="4">
            <v-img width="300px" :src="item.src" class="mx-auto"></v-img>
          </v-col>
          <v-col cols="12" md="8" class="d-flex flex-column justify-space-between list-content">
            <v-card-text class="text-center text-h4">{{ item.title }}</v-card-text>
            <v-card-text class="text-center">{{ item.content }}</v-card-text>
            <v-btn block elevation="2" class="theme-btn mx-auto" max-height="40">去聽聽</v-btn>
          </v-col>
        </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      tab: null,
      items: [
        { tag: '流行熱推', src: 'https://p1.music.126.net/mfYxWU5mq2KMURFZKps36g==/109951163346749380.jpg', title: '流行Top 20', content: '流行音樂本期內容有....' }, { tag: '搖滾熱推', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifQUurSaRUsGoJdsVO70KnvjOGG8gk1ryxA&usqp=CAU', title: '搖滾Top 50' }, { tag: '民謠熱推', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQES-HYe96leE142iWVptmr8K5IDu4BD2Jmbg&usqp=CAU', title: '民謠Top 20' }, { tag: '另類熱推', src: 'https://blow.streetvoice.com/wp-content/uploads/2019/06/%E5%82%BB%E5%AD%90%E8%88%87%E7%99%BD%E7%97%B4.jpg', title: '另類Top 20' }
      ]
    }
  }
}
</script>
