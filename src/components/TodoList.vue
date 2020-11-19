<template>
  <div class="noselect TodoList">
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
        :key="index"
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

  export default {
    name: 'TodoList',
    props: {
      bars: Array
    },
    methods: {
      killBar (index) {
        var barArray = this.bars.slice()
        barArray.splice(index, 1)
        this.$emit('update', barArray)
      },
      changeState (index) {
        var barArray = this.bars.slice()
        barArray[index].OK = !barArray[index].OK
        this.$emit('update', barArray)
      },
      submit (message) {
        var barArray = this.bars.slice()
        barArray.push({title: message, OK: false, time: new Date()})
        this.$emit('update', barArray)
      }
    },
    components: {
      'Bar': Bar,
      'EditBar': EditBar,
    }
  }
</script>

<style lang="scss">
  .noselect {
    user-select: none;
  }

  .TodoList {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  .title {
    position: relative;
    display: flex;
    padding: 20px;
    font-size: 2em;
    justify-content: center;
    align-items: center;
    &::before {
      position: absolute;
      background-color: #f2f2f2;
      bottom: 0;
      content: '';
      height: 1px;
      left: 0;
      right: 0;
      opacity: 1;
      pointer-events: none;
    }

    .titleText {
      flex: auto;
    }
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
        button: 0;
        content: '';
        height: 1px;
        left: 0;
        opacity: 1;
        pointer-events: none;
        right: 0;
      }
    }
  }

  .submitBar {
    padding: 20px;
    position: relative;
    &::before {
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
  }

</style>
