<template>
  <div
    @click="deleteBar"
    class="barButton" 
  >
    <v-icon name="trash" />
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

<style lang="scss">
  .barButton {
    flex: none;

    &:hover {
      color: #f14668;
    }
  }
</style>
