<template>
    <button v-if="backButton" v-on:click="back" class="btn">Back</button>
    <div class="window">
        <p>Sirv Media Viewer</p>
        <component :is="currentView" />
    </div>
</template>

<script>
import Main from './components/Main.vue';
import Example1  from './components/Example1.vue';
import Example2  from './components/Example2.vue';

const routes = {
    '/': Main,
    '/example1': Example1,
    '/example2': Example2
};

export default {
    name: 'App',
    data() {
        return {
            currentPath: window.location.hash
        };
    },
    components: {},

    computed: {
        currentView() {
            return routes[this.currentPath.slice(1) || '/'] || Main
        },

        backButton() {
            return this.currentPath !== '#/';
        }
    },
    mounted() {
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.hash;
		});
    },
    methods: {
        back() {
            this.currentPath = '#/';
            window.location.hash = this.currentPath;
        }
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
    padding: 20px;
    box-sizing: border-box;
}

pre {
  color: #595959;
  background-color: #f3f3f3;
  border: 1px solid #eee;
}

.btn {
    position: relative;
    display: block;
    outline: none;
    background: #fff;
    border: 0;
    padding: 10px 18px;
    cursor: pointer;
    color: #fff;
    box-shadow: 0 4px 8px rgb(32 160 255 / 30%);
    background: #4db3ff;
    font-weight: 600;
    border-radius: 3px;
    min-width: 90px;
    margin-bottom: 8px;
    margin-top: 8px;
}

.window {
    background-color: #f6f9fc;
    border-radius: 12px;
    padding: 10px;
    box-shadow: 0px 0px 30px 1px;
}

p {
    text-align: left;
}
</style>
