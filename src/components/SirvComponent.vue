<template>
    <img
        v-if="type == 'image'"
        :data-src="src"
        :data-options="optionsToString"
        :id="id"
        :data-thumbnail-image="thumbnailImage"
        :data-thumbnail-html="thumbnailHtml"
        :data-disabled="slideDisabled"
        :data-swipe-disabled ="swipeDisabled"
        :data-hidden-selector="hiddenSelector"
    />

    <div
        v-else
        v-html="type == 'html' ? src : null"
        :data-type="type == 'zoom' ? 'zoom' : (staticImage || null)"
        :data-src="type == 'html' ? null : src"
        :data-options="optionsToString"
        :id="id"
        :data-thumbnail-image="thumbnailImage"
        :data-thumbnail-html="thumbnailHtml"
        :data-disabled="slideDisabled"
        :data-swipe-disabled ="swipeDisabled"
        :data-hidden-selector="hiddenSelector"
    ></div>
    <!-- v-if="['spin', 'zoom', 'youtube', 'vimeo', 'video', 'html'].includes(type)" -->
</template>

<script>
import ots from '../utils/optionsToString';

// 'data-id'
// 'data-disabled'
// 'data-thumbnail-image'
// 'data-thumbnail-html'
// 'data-swipe-disabled'
// 'data-hidden-selector'
// 'data-pinned'
// 'data-type' = 'static'

// return ['start', 'end'].includes(this.selector.pinned);

export default {
    name: 'SirvComponent',
    props: {
        src: String,
        type: String,
        id: String,
        thumbnailImage: String,
        thumbnailHtml: String,
        slideDisabled: {
            type: [String, Boolean],
            default: null,
            valdatator(value) {
                return value === false || value === '';
            }
        },
        swipeDisabled: {
            type: [String, Boolean],
            default: null,
            valdatator(value) {
                return value === false || value === '';
            }
        },
        hiddenSelector:{
            type: [String, Boolean],
            default: null,
            valdatator(value) {
                return value === false || value === '';
            }
        },
        pinned: {
            type: String,
            default: null,
            valdatator(value) {
                return ['start', 'end'].indexOf(value) !== -1
            }
        },
        staticImage: {
            type: String,
            default: null,
            valdatator(value) {
                return ['static'].indexOf(value) !== -1
            }
        },
        componentOptions: {
            type: Object,
            default(value) {
                if (!value || Object.keys(value).length === 0) {
                    value = null;
                }
                return value;
            }
        }
    },
    created () {
        // this.src2 = this.src;
    },
    mounted () {

    },
    computed: {
        optionsToString() {
            if (this.componentOptions && Object.keys(this.componentOptions).length > 0) {
                return ots(this.componentOptions);
            } else {
                return null;
            }
        }
    },
    methods: {
        div() {
            return ['spin'].includes(this.type);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>