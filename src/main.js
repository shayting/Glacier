import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'
import './style/all.scss'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
