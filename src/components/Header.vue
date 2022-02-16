<template>
  <div id="header">
    <v-app-bar fixed height="60" class="px-0">
      <div class="d-flex justify-space-between my-container">
        <div class="logo xyCenter">
          <router-link to="/">
            <v-img width="35" src="@/assets/image/glacier-logo.png"></v-img>
          </router-link>
        </div>
        <div class="menu xyCenter d-none d-md-flex">
          <ul class="menu-list d-flex px-2">
            <li class="px-4 text-h6">
              <router-link to="/discover">Discover</router-link>
            </li>
            <li class="px-4 text-h6">
              <router-link to="/ranks">Rank</router-link>
            </li>
            <li class="px-4 text-h6">
              <router-link to="/playlists">Playlists</router-link>
            </li>
            <li class="px-4 text-h6">
              <router-link to="/events">Events</router-link>
            </li>
          </ul>
        </div>
        <div class="nav-icon d-flex">
          <div>
            <input type="text" placeholder="search" class="input-style" />
          </div>
          <v-icon class="mx-2">mdi-magnify</v-icon>
          <router-link v-if="!user.isLogin" to="/login">
            <v-btn elevation="1" class="ms-4 theme-bg loginBtn">Log in</v-btn>
          </router-link>
          <div v-if="user.isLogin && user.role === 0">
            <v-btn elevation="1" class="ms-4 theme-bg loginBtn" @click="logout">Log out</v-btn>
            <router-link v-if="user._id.length !== 0" :to='"/back/user/" + user._id' >
              <v-btn color="amber" elevation="1" class="ms-4"><v-icon color="black">mdi-account-circle</v-icon></v-btn>
            </router-link>
            <v-btn dark color="secondary" v-else elevation="1" class="ms-4" disabled><v-icon>mdi-account-circle</v-icon></v-btn>
          </div>
          <div v-if="user.isLogin && user.role === 1">
            <v-btn elevation="1" class="ms-4 theme-bg loginBtn" @click="logout">Log out</v-btn>
            <router-link to="/back/admin">
              <v-btn elevation="1" class="ms-4">Admin</v-btn>
            </router-link>
          </div>
          <v-icon class="mx-2 hamburger d-md-none" @click.stop="drawer = !drawer">mdi-menu</v-icon>
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary dark>
      <v-list-item>
        <v-list-item-avatar v-if="user.isLogin">
          <v-img
            :src="user.avatar"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content v-if="user.isLogin">
          <v-list-item-title>{{ user.account}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
        <router-link :to="item.router" class="d-flex">
          <v-list-item-icon>
            <v-icon color="#d7f3f5">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </router-link>
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
        { title: 'Discover', icon: 'mdi-music-box-multiple', router: '/discover' },
        { title: 'Rank', icon: 'mdi-crown', router: '/ranks' },
        { title: 'Playlists', icon: 'mdi-playlist-music', router: '/playlists' },
        { title: 'events', icon: 'mdi-calendar', router: '/events' }
      ]
    }
  },
  // 已寫成mixin
  // computed: {
  //   user () {
  //     return this.$store.getters['user/user']
  //   }
  // },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
