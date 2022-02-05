<template>
  <div class="instantRank my-12 d-flex flex-column justify-center">
    <ul>
      <li class="py-4 fs-20">即時熱門</li>
      <li v-for="(item, index) in music" :key="index" class="d-flex align-center">
        <div class="instantNum">{{ index + 1 }}</div>
        <img src="https://f4.bcbits.com/img/a0976633149_10.jpg" />
        <div class="me-auto">
          <div class="ms-2">{{ item.name }}</div>
          <div class="ms-2 text-body-2">{{ item.artist }}</div>
        </div>
        <div class="d-flex align-center">
          <v-btn icon>
            <v-icon medium>mdi-play-circle</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon medium>mdi-cards-heart-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon medium>mdi-plus</v-icon>
          </v-btn>
        </div>
      </li>
    </ul>
    <v-btn class="theme-btn mx-auto mt-5" elevation="2" style="width: 100px;">
      more
    </v-btn>
  </div>
</template>
<style lang="scss">
.instantRank {
  background: #ffffff;
  padding-bottom: 20px;
  border-radius: 4px;
  ul{
    padding: 0;
  }

  li{
    border-bottom: 1px solid #ccc;
    padding:5px 30px;
  }
  li~li {
    &:hover{
      background: rgba(215,243,245,0.5);
    }
    .instantNum {
      width: 30px;
    }
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      font-size: 20px;
      img {
        width: 80px;
      }
    }
  }
  img {
    width: 60px;
  }
}
</style>
<script>
export default {
  data () {
    return {
      music: [
        {
          name: '浴室',
          artist: 'Deca joins'
        },
        {
          name: '海浪',
          artist: 'Deca joins'
        },
        {
          name: '花',
          artist: 'Hello Nico'
        },
        {
          name: '模樣',
          artist: '張懸'
        },
        {
          name: '捲煙',
          artist: '美秀集團'
        },
        {
          name: '擋一根',
          artist: '美秀集團'
        },
        {
          name: '大風吹',
          artist: '草東沒有派對'
        },
        {
          name: '爛泥',
          artist: '草東沒有派對'
        },
        {
          name: '玫瑰色的你',
          artist: '張懸'
        },
        {
          name: '關於我愛你',
          artist: '張懸'
        }
      ]
    }
  }
}
</script>
