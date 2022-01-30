<template>
  <div>
    <v-simple-table class="my-12">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left text-h6 black--text">即時熱門</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in music" :key="item.name">
            <td class="d-flex justify-space-between align-center">
              <div class="xyCenter">
                <div style="width: 25px;" class="text-end">{{ index + 1 }} - </div>
                <v-img width="46" src="https://f4.bcbits.com/img/a0976633149_10.jpg"></v-img>
                <div class="px-2">{{ item.name }}</div>
              </div>
              <div>
                <v-btn icon>
                  <v-icon large>mdi-play-circle</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon medium>mdi-cards-heart-outline</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon medium>mdi-plus</v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      music: [
        {
          name: '浴室'
        },
        {
          name: '海浪'
        },
        {
          name: '花'
        },
        {
          name: '模樣'
        },
        {
          name: '捲煙'
        },
        {
          name: '擋一根'
        },
        {
          name: '大風吹'
        },
        {
          name: '爛泥'
        },
        {
          name: '玫瑰色的你'
        },
        {
          name: '關於我愛你'
        }
      ]
    }
  }
}
</script>
