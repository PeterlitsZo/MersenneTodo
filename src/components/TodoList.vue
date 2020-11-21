<template>
  <div class="noselect TodoList">
    <!-- The title of the TodoList -->
    <Title class="title">TodoList</Title>

    <!-- The list of the TodoList/Bar -->
    <div class="todolist">
      <Bar
        class="Bar"
        v-for="(bar, index) in $store.state.todolist.bars"
        :obj="bar"
        :index="index"
        :key="index"
      />
    </div>

    <!-- The list of the TodoList/EditBar -->
    <EndTitle><EditBar /></EndTitle>
  </div>
</template>

<script>
  import Bar from './TodoList/Bar.vue'
  import EditBar from './TodoList/EditBar.vue'
  import Title from './Comman/Title.vue'
  import EndTitle from './Comman/EndTitle.vue'

  export default {
    name: 'TodoList',
    components: {
      Bar,
      EditBar,
      Title,
      EndTitle
    }
  }
</script>

<style lang="scss">
  .noselect {
    user-select: none;
  }

  .title {
    font-size: 2em;
  }

  .TodoList {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  .todolist {
    padding: 20px;
    flex-grow: 1;
    overflow: auto;
    .Bar {
      position: relative;

      + .Bar::before {
        background-color: #f2f2f2;
        position: absolute;
        content: '';
        height: 1px;
        top: 0;
        left: 0;
        right: 0;
        opacity: 1;
        pointer-events: none;
      }
    }
  }
</style>
