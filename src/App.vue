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
    height: 100%;
    overflow: hidden;
    font-family: Georgia;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #navigation {
    position: fixed;
    width: 3.5em;
  }

  #router-view {
    margin-left: 3.5em;
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
