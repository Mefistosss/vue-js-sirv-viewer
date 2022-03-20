<template>
    <p>Options, slide properties</p>
    <div class="example">
        <div class="tool">
            <sirv-media-viewer
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
        <p>Additional inforamation about Sirv Media Viewer you can find <a href="https://sirv.com/help/articles/sirv-media-viewer/">here</a></p>
        <p>API</p>
        <p>
            <button :disabled="!viewer" v-on:click="prev" class="btn">Prev</button>
            <button :disabled="!viewer" v-on:click="next" class="btn">Next</button>
        </p>
    </div>
</template>
<script>
export default {
    name: 'ExamplePage6',
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
            console.log('spin:init', e);
        });

        this.connections['zoom:ready'] = this.$smv.on('zoom:ready', (e) => {
            console.log('zoom:ready', e);
        });

        this.connections['image:ready'] = this.$smv.on('image:ready', (e) => {
            console.log('image:ready', e);
        });
    },
    beforeUnmount() {
        this.$smv.off('viewer:ready', this.connections['viewer:ready']);
        this.$smv.off('spin:init', this.connections['spin:init']);
        this.$smv.off('zoom:ready', this.connections['zoom:ready']);
        this.$smv.off('image:ready', this.connections['image:ready']);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
