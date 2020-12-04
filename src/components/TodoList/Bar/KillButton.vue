<template>
  <Icon name="trash" class="barButton" />
</template>

<script lang="ts">
  import Vue from 'vue'

  import Icon from '../../Comman/Icon.vue'

  export default Vue.extend({
    name: 'KillButton',
    components: {
      Icon
    }
  })
</script>

<style lang="scss">
  .barButton {
    &:hover {
      color: #f14668;
    }
  }
</style>
