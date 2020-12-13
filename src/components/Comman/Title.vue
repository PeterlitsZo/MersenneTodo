<template>
  <div class="title">
    <slot />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({})
</script>

<style lang="scss">
  @import './comman.scss';

  .title {
    position: relative;
    padding: $normalPadding;
    justify-content: center;
    align-items: center;
    &::before {
      position: absolute;
      background-color: #f2f2f2;
      bottom: 0;
      content: '';
      height: 1px;
      left: 0;
      right: 0;
      opacity: 1;
      pointer-events: none;
    }
  }
</style>

