<template>
  <div class="noselect">
    <h1>TodoList</h1>
    <div v-for="bar in bars">
      <Bar :obj="bar" />
    </div>
  </div>
</template>

<script>
  import Bar from './TodoList/Bar.vue'

  export default {
    name: 'TodoList',
    data: () => {
      return {
        bars: [{title: 'temp1'}, {title: 'temp2'}, {title: 'temp3'}]
      }
    },
    components: {
      'Bar': Bar
    }
  }
</script>

<style>
  .noselect {
    user-select: none;
  }
</style>
