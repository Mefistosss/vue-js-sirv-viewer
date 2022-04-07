<template>
    <p>Test</p>
    <div class="example">
        <div class="tool">
            <sirv-media-viewer
                :slides="[
                    'https://demo.sirv.com/demo/snug/teal-b-throw.jpg',
                    'https://demo.sirv.com/demo/snug/teal.spin',
                    'https://demo.sirv.com/demo/snug/unpacked.jpg'
                ]"
            >
            </sirv-media-viewer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import prettify from '../mixins/prettify';

export default defineComponent({
    name: 'TestPage',
    mixins: [prettify]
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
