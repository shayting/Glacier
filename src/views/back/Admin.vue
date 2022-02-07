<template>
  <div id="admin" class="my-container mt-100 mb-100 white--text">
    <v-row>
      <v-col cols="2">
        <ul class="admin-tabs">
          <li><router-link to="/back/admin/accounts">帳號管理</router-link></li>
          <li><router-link to="/back/admin/songs">音樂管理</router-link></li>
          <li><router-link to="/back/admin/events">活動管理</router-link></li>
          <li><router-link to="/back/admin/playlists">歌單管理</router-link></li>
        </ul>
      </v-col>
      <v-col cols="10">
        <v-sheet color="secondary" min-height="500" rounded class="pa-4">
          <router-view></router-view>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
