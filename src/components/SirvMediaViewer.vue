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

<script lang="ts">
import { defineComponent } from 'vue';
import SirvComponent from '@/components/SirvComponent.vue';
import ots from '@/utils/optionsToString';
import isSpin from '@/utils/isSpin';
import isImage from '@/utils/isImage';
import isYoutube from '@/utils/isYoutube';
import isVimeo from '@/utils/isVimeo';
import isVideo from '@/utils/isVideo';
import { Viewer, LazyImage } from '@/types/SMVOptions';
// import SMV from '@/types/SMV';

interface Slide {
    src?: string | undefined
    type?: string
    dataOptions?: object
    id?: string | undefined
    dataPinned?: string
    dataThumbnailImage?: string
    dataThumbnailHtml?: string
    dataDisabled?: string | null
    dataSwipeDisabled?: string | null
    dataHiddenSelector?: string | null
    staticImage?: string | boolean | null
}

// declare global {
//   interface Window {
//       Sirv: SMV
//     //   Vue: App
//   }
// }


const getComponentType = (src?: string): string => {
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

const setNullByDefault = (value: any): any => {
    if (!value) {
        value = null;
    }

    return value;
};

export default defineComponent({
    name: 'SirvMediaViewer',
    inheritAttrs: true,
    components: { SirvComponent },
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
            type: Array,
            default() { return []; }
        },

        id: {
            type: String,
            default() { return 'vue-viewer-' + (+new Date()); }
        }
    },

    created() {
        // this.lazyImage = this.dataSrc && isImage(this.dataSrc) || this.dataBgSrc;
    },

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setup() {},

    computed: {
        parsedComponents (): any[] {
            if (this.dataSrc || this.dataBgSrc) {
                return [];
            } else {
                let c = this.slides;

                if (!Array.isArray(c)) {
                    c = [c];
                }
                c = c.map((v: Slide) => {
                    if (typeof v === 'string') {
                        v = { src: v };
                    }

                    if (!v.type) {
                        v.type = getComponentType(v.src);
                    }

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
            let opt: Viewer | LazyImage = this.options;

            if (!opt.autostart) {
                opt.autostart = 'off';
            }

            return ots(opt);
        }
    },

    methods: {
        isImage: isImage,
    },

    mounted() {
        if (window.Sirv) {
            window.Sirv.start(`#${this.id}`);
        }
    },

    beforeUnmount() {
        if (window.Sirv) {
            window.Sirv.stop(`#${this.id}`);
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped></style> -->