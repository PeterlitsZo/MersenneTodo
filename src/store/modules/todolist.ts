import fs from 'fs'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import { remote } from 'electron'
import { MutationTree } from 'vuex'

// editor_text_C: const state for editor's text
const editor_text_C: any = {
  main: 'Text TODO, enter <kbd>Ctrl+Enter</kbd> to submit:',
  sub: (title: string): string => {
    return `Text TODO, enter <kbd>Ctrl+Enter</kbd> for submit for ` +
    `${JSON.stringify(title)}, and enter <kbd>Esc</kbd> to ` +
    `leave:`
  }
}

interface Bar {
  title: string;
  time: Date;
  OK: boolean;
  folding: boolean;
  child: Bar[];
}

interface Editor {
  text: string;
  index: number[];
  container?: HTMLElement;
  // TODO: ugly type
  obj: any;
}

interface State {
  bars: Bar[];
  editor: Editor;
  filePath: string;
}

const state = (): State => ({
  bars: [],
  editor: {
    text: editor_text_C.main,
    index: [],
    container: undefined,
    obj: null
  },
  filePath: ''
})

// make the bar/bars be normal, be in bars' shape
var normalBar = (bar: any): Bar => {
  if (!bar.title) console.error('Bar require title!!!')
  bar.time = bar.time ? new Date(bar.time) : new Date()
  bar.OK = bar.OK ? bar.OK : false
  bar.folding = bar.folding ? bar.folding : false
  bar.child = bar.child ? normalBars(bar.child as any[]) : ([] as any[])
  return bar
}

var normalBars = (bars: any[]): Bar[] => {
  var result = []
  for (var i = 0; i < bars.length; i++) {
    if(bars[i])
      result.push(normalBar(bars[i]))
  }
  return result
}

// get the bar by index
var barByIndex = (bars: Bar[], index: number[]): Bar => {
  var result: any = { child: bars }
  for (var i = 0; i < index.length; i++) {
    result = result.child[index[i]]
  }
  return (result as Bar)
}

// mutations
const mutations: MutationTree<any> = {
  init (state: State, { filePath }: { filePath: string; }): void {
    // init Bars for todo application.
    // read `json` file form filePath, then init state.bars with update mutations.
    // ------------------------------------------------------------------------
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
      state.bars = normalBars(JSON.parse(data.toString()))
    })

    // init the Editor
    // ------------------------------------------------------------------------
    state.editor.container = document.createElement('div')
    state.editor.container.style.height = '5em'
    state.editor.obj = monaco.editor.create(state.editor.container, {
      value: '',
      language: 'markdown',
      folding: true,
      foldingStrategy: 'indentation',
      automaticLayout: true,
      overviewRulerBorder: false,
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false
      }
    })
    // Set the command for edit to enter the message
    state.editor.obj.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      this.commit('todolist/submit', { message: state.editor.obj.getValue() })
      state.editor.obj.setValue('')
    })
    // Set the command for enter the message for root
    state.editor.obj.addCommand(monaco.KeyCode.Escape, () => {
      this.commit('todolist/addBar', { index: undefined })
    })
  },

  // update Bars and save
  // set the state.bars' value to `bars`, then write it to filePath
  update (state: State, { bars }: { bars: Bar[]; }) {
    state.bars = bars
    fs.writeFile(state.filePath, JSON.stringify(state.bars), (err) => {
      if (err) {
        console.error(`Cannot write to ${state.filePath}!`)
      }
    })
  },

  // kill bar by index
  killBar (state: State, { index }: { index: number[] }) {
    // reset the editor's index
    this.commit('todolist/addBar', { index: undefined })

    var index_ = index.slice()
    if (index.length != 1) {
      var i: number | undefined = index_.pop();
      var aim: Bar = barByIndex(state.bars, index_);
      remote.clipboard.writeText(aim.child[i as number].title);
      aim.child.splice((i as number), 1);
      this.commit('todolist/update', { bars: state.bars })
    } else {
      remote.clipboard.writeText(state.bars[index[0]].title);
      state.bars.splice(index[0], 1);
      this.commit('todolist/update', { bars: state.bars })
    }
  },

  // change the bay's OK state by index
  changeState (state: State, { index }: { index: number[] }) {
    // do not change the State if the index have its children
    if ((this.getters as any)["todolist/havechildren"](index))
      return;
    var aim = barByIndex(state.bars, index);
    aim.OK = !aim.OK;
    this.commit('todolist/update', { bars: state.bars });
  },

  // add Bar for todo list:
  //  - if index == undef, add bar to the root
  //  - else, add bar for bars[index[0]][index[1]]...
  addBar (state: State, { index }: { index: number[] }) {
    state.editor.index = index

    if (state.editor.index != undefined) {
      var aim = barByIndex(state.bars, state.editor.index)
      state.editor.text = editor_text_C.sub(aim.title)
    } else {
      state.editor.text = editor_text_C.main
    }

    // focus on the editor auto
    state.editor.obj.focus();
    this.commit('todolist/update', { bars: state.bars })
  },

  // fold Bar for todo list
  foldBar (state: State, { index }: { index: number[]; }) {
    var aim = barByIndex(state.bars, index);
    aim.folding = !aim.folding;
    this.commit('todolist/update', { bars: state.bars });
  },

  // submit by message and index, and then update it:
  //  - if index == undef, add bar to the root
  //  - else, add bar for bars[index]
  submit (state: State, { message }: { message: string; }) {
    if (state.editor.index != undefined) {
      var aim = barByIndex(state.bars, state.editor.index)
      aim.child.unshift(normalBar({title: message}));
      this.commit('todolist/update', { bars: state.bars });
    } else {
      state.bars.unshift(normalBar({title: message}));
      this.commit('todolist/update', { bars: state.bars })
    }
  }
}

const getters = {
  state: (state: State) => (index: number[]) => {
    var aim = barByIndex(state.bars, index)
    if (aim.child.length != 0) {
      return aim.folding ? 'folding' : 'unfolding'
    } else {
      return aim.OK ? 'OK' : 'not OK'
    }
  },
  folding: (state: State) => (index: number[]) => {
    return barByIndex(state.bars, index).folding
  },
  havechildren: (state: State) => (index: number[]) => {
    return barByIndex(state.bars, index).child.length != 0
  },
  OK: (state: State, getters: any) => (index: number[]) => {
    var aim = barByIndex(state.bars, index)
    if (getters['havechildren'](index)) {
      var flag = true
      for (var i = 0; i < aim.child.length; i ++) {
        if (!getters['OK'](index.concat(i))) {
          flag = false
        }
      }
      return flag
    } else {
      return aim.OK
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}

