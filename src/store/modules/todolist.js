import fs from 'fs'

// editor_text_C: const state for editor's text
const editor_text_C = {
  main: 'Text TODO, enter <kbd>Ctrl+Enter</kbd> to submit:',
  sub: title => `Text TODO, enter <kbd>Ctrl+Enter</kbd> for submit for ` +
                `${JSON.stringify(title)}, and enter <kbd>Esc</kbd> to ` +
                `leave:`
}

// initial state
// shape: {
//   bars: [ {title: String, time: Data(), OK: Boolean}, ... ]
//   editor: {text: String}
// }
const state = () => ({
  bars: [],
  editor: {text: editor_text_C.main, index: undefined},
  filePath: ''
})

// make the bar/bars be normal, be in bars' shape
var normalBar = (bar) => {
  if (!bar['title']) console.error('Bar require title')
  bar['time'] = bar['time'] ? new Date(bar['time']) : new Date()
  bar['OK'] = bar['OK'] ? bar['OK'] : false
  bar['child'] = normalBars(bar['child'])
  return bar
}

var normalBars = (bars) => {
  var result = []
  if (bars) {
    for (var i = 0; i < bars.length; i++) {
      if(bars[i])
        result.push(normalBar(bars[i]))
    }
  }
  return result
}

// get the bar by index
var barByIndex = (bars, index) => {
  var result = { child: bars }
  console.log('index: ', index, ', result: ', result)
  for (var i = 0; i < index.length; i++) {
    result = result.child[index[i]]
    console.log(result, result.title)
  }
  return result
}

// mutations
const mutations = {
  // init Bars for todo application.
  // read `json` file form filePath, then init state.bars with update mutations.
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

  // update Bars and save
  // set the state.bars' value to `bars`, then write it to filePath
  update (state, { bars }) {
    state.bars = bars
    fs.writeFile(state.filePath, JSON.stringify(state.bars), (err) => {
      if (err) {
        console.error(`Cannot write to ${state.filePath}!`)
      }
    })
  },

  // kill bar by index
  killBar (state, { index }) {
    state.bars.splice(index, 1)
    this.commit('todolist/update', { bars: state.bars })
  },

  // change the bay's OK state by index
  changeState (state, { index }) {
    state.bars[index].OK = !state.bars[index].OK
    this.commit('todolist/update', { bars: state.bars })
  },

  // add Bar for todo list:
  //  - if index == undef, add bar to the root
  //  - else, add bar for bars[index[0]][index[1]]...
  addBar (state, { index }) {
    state.editor.index = index
    console.log(state.editor.index)

    if (state.editor.index != undefined) {
      var aim = barByIndex(state.bars, state.editor.index)
      console.log('aim: ', aim)
      state.editor.text = editor_text_C.sub(aim.title)
    } else {
      state.editor.text = editor_text_C.main
    }
  },

  // submit by message and index, and then update it:
  //  - if index == undef, add bar to the root
  //  - else, add bar for bars[index]
  submit (state, { message }) {
    console.log(state.editor.index)
    if (state.editor.index != undefined) {
      var aim = barByIndex(state.bars, state.editor.index)
      console.log('aim: ', aim)
      aim.child.unshift(normalBar({title: message}))
      this.commit('todolist/update', { bars: state.bars })
    } else {
      state.bars.unshift(normalBar({title: message}))
      this.commit('todolist/update', { bars: state.bars })
    }
    console.log(state.bars)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
