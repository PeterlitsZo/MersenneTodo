<template>
  <div id="navigation">
    <NavButtom to="Main" icon="home" />
    <NavButtom to="Setting" icon="cog" />
    <NavButtom to="Info" icon="info" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  import NavButtom from './Navigation/NavButtom.vue'

  export default Vue.extend({
    name: 'navigation',
    components: {
      NavButtom
    }
  })
</script>

<style lang="scss">
  #navigation {
    background: #0F2540;
    padding: 1em 0;
  }
</style>
