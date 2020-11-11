<template>
  <div class="noselect">
    <!-- The title of the TodoList -->
    <div class="title">
      <div class="titleText">
        <h1>TodoList</h1>
      </div>
      <div class="titleTools">
        <v-icon name="plus" />
      </div>
    </div>

    <!-- The list of the TodoList/Bar -->
    <div>
      <Bar
        v-for="bar in bars"
        :obj="bar"
        @on-delete="console.log('!!!TODO!!!')"
      />
      <EditBar
        v-if="editing"
      />
    </div>
  </div>
</template>

<script>
  import Bar from './TodoList/Bar.vue'
  import EditBar from './TodoList/EditBar.vue'

  export default {
    name: 'TodoList',
    data: () => {
      return {
        bars: [{title: 'temp1'}, {title: 'temp2'}, {title: 'temp3'}],
        editing: false
      }
    },
    components: {
      'Bar': Bar,
      'EditBar': EditBar
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
</style>
