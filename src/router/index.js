import Vue from 'vue'
import VueRouter from 'vue-router'
import Front from '../views/Front.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Front,
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
        meta: {
          title: 'Glacier'
        }
      },
      {
        path: 'discover',
        name: 'Discover',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Discover" */ '../views/front/Discover.vue'),
        meta: {
          title: '發現'
        }
      },
      {
        path: 'ranks',
        name: 'Ranks',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Ranks" */ '../views/front/Ranks.vue'),
        meta: {
          title: '排行榜'
        }
      },
      {
        path: 'playlists',
        name: 'Playlists',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Playlists" */ '../views/front/Playlists.vue'),
        meta: {
          title: '歌單'
        }
      },
      {
        path: 'events',
        name: 'Events',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Events" */ '../views/front/Events.vue'),
        meta: {
          title: '演出活動'
        }
      },
      {
        path: '/:action',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Login" */ '../views/front/Login.vue'),
        meta: {
          title: '登入/註冊'
        }
      }
    ]
  },
  {
    path: '/back',
    name: 'Back',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Back" */ '../views/Back.vue'),
    children: [
      {
        path: 'member',
        name: 'Member',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Member" */ '../views/back/Member.vue'),
        meta: {
          title: '個人檔案'
        }
      },
      {
        path: 'member/mytracks',
        name: 'Mytracks',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Mytracks" */ '../views/back/Mytracks.vue'),
        meta: {
          title: '我的音樂'
        }
      },
      {
        path: 'member/mylikes',
        name: 'Mylikes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Mylikes" */ '../views/back/Mylikes.vue'),
        meta: {
          title: '我的喜歡'
        }
      },
      {
        path: 'member/myevents',
        name: 'Myevents',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Myevents" */ '../views/back/Myevents.vue'),
        meta: {
          title: '我的活動'
        }
      },
      {
        path: 'member/myplaylists',
        name: 'Myplaylists',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Myevents" */ '../views/back/Myplaylists.vue'),
        meta: {
          title: '我的歌單'
        }
      },
      {
        path: 'admin',
        name: 'Admin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Admin" */ '../views/back/Admin.vue'),
        meta: {
          title: '管理員後台'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})
export default router
