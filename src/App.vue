<template>
  <div id="app">
    <Navigation id="navigation"/>
    <router-view id="router-view" />
  </div>
</template>

<script>
  import Navigation from './components/Navigation.vue'

  export default {
    components: {
      Navigation
    }
  }
</script>

<style>
  #app {
    display: flex;
    height: 100%;
    overflow: hidden;
    font-family: Georgia;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #router-view {
    flex-grow: 1;
  }
  
  body {
    height: 100%;
    margin: 0;
  }

  html {
    height: 100%;
  }
  
  kbd {
    font-family: monospace;
  }

</style>
