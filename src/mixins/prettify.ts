import { defineComponent } from 'vue';

declare global {
    interface Window {
        PR?: {
            prettyPrint: () => void;
        }
    }
}

export default defineComponent({
// export default {
    mouted() {
        if (window.PR) {
            window.PR.prettyPrint();
        }
    }
// }
});
