import { createApp } from 'vue'
import App from './App.vue'
import SirvViewer from 'plugin';

const app = createApp(App);
app.use(SirvViewer);
app.mount('#app');