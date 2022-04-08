import { App, Plugin } from 'vue';
import SirvMediaViewer from './components/SirvMediaViewer.vue';

const VueJsSirvViewer: Plugin = {
    install(Vue: App) {
        Vue.config.globalProperties.$smv = window.Sirv;
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("sirv-media-viewer", SirvMediaViewer);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueJsSirvViewer);
}

export default VueJsSirvViewer;
