<template>
  <h2>Sirv Media Viewer</h2>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <vue-js-sirv-viewer data-src="https://test1.sirv.com/3d-car-club/03.jpg" style="width: 70%;"></vue-js-sirv-viewer> -->
  <component :is="currentView" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Main from './components/Main.vue';
import Example1  from './components/Example1.vue';

const routes = {
  '/': Main,
  '/example1': Example1
};

export default {
  name: 'App',
  data() {
    return {
      currentPath: window.location.hash
    };
  },
  components: {
    HelloWorld
  },

  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || Main
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash;
		})
  }
}
</script>

<style>
html,
body {
  background: linear-gradient(330deg,rgb(0, 87, 184),rgb(255, 216, 0));
  max-height: 100%;
  height: 100%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  padding: 20px;
  box-sizing: border-box;
}
</style>
