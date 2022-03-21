<template>
    <div class="Sirv"
        v-if="!isImage(dataSrc)"
        :data-options="stringOptions"
        :id="id"
        :data-src="dataSrc"
        :data-bg-src="dataBgSrc"
        :style="$attrs.style"
    >
        <sirv-component
            v-for="slide in parsedComponents"
            :key="slide.src"
            :src="slide.src"
            :type="slide.type"
            :componentOptions="slide.dataOptions"
            :id="slide.id"
            :thumbnailImage="slide.dataThumbnailImage"
            :thumbnailHtml="slide.dataThumbnailHtml"
            :slideDisabled="slide.dataDisabled"
            :swipeDisabled="slide.dataSwipeDisabled"
            :hiddenSelector="slide.dataHiddenSelector"
            :pinned="slide.dataPinned"
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

const setNullByDefault = (value) => {
    if (!value) {
        value = null;
    }

    return value;
};

export default {
    name: 'SirvMediaViewer',
    inheritAttrs: true,
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

            // :id="slide.id"
            // :staticImage="slide.dataStaticImage"

                    v.dataOptions = setNullByDefault(v.dataOptions);
                    v.id = setNullByDefault(v.id);
                    v.dataPinned = setNullByDefault(v.dataPinned);
                    v.dataThumbnailImage = setNullByDefault(v.dataThumbnailImage);
                    v.dataThumbnailHtml = setNullByDefault(v.dataThumbnailHtml);

                    if (v.dataDisabled) {
                        v.dataDisabled = '';
                    } else {
                        v.dataDisabled = null;
                    }

                    if (v.dataSwipeDisabled) {
                        v.dataSwipeDisabled = '';
                    } else {
                        v.dataSwipeDisabled = null;
                    }

                    if (v.dataHiddenSelector) {
                        v.dataHiddenSelector = '';
                    } else {
                        v.dataHiddenSelector = null;
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