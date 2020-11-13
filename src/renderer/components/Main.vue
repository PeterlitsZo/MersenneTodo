<template>
  <div>
    <TodoList :bars="bars" />
  </div>
</template>

<script>
  import TodoList from './TodoList.vue'

  export default {
    name: 'Main',
    data: () => {
      return {
        bars: []
      }
    },
    components: {
      'TodoList': TodoList
    }
  }
</script>

<style>
</style>
