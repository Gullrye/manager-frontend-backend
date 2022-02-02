import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import './assets/css/base.scss'
import request from './utils/request'
import api from './api'
import storage from './utils/storage'
import store, { setupStore } from './store'

const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage

app.use(store)
setupStore()
app.use(router)
app.mount('#app')
