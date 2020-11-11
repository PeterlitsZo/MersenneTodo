<template>
  <div class="noselect">
    <div class="title">
      <div class="titleText">
        <h1>TodoList</h1>
      </div>
      <div class="titleTools">
        <div class="titleTool">
          <v-icon name="plus" />
        </div>
      </div>
    </div>
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

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .titleText {
    flex: auto;
  }

  .titleTools {
    flex: none;
  }

  .titleTool {
  }
</style>
