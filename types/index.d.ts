declare const VueJsSirvViewer: {
    install(Vue: any): void;
};

declare interface Sirv {
    getInstance: (query?: string) => any
    start: (query?: string) => any
    stop: (query?: string) => any
}

declare module 'vue/types/vue' {
    interface Vue {
        $smv: Sirv
    }
}

declare global {
    interface Window {
        Sirv: Sirv
    }
}

export {};

export default VueJsSirvViewer;
