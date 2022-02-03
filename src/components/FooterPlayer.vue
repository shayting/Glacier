<template>
  <div id="footerPlayer" class="my-container">
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
  </div>
</template>
<script>
export default {
  data: () => ({})
}
</script>
