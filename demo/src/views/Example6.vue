<template>
    <p>Options, slide properties</p>
    
    <div class="example">
        <div class="tool">
            <sirv-media-viewer
                :id="id"
                :slides="[{
                    id: 'test-image',
                    src: 'https://demo.sirv.com/demo/snug/teal-b-throw.jpg',
                    type: 'image'
                },
                {
                    id: 'test-spin',
                    src: 'https://demo.sirv.com/demo/snug/teal.spin',
                },
                {
                    id: 'test-zoom',
                    src: 'https://demo.sirv.com/demo/snug/unpacked.jpg'
                }]"
            >
            </sirv-media-viewer>
        </div>
        <div class="code"><div class="wrapper">
    <pre class="prettyprint lang-html">
&lt;sirv-media-viewer
    :id="this.id"
    :slides="[{
        id: 'test-image',
        src: 'https://demo.sirv.com/demo/snug/teal-b-throw.jpg',
        type: 'image'
    },
    {
        id: 'test-spin',
        src: 'https://demo.sirv.com/demo/snug/teal.spin',
    },
    {
        id: 'test-zoom',
        src: 'https://demo.sirv.com/demo/snug/unpacked.jpg'
    }]"
&gt;&lt;/sirv-media-viewer&gt;
    </pre>
        </div></div>
    </div>
    <div class="description">
        <p>API example</p>
        <p class="api">
            <button :disabled="!viewer" v-on:click="prev" class="btn">Prev</button>
            <button :disabled="!viewer" v-on:click="next" class="btn">Next</button>
        </p>
        <div class="code">
            <div class="wrapper">
                <pre class="prettyprint lang-javascript">
export default {
    name: 'example',
    data() {
        return {
            viewer: null
        }
    },
    created() {
        this.id = 'smv-test';
        this.connections = {};
    },
    methods: {
        prev() {
            if (this.viewer) {
                this.viewer.prev();
            }
        },
        next() {
            if (this.viewer) {
                this.viewer.next();
            }
        }
    },
    mounted() {
        this.connections['viewer:ready'] = this.$smv.on('viewer:ready', (e) => {
            if (e.id === this.id) {
                this.viewer = e;
                console.log('viewer:ready', e);
            }
        });

        this.connections['spin:init'] = this.$smv.on('spin:init', (e) => {
            if (e.id === 'test-spin') {
                console.log('spin:init', e);
            }
        });

        this.connections['zoom:ready'] = this.$smv.on('zoom:ready', (e) => {
            if (e.id === 'test-zoom') {
                console.log('zoom:ready', e);
            }
        });

        this.connections['image:ready'] = this.$smv.on('image:ready', (e) => {
            if (e.id === 'test-image') {
                console.log('image:ready', e);
            }
        });
    },
    beforeUnmount() {
        this.$smv.off('viewer:ready', this.connections['viewer:ready']);
        this.$smv.off('spin:init', this.connections['spin:init']);
        this.$smv.off('zoom:ready', this.connections['zoom:ready']);
        this.$smv.off('image:ready', this.connections['image:ready']);
    }
}
                </pre>
            </div>
        </div>
        <p>Additional information about events and API you can find into <a href="https://sirv.com/help/articles/sirv-media-viewer/">documentation</a></p>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import prettify from '../mixins/prettify';
import SMVSlider from '../../../types/SMVSlider';

interface ExampleData {
    viewer: SMVSlider | null,
    id: string,
    connections: object
}

export default defineComponent({
    name: 'ExamplePage6',
    mixins: [prettify],
    data() {
        return {
            viewer: null,
            id: 'smv-test',
            connections: {}
        } as ExampleData
    },
    methods: {
        prev() {
            if (this.viewer) {
                this.viewer.prev();
            }
        },
        next() {
            if (this.viewer) {
                this.viewer.next();
            }
        }
    },
    mounted() {
        this.connections['viewer:ready'] = this.$smv.on('viewer:ready', (e) => {
            if (e.id === this.id) {
                this.viewer = e;
                console.log('viewer:ready', e);
            }
        });

        this.connections['spin:init'] = this.$smv.on('spin:init', (e) => {
            if (e.id === 'test-spin') {
                console.log('spin:init', e);
            }
        });

        this.connections['zoom:ready'] = this.$smv.on('zoom:ready', (e) => {
            if (e.id === 'test-zoom') {
                console.log('zoom:ready', e);
            }
        });

        this.connections['image:ready'] = this.$smv.on('image:ready', (e) => {
            if (e.id === 'test-image') {
                console.log('image:ready', e);
            }
        });
    },
    beforeUnmount() {
        this.$smv.off('viewer:ready', this.connections['viewer:ready']);
        this.$smv.off('spin:init', this.connections['spin:init']);
        this.$smv.off('zoom:ready', this.connections['zoom:ready']);
        this.$smv.off('image:ready', this.connections['image:ready']);
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.api .btn {
    display: inline-block;
    margin: 10px;
}
.description .code {
    padding: 0;
}
</style>
