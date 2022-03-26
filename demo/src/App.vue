<template>
    <button v-if="backButton" v-on:click="back" class="btn">Back</button>
    <div class="window">
        <component :is="currentView" />
    </div>
</template>

<script>
import Main from './components/Main.vue';
import Example1 from './components/Example1.vue';
import Example2 from './components/Example2.vue';
import Example3 from './components/Example3.vue';
import Example4 from './components/Example4.vue';
import Example5 from './components/Example5.vue';
import Example6 from './components/Example6.vue';
import Example7 from './components/Example7.vue';
import Example8 from './components/Example8.vue';

const routes = {
    '/': Main,
    '/example1': Example1,
    '/example2': Example2,
    '/example3': Example3,
    '/example4': Example4,
    '/example5': Example5,
    '/example6': Example6,
    '/example7': Example7,
    '/example8': Example8
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
            return !['#/', ''].includes(this.currentPath);
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
    background-repeat: no-repeat;
    background-attachment: fixed;
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
    background-color: transparent;
    border: none !important;
    line-height: 1.5;
    text-align: left;
    display: inline-block;
    width: 100%;
    padding: 0 !important;
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

button.btn:hover {
    background: #20a0ff;
}

.window {
    background-color: #f6f9fc;
    border-radius: 12px;
    padding: 10px;
    box-shadow: 0px 0px 30px 1px;
    /* min-height: 500px; */
}

p {
    text-align: left;
}

.example {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.tool {
    max-width: 600px;
    height: 100%;
}

.code {
    padding-left: 10px;
    box-sizing: border-box;
}
.wrapper {
    overflow: auto;
    color: #595959;
    background-color: #f3f3f3;
    border: 1px solid #eee;
    padding: 0 10px;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
}

.tool, .code {
    width: 50%;
}

@media (max-width: 1024px) {
    .example {    
        flex-direction: column;
    }
    .tool {
        max-width: 100%;
    }
    .code {
        padding-left: 0px;
    }
    .tool, .code {
        width: 100%;
    }
}

@media (min-width: 1200px) {
    .code {
        width: calc(100% - 600px);
    }
}

.description {
    text-align: left;
}
.string {
    display: inline-block;
    width: auto !important;
    color: #595959;
    background-color: #f3f3f3;
    border: 1px solid #eee !important;
    padding: 6px !important;
    border-radius: 3px;
}
li {
    height: 40px;
}
</style>
