<template>
  <div class="noselect TodoList">
    <!-- The title of the TodoList -->
    <Title class="title">TodoList</Title>

    <!-- The toll bar bar -->
    <Toolbar class="toolbar"/>

    <!-- The list of the TodoList/Bar -->
    <div class="todolist">
      <Bar
        class="Bar"
        v-for="(bar, index) in $store.state.todolist.barRoot.child"
        :obj="bar"
        :index="[index]"
        :key="index"
      />
    </div>

    <!-- The list of the TodoList/EditBar -->
    <EndTitle><EditBar /></EndTitle>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  import Bar from './TodoList/Bar.vue';
  import EditBar from './TodoList/EditBar.vue';
  import EndTitle from './Comman/EndTitle.vue';
  import Title from './Comman/Title.vue';
  import Toolbar from './TodoList/Toolbar.vue';

  export default Vue.extend({
    name: 'TodoList',
    components: {
      Bar,
      EditBar,
      EndTitle,
      Title,
      Toolbar,
    }
  });
</script>

<style scoped lang="scss">
  .noselect {
    user-select: none;
  }

  .TodoList {
    display: flex;
    flex-flow: column;
    height: 100%;

    .title {
      font-size: 2em;
    }

    .toolbar {
      font-size: 1.3em;
    }

    .todolist {
      padding: 20px;
      flex-grow: 1;
      overflow: auto;
      font-size: 1.3em;
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
  }
</style>
