<template>
    <h2>Sirv Media Viewer</h2>

    <div style="text-align:left;">Copy and paste this script anywhere in your HTML, usually before
        <pre class="string">&lt;/head&gt;</pre>
        <div class="wrapper">
            <pre class="prettyprint lang-html">
&lt;script src="https://scripts.sirv.com/sirvjs/v3/sirv.js"&gt;&lt;/script&gt;
            </pre>
        </div>
        or you can use <a href="https://www.npmjs.com/package/sirv-media-viewer-script">npm module</a>
    </div>
    <p>Iinstall</p>
    <div class="wrapper">
        <pre class="prettyprint lang-javascript">
npm install --save vue-js-sirv-viewer
        </pre>
    </div>
    <p>Register as plugin</p>
    <div class="wrapper">
        <pre class="prettyprint lang-javascript">
import App from './App.vue'
import SirvMediaViewer from 'vue-js-sirv-viewer';

createApp(App)
    .use(SirvMediaViewer)
    .mount('#app');
        </pre>
    </div>
    <p>Viewer examples</p>
    <div class="example-container">
        <router-link to="/example1">
            <div><span>Props</span></div>
        </router-link>
        <router-link to="/example2">
            <div><span>Slots</span></div>
        </router-link>
        <router-link to="/example3">
            <div><span>Slide props</span></div>
        </router-link>
        <router-link to="/example4">
            <div><span>Slots, options</span></div>
        </router-link>
        <router-link to="/example5">
            <div><span>*.view file</span></div>
        </router-link>
        <router-link to="/example6">
            <div><span>Events, API</span></div>
        </router-link>
    </div>
    <p>Lazy image examples</p>
    <div class="example-container">
        <router-link to="/example7">
            <div><span>Lazy image</span></div>
        </router-link>
        <router-link to="/example8">
            <div><span>Background image</span></div>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import prettify from '../mixins/prettify';

export default defineComponent({
    name: 'MainPage',
    mixins: [prettify]
});
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
