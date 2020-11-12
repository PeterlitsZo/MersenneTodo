<template>
  <div style="barButton" @click="change_state">
    <v-icon v-if="! OK" name="regular/circle" />
    <v-icon v-else name="check-circle" />
  </div>
</template>

<script>
  export default {
    name: 'OKBox',
    props: {
      OK: Boolean
    },
    methods: {
      change_state () {
        if (!this.OK) {
          this.$emit('bar-OK')
        } else {
          this.$emit('bar-not-OK')
        }
      }
    }
  }
</script>

<style>
  .barButton {
    flex: none;
  }
</style>

