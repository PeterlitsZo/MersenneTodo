<template>
  <div class="title">
    <slot />
  </div>
</template>

<script>
</script>

<style lang="scss">
  .title {
    position: relative;
    padding: 20px;
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

