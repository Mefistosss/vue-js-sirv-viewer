import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import SirvViewer from 'plugin';
import SirvViewer from '../../dist/index.umd.js';

createApp(App)
    .use(router)
    .use(SirvViewer)
    .mount('#app');
