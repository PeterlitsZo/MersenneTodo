<template>
  <div class="endtitle">
    <slot />
  </div>
</template>

<script>
</script>

<style lang="scss">
  .endtitle {
    position: relative;
    padding: 20px;
    justify-content: center;
    align-items: center;
    &::before {
      position: absolute;
      background-color: #f2f2f2;
      top: 0;
      content: '';
      height: 1px;
      left: 0;
      right: 0;
      opacity: 1;
      pointer-events: none;
    }
  }
</style>

