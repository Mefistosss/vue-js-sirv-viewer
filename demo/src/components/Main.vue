<template>
    <pre class="prettyprint">
npm install --save vue-js-smv-viewer

...
import SmvViewer from 'vue-js-smv-viewer'
Vue.use(SmvViewer)
    </pre>
    <p>Viewer</p>
    <div class="example-container">
        <a href="#/example1">
            <div> Simple </div>
        </a>
        <a href="#/example2">
            <div> Simple 2 </div>
        </a>
        <a href="#/example3">
            <div> Simple 3 </div>
        </a>
        <a href="#/example4">
            <div> Simple 4 </div>
        </a>
        <a href="#/example5">
            <div> Simple 5 </div>
        </a>
        <a href="#/example6">
            <div> Events, API </div>
        </a>
    </div>
    <p>Lazy image</p>
    <div class="example-container">
        <a href="#/example7">
            <div>Lazy image</div>
        </a>
        <a href="#/example8">
            <div>Lazy image 2</div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'MainPage',
    mounted() {
        console.log(this.$smv);
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.example-container {
    display: flex;
}

a {
    margin: 10px;
}

a > div {
    border-radius: 3px;
    padding: 10px;
    width: 150px;
    height: 150px;
    box-shadow: 0 4px 8px rgb(80 201 186 / 30%);
    background: #50c9ba;
}

</style>
