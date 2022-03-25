<template>
    <p>Smart gallery</p>
    <div class="example">
        <div class="tool">
            <sirv-media-viewer data-src="https://demo.sirv.com/Examples/b74317.view"></sirv-media-viewer>
        </div>
        <div class="code"><div class="wrapper">
    <pre class="prettyprint lang-html">
&lt;sirv-media-viewer data-src="https://demo.sirv.com/Examples/b74317.view"&gt;&lt;/sirv-media-viewer&gt;
    </pre>
        </div></div>
    </div>
    <div class="description">
        <p>Smart gallery <a href="https://sirv.com/help/articles/sirv-media-viewer/">documentation</a></p>
    </div>
</template>

<script>
export default {
    name: 'ExamplePage5',
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
