<template>
  <TodoList />
</template>

<script lang="ts">
  import Vue from 'vue'

  import TodoList from '../components/TodoList.vue'

  export default Vue.extend({
    name: 'Main',
    components: {
      'TodoList': TodoList
    }
  })
</script>

<style>
</style>
