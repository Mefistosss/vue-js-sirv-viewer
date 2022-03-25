<template>
    <p>Options, slide properties</p>
    <div class="example">
        <div class="tool">
            <sirv-media-viewer data-options="fullscreen.enable:false;">
                <img data-src="https://demo.sirv.com/demo/snug/teal-b-throw.jpg" />
                <div data-type="zoom" data-src="https://demo.sirv.com/demo/snug/unpacked.jpg"></div>
                <div data-type="zoom" data-src="https://demo.sirv.com/demo/snug/teal-shadow.jpg" data-options="mode: deep; map.enable: true;"></div>
            </sirv-media-viewer>
        </div>
        <div class="code"><div class="wrapper">
    <pre class="prettyprint lang-html">
&lt;sirv-media-viewer data-options="fullscreen.enable:false;"&gt;
  &lt;img data-src="https://demo.sirv.com/demo/snug/teal-b-throw.jpg" /&gt;
  &lt;div data-type="zoom" data-src="https://demo.sirv.com/demo/snug/unpacked.jpg"&gt;&lt;/div&gt;
  &lt;div data-type="zoom" data-src="https://demo.sirv.com/demo/snug/teal-shadow.jpg" data-options="mode: deep; map.enable: true;"&gt;&lt;/div&gt;
&lt;/sirv-media-viewer&gt;
    </pre>
        </div></div>
    </div>
    <div class="description">
        <p><pre class="string">data-options="fullscreen.enable:false;"</pre> it is a common way to use local Sirv Media Viewer <a href="https://sirv.com/help/articles/sirv-media-viewer/">options</a></p>
        <p>Slides are added using html and properties are added using attributes</p>
        <p>Additional inforamation you can find in <a href="https://sirv.com/help/articles/sirv-media-viewer/">documentation</a></p>
    </div>
</template>

<script>
export default {
    name: 'ExamplePage4',
    mounted() {
        if (window.PR) {
            window.PR.prettyPrint();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
