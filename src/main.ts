import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SirvMediaViewer from './plugins/SirvMediaViewer'

createApp(App)
    .use(router)
    .use(SirvMediaViewer)
    .mount('#app')
