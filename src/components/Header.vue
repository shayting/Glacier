<template>
  <div>
    <v-app-bar fixed height="60">
      <v-container class="d-flex justify-space-between">
        <div class="logo xyCenter">
          <router-link to="/">Glacier</router-link>
        </div>
        <div class="menu xyCenter d-none d-md-flex">
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
          <v-btn elevation="1" class="mx-2 theme-bg loginBtn">
            <router-link to="/login">登入/註冊</router-link>
          </v-btn>
          <v-icon class="mx-2 hamburger" @click.stop="drawer = !drawer">mdi-menu</v-icon>
        </div>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary dark>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://www.discoverdogs.org.uk/wp-content/uploads/2021/09/Pepper-BorderCollie-RachelOates-18.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>User</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' }
      ]
    }
  }
}
</script>
