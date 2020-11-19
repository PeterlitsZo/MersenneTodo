<template>
  <div id="navigation">
    <NavButtom to="Main" icon="home" />
    <NavButtom to="Info" icon="info" />
  </div>
</template>

<script>
  import NavButtom from './Navigation/NavButtom.vue'

  export default {
    name: 'navigation',
    components: {
      NavButtom
    }
  }
</script>

<style>
  #navigation {
    flex: none;
    width: 3.5em;
    height: 100%;
    background: #0F2540;
    padding: 1em 0;
  }
</style>
