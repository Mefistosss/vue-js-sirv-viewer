<template>
    <p>Lazy image as background</p>
    <div class="example">
        <div class="tool">
            <sirv-media-viewer data-bg-src="https://demo.sirv.com/demo/snug/teal-b-throw.jpg" style="width: 100%; height: 500px; border: 1px solid; background-size: cover !important;"></sirv-media-viewer>
        </div>
        <div class="code"><div class="wrapper">
    <pre class="prettyprint lang-html">
&lt;sirv-media-viewer
    data-bg-src="https://demo.sirv.com/demo/snug/teal-b-throw.jpg"
    style="width: 100%; height: 500px; border: 1px solid; background-size: cover !important;"
&gt;
&lt;/sirv-media-viewer&gt;
    </pre>
        </div></div>
    </div>
    <div class="description">
        <p>Lazy image <a href="https://sirv.com/help/articles/responsive-imaging/">documentation</a></p>
    </div>
</template>

<script>
export default {
    name: 'ExamplePage8',
    mouted() {
        if (window.PR) {
            window.PR.prettyPrint();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
