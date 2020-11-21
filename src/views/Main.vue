<template>
  <TodoList />
</template>

<script>
  import TodoList from '../components/TodoList.vue'

  import { remote } from 'electron'

  export default {
    name: 'Main',
    data: () => {
      return {
        datafilepath: remote.app.getPath('userData') + '/mersennetodo.json'
      }
    },
    created () {
      this.$store.commit('todolist/init', { filePath: this.datafilepath })
    },
    components: {
      'TodoList': TodoList
    }
  }
</script>

<style>
</style>
