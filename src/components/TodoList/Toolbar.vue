<template>
  <div class="toolbar">
    <div class="history">
      <Icon name="history"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  import Icon from '@/components/Comman/Icon.vue'

  export default Vue.extend({
    components: {
      Icon,
    },
  });
</script>

<style scoped lang="scss">
  @import '../Comman/comman.scss';

  .toolbar {
    // padding of up and down
    $udPadding: $normalPadding / 2;

    display: flex;
    padding: $udPadding $normalPadding $udPadding $normalPadding;
    background: $lightgray;

    .history {
      height: 1em;
      width: 2em;
    }
  }
</style>
