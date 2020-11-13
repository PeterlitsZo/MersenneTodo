<template>
  <div class="noselect">
    <!-- The title of the TodoList -->
    <div class="title">
      <div class="titleText">TodoList</div>
      <AddButton @add-todo="addTodo" />
    </div>

    <!-- The list of the TodoList/Bar -->
    <div class="todolist">
      <Bar
        v-for="(bar, index) in bars"
        :obj="bar"
        :index="index"
        @kill-bar="killBar"
      />
    </div>

    <!-- The list of the TodoList/EditBar -->
    <div class="submitBar">
      <EditBar
          @submit="submit"
          @dissubmit="dissubmit"
          v-if="editing"
      />
    </div>
  </div>
</template>

<script>
  import Bar from './TodoList/Bar.vue'
  import EditBar from './TodoList/EditBar.vue'
  import AddButton from './TodoList/AddButton.vue'

  export default {
    name: 'TodoList',
    props: {
      bars: Array
    },
    data: () => {
      return {
        editing: false
      }
    },
    methods: {
      addTodo () {
        this.editing = true
      },

      killBar (index) {
        this.bars.splice(index, 1)
      },

      submit (message) {
        this.bars.push({title: message, OK: false})
      },
      dissubmit () {
        this.editing = false
      }
    },
    components: {
      'Bar': Bar,
      'EditBar': EditBar,
      'AddButton': AddButton
    }
  }
</script>

<style>
  .noselect {
    user-select: none;
  }

  .title {
    font-size: 2em;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .title::before {
    background-color: #f2f2f2;
    bottom: 0;
    content: '';
    height: 1px;
    left: 0;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    right: 0;
  }

  .titleText {
    flex: auto;
  }

  .todolist {
    padding: 20px;
  }

  .submitBar {
    padding: 20px;
    position: relative;
  }

  .submitBar::before {
    background-color: #f2f2f2;
    top: 0;
    content: '';
    height: 1px;
    left: 0;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    right: 0;
  }
</style>
