<template>
  <div id="nav">
    <NavButtom to="Main" icon="home" />
  </div>
</template>

<script>
  import NavButtom from './nav/NavButtom.vue'

  export default {
    name: 'nav',
    components: {
      NavButtom
    }
  }
</script>

<style>
  #nav {
    height: 100%;
    background: #0F2540;
    padding: 1em 0;
  }
</style>
