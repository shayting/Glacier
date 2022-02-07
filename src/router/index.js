import Vue from 'vue'
import VueRouter from 'vue-router'
import Front from '../views/Front.vue'
import store from '../store'

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
          import(/* webpackChunkName: "home" */ '../views/Home.vue'),
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
          import(/* webpackChunkName: "discover" */ '../views/front/Discover.vue'),
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
          import(/* webpackChunkName: "ranks" */ '../views/front/Ranks.vue'),
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
          import(/* webpackChunkName: "playlists" */ '../views/front/Playlists.vue'),
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
          import(/* webpackChunkName: "events" */ '../views/front/Events.vue'),
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
          import(/* webpackChunkName: "login" */ '../views/front/Login.vue'),
        meta: {
          title: '登入/註冊'
        }
      }
    ]
  },
  {
    path: '/back',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "back" */ '../views/Back.vue'),
    children: [
      {
        path: 'aboutme',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/back/About.vue'),
        meta: {
          title: '個人檔案'
        }
      },
      {
        path: 'mytracks',
        name: 'Mytracks',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "mytracks" */ '../views/back/Mytracks.vue'),
        meta: {
          title: '我的音樂'
        }
      },
      {
        path: 'mylikes',
        name: 'Mylikes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "mylikes" */ '../views/back/Mylikes.vue'),
        meta: {
          title: '我的喜歡'
        }
      },
      {
        path: 'myevents',
        name: 'Myevents',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "myevents" */ '../views/back/Myevents.vue'),
        meta: {
          title: '我的活動'
        }
      },
      {
        path: 'myplaylists',
        name: 'Myplaylists',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "myplaylists" */ '../views/back/Myplaylists.vue'),
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
          import(/* webpackChunkName: "admin" */ '../views/back/Admin.vue'),
        children: [
          {
            path: '',
            name: 'AdminHome',
            component: () =>
              import(/* webpackChunkName: "admin" */ '../views/back/AdminHome.vue'),
            meta: {
              login: true,
              admin: true,
              title: '管理員後台'
            }
          },
          {
            path: 'accounts',
            name: 'AdminAccounts',
            component: () =>
              import(/* webpackChunkName: "admin" */ '../views/back/AdminAccounts.vue'),
            meta: {
              login: true,
              admin: true,
              title: '會員管理'
            }
          },
          {
            path: 'songs',
            name: 'AdminSongs',
            component: () =>
              import(/* webpackChunkName: "admin" */ '../views/back/AdminSongs.vue'),
            meta: {
              login: true,
              admin: true,
              title: '音樂管理'
            }
          },
          {
            path: 'events',
            name: 'AdminEvents',
            component: () =>
              import(/* webpackChunkName: "admin" */ '../views/back/AdminEvents.vue'),
            meta: {
              login: true,
              admin: true,
              title: '活動管理'
            }
          },
          {
            path: 'playlists',
            name: 'AdminPlaylists',
            component: () =>
              import(/* webpackChunkName: "admin" */ '../views/back/AdminPlaylists.vue'),
            meta: {
              login: true,
              admin: true,
              title: '歌單管理'
            }
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守衛
router.beforeEach((to, from, next) => {
  const user = store.getters['user/user']
  // 如果要去的地方要登入，但使用者尚未登入=>導向登入頁
  if (to.meta.login && !user.isLogin) {
    next('/login')
  // 如果要去的地方meta裡面admin是true，但user不是admin=>導向首頁
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    // 要去哪就去哪
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})
export default router
