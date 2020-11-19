<template>
  <Icon name="trash" class="barButton" />
</template>

<script>
  import Icon from '../../Comman/Icon.vue'

  export default {
    name: 'KillButton',
    components: {
      Icon
    }
  }
</script>

<style lang="scss">
  .barButton {
    &:hover {
      color: #f14668;
    }
  }
</style>
