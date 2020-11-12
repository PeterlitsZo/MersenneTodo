<template>
  <div style="barButton" @click="change_state">
    <v-icon v-if="state === 'not OK'" name="regular/circle" />
    <v-icon v-else name="check-circle" />
  </div>
</template>

<script>
  export default {
    name: 'OKBox',
    data: () => {
      return {
        state: 'not OK'
      }
    },
    methods: {
      change_state () {
        if (this.state === 'not OK') {
          this.$emit('bar-OK')
          this.state = 'OK'
        } else {
          this.$emit('bar-not-OK')
          this.state = 'not OK'
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

