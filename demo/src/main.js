import { createApp } from 'vue'
import App from './App.vue'
import VueJsSirvViewer from 'plugin';

const app = createApp(App);
app.use(VueJsSirvViewer);
app.mount('#app');