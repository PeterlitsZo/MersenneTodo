<template>
  <div class="iconContianer">
    <v-icon class="iconCenter" :name="name" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      name: {
        type: String,
        required: true
      }
    }
  })
</script>

<style lang="scss">
  .iconContianer {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .iconCenter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
