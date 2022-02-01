import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// api 網址
// axios.create 另外開一個axios實體，避免與原本的axios衝突
export const api = axios.create({
  baseURL: process.env.VUE_APP_API
})
Vue.use(VueAxios, { axios, api })
