<template>
    <p>Simple Example</p>
    <!-- <vue-js-sirv-viewer data-src="https://test1.sirv.com/3d-car-club/03.jpg" style="width: 70%;"></vue-js-sirv-viewer> -->
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
                    'https://demo.sirv.com/demo/snug/sofa-detail-11.jpg'
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
        'https://demo.sirv.com/demo/snug/sofa-detail-11.jpg'
    ]"
&gt;&lt;/sirv-media-viewer&gt;
    </pre>
        </div></div>
    </div>
    <div class="description">
        <p>Sirv Media Viewer <a href="https://sirv.com/help/articles/sirv-media-viewer/">documentation</a></p>
    </div>
</template>

<script>
export default {
    name: 'ExamplePage1',
    mounted() {
        if (window.PR) {
            window.PR.prettyPrint();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* pre {
    line-height: 1.5;
    text-align: left;
    padding: 10px;
} */
</style>
