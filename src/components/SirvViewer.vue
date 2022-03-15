<template>
    <div class="Sirv"
        v-if="!isImage(dataSrc)"
        :data-options="stringOptions"
        :id="id"
        :data-src="dataSrc"
        :data-bg-src="dataBgSrc"
    >
        <sirv-component
            v-for="slide in parsedComponents"
            :key="slide.src"
            :src="slide.src"
            :type="slide.type"
            :componentOptions="slide.options"
            :id="slide.id"
            :thumbnailImage="slide.thumbnailImage"
            :thumbnailHtml="slide.thumbnailHtml"
            :slideDisabled="slide.slideDisabled"
            :swipeDisabled="slide.swipeDisabled"
            :hiddenSelector="slide.hiddenSelector"
            :pinned="slide.pinned"
            :staticImage="slide.staticImage"
        />
        <slot v-if="parsedComponents.length == 0"></slot>
    </div>
    <img
        v-else
        class="Sirv"
        :id="id"
        :data-src="dataSrc"
        :data-options="stringOptions"
        
    />
</template>

<script>
import SirvComponent from './SirvComponent.vue';
import ots from '../utils/optionsToString';
import isSpin from '../utils/isSpin';
import isImage from '../utils/isImage';
import isYoutube from '../utils/isYoutube';
import isVimeo from '../utils/isVimeo';
import isVideo from '../utils/isVideo';

const getComponentType = (src) => {
    let result = 'html';

    if (isSpin(src)) {
        result = 'spin';
    } else if (isImage(src)) {
        // result = 'image';
        result = 'zoom';
    } else if (isYoutube(src)) {
        result = 'youtube';
    } else if (isVimeo(src)) {
        result = 'vimeo';
    } else if (isVideo(src)) {
        result = 'video';
    }

    return result;
}

export default {
    name: 'VueJsSirvViewer',
    inheritAttrs: false,
    components: { SirvComponent },
    // state: {
    //   l: 0
    // },
    props: {
        options: {
            type: Object,
            default() { return { autostart: 'off' }; }
        },
        dataBgSrc: {
            type: String,
            default: null
        },
        dataSrc: {
            type: String,
            default() {
                return null;
            }
        },
        slides: {
            type: [Array, String],
            default() { return []; }
        },
        id: {
            type: String,
            default() { return 'vue-viewer-' + (+new Date()); }
        }
    },

    created() {
        this.isImage = isImage;
        this.lazyImage = this.dataSrc && isImage(this.dataSrc) || this.dataBgSrc;
    },

    setup() {

    },
    computed: {
        parsedComponents () {
            if (this.dataSrc || this.dataBgSrc) {
                return [];
            } else {
                let c = this.slides;
                if (!Array.isArray(c)) {
                    c = [c];
                }
                c = c.map((v) => {
                if (typeof v === 'string') {
                    v = { src: v };
                }

                if (!v.type) {
                    v.type = getComponentType(v.src);
                }

                if (!v.options) {
                    v.options = null;
                }

                if (!v.id) {
                    v.id = null;
                }

                if (!v.pinned) {
                    v.pinned = null;
                }

                if (!v.thumbnailImage) {
                    v.thumbnailImage = null;
                }

                if (!v.thumbnailHtml) {
                    v.thumbnailHtml = null;
                }

                if (v.slideDisabled) {
                    v.slideDisabled = '';
                } else {
                    v.slideDisabled = null;
                }

                if (v.swipeDisabled) {
                    v.swipeDisabled = '';
                } else {
                    v.swipeDisabled = null;
                }

                if (v.hiddenSelector) {
                    v.hiddenSelector = '';
                } else {
                    v.hiddenSelector = null;
                }

                v.staticImage = v.staticImage === true ? 'static' : null;

                return v;
                });

                return c;
            }
        },

        stringOptions () {
            let opt = this.options;

            if (!opt.autostart) {
                opt.autostart = 'off';
            }

            return ots(this.options);
        }
    },
    methods: {
        start() {
            window.Sirv.start('#' + this.id);
        },
        stop() {
            window.Sirv.stop('#' + this.id);
        },
        on() {},
        off() {}
    },
    mounted() {
        this.start();
    },
    beforeUnmount() {
        this.stop();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped></style> -->