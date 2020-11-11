<template>
  <div class="noselect">
    <!-- The title of the TodoList -->
    <div class="title">
      <div class="titleText">
        <h1>TodoList</h1>
      </div>
      <AddButton @add-todo="addTodo" />
    </div>

    <!-- The list of the TodoList/Bar -->
    <div>
      <Bar
        v-for="bar in bars"
        :obj="bar"
        @delete-bar="console.log('!!!TODO!!!')"
      />
      <EditBar @submit="submit" v-if="editing"/>
    </div>
  </div>
</template>

<script>
  import Bar from './TodoList/Bar.vue'
  import EditBar from './TodoList/EditBar.vue'
  import AddButton from './TodoList/AddButton.vue'

  export default {
    name: 'TodoList',
    data: () => {
      return {
        bars: [],
        editing: false
      }
    },
    methods: {
      addTodo () {
        this.editing = true
      },
      submit (message) {
        this.bars.push({title: message})
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .titleText {
    flex: auto;
  }
</style>
