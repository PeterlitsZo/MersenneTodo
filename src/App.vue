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
    margin: 0;
  }
  
  kbd {
    font-family: monospace;
  }

</style>
