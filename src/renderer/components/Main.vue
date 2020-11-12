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
        bars: [{title: 'chilk the [+] token to insert a new TODO', OK: true}]
      }
    },
    components: {
      'TodoList': TodoList
    }
  }
</script>

<style>
</style>
