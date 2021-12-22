import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import './assets/css/base.scss'

const app = createApp(App)
app.use(router).mount('#app')
