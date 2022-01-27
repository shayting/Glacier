<template>
  <v-app-bar app>
    <v-container class="d-flex justify-space-between">
      <div class="logo xyCenter">
        <router-link to="/">Glacier</router-link>
      </div>
      <div class="menu xyCenter">
        <ul class="menu-list d-flex px-2">
          <li class="px-2">
            <router-link to="/discover">發現</router-link>
          </li>
          <li class="px-2">
            <router-link to="/ranks">排行榜</router-link>
          </li>
          <li class="px-2">
            <router-link to="/playlists">歌單</router-link>
          </li>
          <li class="px-2">
            <router-link to="/events">表演活動</router-link>
          </li>
        </ul>
      </div>
      <div class="nav-icon d-flex">
        <div>
          <input type="text" placeholder="search" class="input-style" />
        </div>
        <v-icon class="mx-2">mdi-magnify</v-icon>
        <v-btn elevation="1" class="mx-2"><router-link to="/events">登入/註冊</router-link></v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>
<style>

</style>
