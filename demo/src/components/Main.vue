<template>
  <div>Main</div>
  <a href="#/example1">
    <div> Simple </div>
  </a>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a > div {
    width: 150px;
    height: 150px;
    background-color: red;
}
</style>
