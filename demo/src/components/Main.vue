<template>
    <pre style="line-height: 1.5;">
        npm install --save vue-js-smv-viewer

        ...
        import SmvViewer from 'vue-js-smv-viewer'
        Vue.use(SmvViewer)
    </pre>
    <div class="example-container">
        <a href="#/example1">
            <div> Simple </div>
        </a>
        <a href="#/example2">
            <div> Simple 2 </div>
        </a>
  </div>
</template>

<script>
export default {
    name: 'MainPage'
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
