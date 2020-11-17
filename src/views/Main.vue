<template>
  <TodoList :bars="bars" @update="update" />
</template>

<script>
  import TodoList from '../components/TodoList.vue'

  import fs from 'fs'

  function normalBars (bars) {
    var result = bars.slice()
    for (var i = 0; i < result.length; i++) {
      if (!result[i]['time']) {
        result[i]['time'] = new Date()
      } else {
        result[i]['time'] = new Date(result[i]['time'])
      }
      if (!result[i]['OK']) result[i]['OK'] = false
      if (!result[i]['title']) /* raise a error */;
    }
    return result
  }

  export default {
    name: 'Main',
    data: () => {
      return {
        bars: normalBars([{title: 'hello'}])
      }
    },
    methods: {
      update (bars) {
        this.bars = bars
        fs.writeFile('.mersennetodo.json', JSON.stringify(this.bars), (err) => {
          if (err) {
            console.error('Cannot write to .mersennetodo.json!')
          }
        })
      }
    },
    created () {
      console.log('mounted..., this.bars = ', this.bars)
      fs.readFile('.mersennetodo.json', (err, data) => {
        if (err) {
          this.update(normalBars([
            {title: '1. Click on my text to set my state (OK/Todo)'},
            {title: '2. Want to set a new Todo? Edit at below editor, then press `Ctrl+Enter`'},
            {title: ['3. A Useless Todo bar? move on me and you can find a bin ',
              'icon, then click on the my delete bin icon'].join('')}
          ]))
          console.log('err, do not find .mersennetodo.json, set it to: ', this.bars)
          fs.writeFile('.mersennetodo.json', JSON.stringify(this.bars), (err) => {
            if (err) {
              console.error('Cannot write to .mersennetodo.json!')
            }
          })
          return
        }
        this.bars = normalBars(JSON.parse(data))
      })
    },
    components: {
      'TodoList': TodoList
    }
  }
</script>

<style>
</style>
