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
</template>

<script lang="ts">
// v-if="['spin', 'zoom', 'youtube', 'vimeo', 'video', 'html'].includes(type)"
import { defineComponent } from 'vue';
import ots from '../utils/optionsToString';

export default defineComponent({
    name: 'SirvComponent',
    props: {
        src: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        id: {
            type: String,
            default: null
        },
        thumbnailImage: {
            type: String,
            default: null
        },
        thumbnailHtml: {
            type: String,
            default: null
        },
        slideDisabled: {
            type: [String, Boolean],
            default: null,
            valdatator(value: string | boolean) {
                return value === false || value === '';
            }
        },
        swipeDisabled: {
            type: [String, Boolean],
            default: null,
            valdatator(value: string | boolean) {
                return value === false || value === '';
            }
        },
        hiddenSelector:{
            type: [String, Boolean],
            default: null,
            valdatator(value: string | boolean) {
                return value === false || value === '';
            }
        },
        pinned: {
            type: String,
            default: null,
            valdatator(value: string) {
                return ['start', 'end'].indexOf(value) !== -1
            }
        },
        staticImage: {
            type: String,
            default: null,
            valdatator(value: string) {
                return ['static'].indexOf(value) !== -1
            }
        },
        componentOptions: {
            type: Object,
            default: null
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    created () {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mounted () {},

    computed: {
        optionsToString() {
            const o: object = this.componentOptions;
            if (o && Object.keys(o).length > 0) {
                return ots(o);
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
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>