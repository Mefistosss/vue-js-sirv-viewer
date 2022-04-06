import { defineComponent } from 'vue';

declare global {
    interface Window {
        PR?: {
            prettyPrint: () => void;
        }
    }
}

export default defineComponent({
    mouted() {
        if (window.PR) {
            window.PR.prettyPrint();
        }
    }
});
