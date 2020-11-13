<template>
  <div class="noselect">
    <!-- The title of the TodoList -->
    <div class="title">
      <div class="titleText">TodoList</div>
    </div>

    <!-- The list of the TodoList/Bar -->
    <div class="todolist">
      <Bar
        class="Bar"
        v-for="(bar, index) in bars"
        :obj="bar"
        :index="index"
        @kill-bar="killBar"
        @change-state="changeState"
      />
    </div>

    <!-- The list of the TodoList/EditBar -->
    <div class="submitBar">
      <EditBar @submit="submit"/>
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
      }
    },
    methods: {
      killBar (index) {
        this.bars.splice(index, 1)
      },
      changeState (index) {
        this.bars[index].OK = !this.bars[index].OK
      },
      submit (message) {
        this.bars.push({title: message, OK: false})
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

  .Bar {
    position: relative;
  }

  .Bar + .Bar::before {
    background-color: #f2f2f2;
    position: absolute;
    button: 0;
    content: '';
    height: 1px;
    left: 0;
    opacity: 1;
    pointer-events: none;
    right: 0;
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
