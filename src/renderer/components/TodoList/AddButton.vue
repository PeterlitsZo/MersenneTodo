<template>
  <div class="titleTools">
    <v-icon @click="$emit('add-todo')" name="plus" />
  </div>
</template>

<script>
  export default {
    name: 'Bar',
    props: {
      obj: Object
    }
  }
</script>

<style>
  .titleTools {
    flex: none;
  }
</style>
