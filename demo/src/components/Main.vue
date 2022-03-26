<template>
    <h2>Sirv Media Viewer</h2>

    <div style="text-align:left;">Copy and paste this script anywhere in your HTML, usually before
        <pre class="string">&lt;/head&gt;</pre>
        <div class="wrapper">
            <pre class="prettyprint lang-html">
&lt;script src="https://scripts.sirv.com/sirvjs/v3/sirv.js"&gt;&lt;/script&gt;
            </pre>
        </div>
    </div>
<p>Using plugin</p>
    <div class="wrapper">
        <pre class="prettyprint lang-javascript">
npm install --save vue-js-sirv-viewer

...
import SirvViewer from 'vue-js-sirv-viewer'
Vue.use(SirvViewer)
        </pre>
    </div>
    <p>Viewer examples</p>
    <div class="example-container">
        <a href="#/example1">
            <div><span>Props</span></div>
        </a>
        <a href="#/example2">
            <div><span>Slots</span></div>
        </a>
        <a href="#/example3">
            <div><span>Slide props</span></div>
        </a>
        <a href="#/example4">
            <div><span>Slots, options</span></div>
        </a>
        <a href="#/example5">
            <div><span>*.view</span></div>
        </a>
        <a href="#/example6">
            <div><span>Events, API</span></div>
        </a>
    </div>
    <p>Lazy image examples</p>
    <div class="example-container">
        <a href="#/example7">
            <div><span>Lazy image</span></div>
        </a>
        <a href="#/example8">
            <div><span>Background image</span></div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'MainPage',
    mounted() {
        if (window.PR) {
            window.PR.prettyPrint();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    text-align: left;
}
.example-container {
    display: flex;
    flex-wrap: wrap;
}

a {
    margin: 10px;
    text-decoration: none;
}

a > div {
    border-radius: 3px;
    padding: 10px;
    width: 150px;
    height: 50px;
    box-shadow: 0 4px 8px rgb(80 201 186 / 30%);
    background: #50c9ba;
    font-weight: 600;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

a > div:hover {
    background: #4cbfb1;
}
</style>
