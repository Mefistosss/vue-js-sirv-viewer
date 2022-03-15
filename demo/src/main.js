import { createApp } from 'vue'
import App from './App.vue'
import VueJsSirvViewer from 'plugin';
// import VueJsSirvViewer from '../../dist/index.js';

const app = createApp(App);
app.use(VueJsSirvViewer);
app.mount('#app');