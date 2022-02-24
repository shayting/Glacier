import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/axios.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import VueLoading from 'vue-loading-overlay'
import Aplayer from 'vue-aplayer'
import { KinesisContainer, KinesisElement } from 'vue-kinesis'

import mixin from './mixin.js'

import 'swiper/css/swiper.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import 'vue-loading-overlay/dist/vue-loading.css'
import './style/all.scss'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)
Vue.mixin(mixin)

Vue.component('Aplayer', Aplayer)
Vue.component('Loading', VueLoading)
Vue.component('FilePond', vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
))
Vue.component('kinesis-container', KinesisContainer)
Vue.component('kinesis-element', KinesisElement)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
