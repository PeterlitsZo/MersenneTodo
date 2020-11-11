<template>
  <div class="titleTools">
    <v-icon @click="$emit('add-todo')">
      <v-icon name="plus" />
      <v-icon scale="2" name="regular/square" />
    </v-icon>
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
