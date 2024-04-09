<template>
    <p>Simple Example</p>
    <div class="example">
        <div class="tool">
            <sirv-media-viewer
                :slides="[
                    'https://demo.sirv.com/demo/snug/teal-b-throw.jpg',
                    'https://demo.sirv.com/demo/snug/teal.spin',
                    'https://demo.sirv.com/demo/snug/unpacked.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-build.mp4',
                    'https://demo.sirv.com/demo/snug/teal-shadow.jpg',
                    'https://demo.sirv.com/demo/snug/teal-b-cushions.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-00.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-01.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-02.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-03.jpg',
                    'https://demo.sirv.com/demo/snug/stuffing.mp4',
                    'https://demo.sirv.com/demo/snug/selfie.mp4',
                    'https://demo.sirv.com/demo/snug/beer.mp4',
                    'https://demo.sirv.com/demo/snug/sofa-detail-04.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-05.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-06.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-07.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-08.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-09.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-10.jpg',
                    'https://demo.sirv.com/demo/snug/sofa-detail-11.jpg',
                    'https://demo.sirv.com/model.glb'
                ]"
            >
            </sirv-media-viewer>
        </div>
        <div class="code"><div class="wrapper">
    <pre class="prettyprint lang-html">
&lt;sirv-media-viewer
    :slides="[
        'https://demo.sirv.com/demo/snug/teal-b-throw.jpg',
        'https://demo.sirv.com/demo/snug/teal.spin',
        'https://demo.sirv.com/demo/snug/unpacked.jpg',
        'https://demo.sirv.com/demo/snug/sofa-build.mp4',
        'https://demo.sirv.com/demo/snug/teal-shadow.jpg',
        'https://demo.sirv.com/demo/snug/teal-b-cushions.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-00.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-01.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-02.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-03.jpg',
        'https://demo.sirv.com/demo/snug/stuffing.mp4',
        'https://demo.sirv.com/demo/snug/selfie.mp4',
        'https://demo.sirv.com/demo/snug/beer.mp4',
        'https://demo.sirv.com/demo/snug/sofa-detail-04.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-05.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-06.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-07.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-08.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-09.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-10.jpg',
        'https://demo.sirv.com/demo/snug/sofa-detail-11.jpg',
        'https://demo.sirv.com/model.glb'
    ]"
&gt;&lt;/sirv-media-viewer&gt;
    </pre>
        </div></div>
    </div>
    <div class="description">
        <p>Sirv Media Viewer <a href="https://sirv.com/help/articles/sirv-media-viewer/">documentation</a></p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import prettify from '../mixins/prettify';

export default defineComponent({
    name: 'ExamplePage1',
    mixins: [prettify]
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
