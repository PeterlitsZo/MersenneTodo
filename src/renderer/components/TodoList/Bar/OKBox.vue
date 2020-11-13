<template>
  <div style="barButton">
    <v-icon v-if="! OK" name="regular/circle" />
    <v-icon v-else name="check-circle" />
  </div>
</template>

<script>
  export default {
    name: 'OKBox',
    props: {
      OK: Boolean
    }
  }
</script>

<style>
  .barButton {
    flex: none;
  }
</style>

