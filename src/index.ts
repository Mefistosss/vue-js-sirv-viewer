import SirvViewer from './components/SirvViewer.vue';
import { App } from 'vue';
import Sirv from '../types/Sirv';

declare global {
    interface Window {
        Sirv: Sirv,
        Vue: App
    }
}

const VueJsSirvViewer = {
    install(Vue: App) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("sirv-media-viewer", SirvViewer);
        Vue.config.globalProperties.$smv = window.Sirv;
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueJsSirvViewer);
}

export default VueJsSirvViewer;
