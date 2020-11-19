<template>
  <div id="app">
    <Nav id="nav"/>
    <router-view id="router-view" />
  </div>
</template>

<script>
  import Nav from './components/nav.vue'

  export default {
    components: {
      Nav
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

  #nav {
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
