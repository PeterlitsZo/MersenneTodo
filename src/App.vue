<template>
  <div id="app">
    <Navigation id="navigation"/>
    <router-view id="router-view" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  import { remote } from 'electron'
  import path from 'path'

  import Navigation from './components/Navigation.vue'

  export default Vue.extend({
    data: () => {
      return {
        datafilepath: path.join(remote.app.getPath('userData'), 'mersennetodo.json')
      }
    },
    created () {
      this.$store.commit('todolist/init', { filePath: this.datafilepath })
    },
    components: {
      Navigation
    }
  })
</script>

<style lang="scss">
  #app {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: Georgia;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    $nav-width: 3.5em;

    #navigation {
      position: fixed;
      height: 100%;
      width: $nav-width;
    }

    #router-view {
      margin-left: $nav-width;
    }
  }

  kbd {
    font-family: monospace;
  }

</style>
