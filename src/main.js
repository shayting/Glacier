import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'

import 'swiper/css/swiper.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import './style/all.scss'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
