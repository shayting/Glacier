<template>
  <v-bottom-navigation horizontal fixed color="#d7f3f5">
    <div class="xyCenter">
      <v-icon>mdi-skip-previous</v-icon>
      <v-icon class="play-btn">mdi-play</v-icon>
      <v-icon>mdi-skip-next</v-icon>
      <v-icon>mdi-shuffle-variant</v-icon>
      <v-icon>mdi-repeat</v-icon>
    </div>
    <div class="music-slider xyCenter mx-12">
      <span id="current-time">0:00</span>
      <input id="slider" type="range" max="100" value="0" />
      <span id="duration">0:00</span>
      <audio src="~@/assets/audio/spirit-blossom-15285.mp3"></audio>
    </div>
    <div class="playing-song xyCenter">
      <v-img
        src="https://blow.streetvoice.com/wp-content/uploads/2019/06/%E5%82%BB%E5%AD%90%E8%88%87%E7%99%BD%E7%97%B4.jpg"
        alt
        width="40px"
      ></v-img>
      <div class="mx-5">
        <div class="playing-title">象牙舟</div>
        <div class="playing-artist">傻子與白痴</div>
      </div>
    </div>
    <div class="xyCenter mx-5">
      <v-icon>mdi-heart-outline</v-icon>
      <v-icon>mdi-plus</v-icon>
    </div>
  </v-bottom-navigation>
</template>
<script>
export default {
  data: () => ({})
}
</script>
<style lang="scss" scoped>
.v-bottom-navigation {
  background-color: #d7f3f5 !important;
}
i::before,
span {
  color: #111314;
  margin: 0 5px;
}
.playing-title {
  color: #111314;
  font-size: 14px;
}
.playing-artist {
  color: #838383;
  font-size: 10px;
}
// slider 樣式
input[type="range"] {
  -webkit-appearance: none;
  width: 400px;
  position: relative;
  &:focus {
    outline: none;
    &::-webkit-slider-thumb {
      transform: scale(1.3);
      transition: 0.5s all ease;
    }
  }
  // 經過的
  &:before {
    position: absolute;
    content: "";
    width: 50%;
    height: 3px;
    background: #111314;
  }
}

// 整條
input[type="range"]::-webkit-slider-runnable-track {
  background: #ccc;
  height: 3px;
}

// 圈圈
input[type="range"]::-webkit-slider-thumb {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: none;
  -webkit-appearance: none;
  background-color: #111314;
  margin-top: -4px;
  z-index: 99;
  position: relative;
  transition: 0.5s all ease;
}
</style>
