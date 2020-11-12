<template>
  <div style="barButton" @click="deleteBar">
    <v-icon name="times-circle" />
  </div>
</template>

<script>
  export default {
    name: 'KillButton',
    methods: {
      deleteBar () {
        this.$emit('kill-bar')
      }
    }
  }
</script>

<style>
  .barButton {
    flex: none;
  }
</style>
