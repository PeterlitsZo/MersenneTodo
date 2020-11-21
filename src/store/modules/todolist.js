import fs from 'fs'

// initial state
// shape: [
//   {title: String, time: Data(), OK: Boolean},
//   ...
// ]
const state = () => ({
  bars: [],
  filePath: ''
})

// make the bar/bars be normal, be in bars' shape
var normalBar = (bar) => {
  bar['time'] = bar['time'] ? new Date(bar['time']) : new Date()
  bar['OK'] = bar['OK'] ? bar['OK'] : false
  if (!bar['title']) console.error('Bar require title')
  return bar
}

var normalBars = (bars) => {
  var result = []
  for (var i = 0; i < bars.length; i++) {
    if(bars[i])
      result.push(normalBar(bars[i]))
  }
  return result
}

// mutations
const mutations = {
  init (state, { filePath }) {
    state.filePath = filePath
    fs.readFile(state.filePath, (err, data) => {
      if (err) {
        this.update(state, {
          bars: normalBars([
            {title: '1. Click on my text to set my state (OK/Todo)'},
            {title: ['2. Want to set a new Todo? Edit at below editor, then press',
              ' `Ctrl+Enter`'].join('')},
            {title: ['3. A Useless Todo bar? move on me and you can find a bin ',
              'icon, then click on the my delete bin icon'].join('')}
          ])
        })
        return
      }
      state.bars = normalBars(JSON.parse(data))
    })
  },
  update (state, { bars }) {
    if (bars) state.bars = bars
    fs.writeFile(state.filePath, JSON.stringify(state.bars), (err) => {
      if (err) {
        console.error(`Cannot write to ${state.filePath}!`)
      }
    })
  },
  killBar (state, { index }) {
    state.bars.splice(index, 1)
    this.commit('todolist/update', { bars: state.bars })
  },
  changeState (state, { index }) {
    state.bars[index].OK = !state.bars[index].OK
    this.commit('todolist/update', { bars: state.bars })
  },
  submit (state, { message }) {
    state.bars.unshift(normalBar({title: message}))
    this.commit('todolist/update', { bars: state.bars })
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
