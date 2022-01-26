<template>
  <v-app-bar app>
    <v-container class="d-flex justify-space-between">
      <div class="logo xyCenter">Glacier</div>
      <div class="menu xyCenter">
        <ul class="menu-list d-flex px-2">
          <li class="px-2"><a href="#">發現</a></li>
          <li class="px-2"><a href="#">排行榜</a></li>
          <li class="px-2"><a href="#">歌單</a></li>
          <li class="px-2"><a href="#">表演活動</a></li>
        </ul>
      </div>
      <div class="nav-icon">
        <v-icon class="mx-2">mdi-magnify</v-icon>
        <v-btn elevation="1" class="mx-2">登入/註冊</v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>
