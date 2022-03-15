import SirvViewer from './components/SirvViewer.vue';

const VueJsSirvViewer = {
    install(Vue) {
        // inject a globally available $translate() method
        // Vue.config.globalProperties.$translate = (key) => {
        //     // retrieve a nested property in `options`
        //     // using `key` as the path
        //     return key.split('.').reduce((o, i) => {
        //         if (o) return o[i];
        //     }, options);
        // }

        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("vue-js-sirv-viewer", SirvViewer);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueJsSirvViewer);
}

export default VueJsSirvViewer;
