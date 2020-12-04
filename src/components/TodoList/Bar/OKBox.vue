<template>
  <div style="barButton">
    <v-icon v-if="! OK" name="regular/circle" />
    <v-icon v-else name="check-circle" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'OKBox',
    props: {
      OK: Boolean
    }
  })
</script>

<style>
  .barButton {
    flex: none;
  }
</style>

