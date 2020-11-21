<template>
  <TodoList />
</template>

<script>
  import TodoList from '../components/TodoList.vue'

  export default {
    name: 'Main',
    components: {
      'TodoList': TodoList
    }
  }
</script>

<style>
</style>
