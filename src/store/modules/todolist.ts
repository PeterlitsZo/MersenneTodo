import { remote } from 'electron'
import { MutationTree } from 'vuex'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

// editor_text_C: const state for editor's text
const editor_text_C: any = {
  main: 'Text TODO, enter <kbd>Ctrl+Enter</kbd> to submit:',
  sub: (title: string): string => {
    return `Text TODO, enter <kbd>Ctrl+Enter</kbd> for submit for ` +
    `${JSON.stringify(title)}, and enter <kbd>Esc</kbd> to ` +
    `leave:`
  },
};

interface Bar {
  title: string;
  time: Date;
  OK: boolean;
  folding: boolean;
  child: Bar[];
}

interface Blob {
  prev: string; // hash or empty string
  child: Bar[];
}

interface Editor {
  text: string;
  index: number[];
  container?: HTMLElement;
  // TODO: ugly type
  obj: any;
}

interface Setting {
  HEAD: string; // hash or empty string
  pool: string;
}

interface State {
  bars: Bar[];
  editor: Editor;
  settingPath: string;
  setting: Setting;
}

const state = (): State => ({
  bars: [],
  editor: {
    text: editor_text_C.main,
    index: [],
    container: undefined,
    obj: null
  },
  settingPath: '',
  setting: {
    HEAD: '',
    pool: '',
  },
});


// make the bar/bars be normal, be in bars' shape
const normalBar = (bar: any): Bar => {
  if (!bar.title) console.error('Bar require title!!!');
  bar.time = bar.time ? new Date(bar.time) : new Date();
  bar.OK = bar.OK ? bar.OK : false;
  bar.folding = bar.folding ? bar.folding : false;
  bar.child = bar.child ? normalBars(bar.child as any[]) : ([] as any[]);
  return bar;
};

var normalBars = (bars: any[]): Bar[] => {
  var result = [];
  for (var i = 0; i < bars.length; i++) {
    if(bars[i])
      result.push(normalBar(bars[i]));
  }
  return result;
};

// get the bar by index
var barByIndex = (bars: Bar[], index: number[]): Bar => {
  var result: any = { child: bars };
  for (var i = 0; i < index.length; i++) {
    result = result.child[index[i]];
  }
  return (result as Bar);
};

// mutations
const mutations: MutationTree<any> = {
  init (state: State, { settingPath }: { settingPath: string; }): void {
    // init Bars for todo application.
    // read `json` file form filePath, then init state.bars with update mutations.
    // called by ./src/App.vue
    // ------------------------------------------------------------------------

    state.settingPath = settingPath
    fs.readFile(state.settingPath, (err, data) => {
      if (err) {
        var setting = {
          pool: '.mersennetodo',
          HEAD: '', // the HEAD obj locale at `pool`/`HEAD[:2]`/`HEAD[2:]`
        };

        fs.writeFile(state.settingPath, JSON.stringify(setting), (err) => {
          if (err) {
            console.error(`Cannot write to ${state.settingPath}!`)
          }
        });

        this.update(state, {
          bars: normalBars([
            {title: '1. Click on my text to set my state (OK/Todo)'},
            {title: ['2. Want to set a new Todo? Edit at below editor, then press',
              ' `Ctrl+Enter`'].join('')},
            {title: ['3. A Useless Todo bar? move on me and you can find a bin ',
              'icon, then click on the my delete bin icon'].join('')}
          ])
        });
      } else {
        const setting: Setting = JSON.parse(data.toString());
        state.setting = setting;
        if (setting.HEAD !== '') {
          const HEADPath = path.join(setting.pool, setting.HEAD.slice(0, 2), setting.HEAD.slice(2));
          fs.readFile (HEADPath, (err, data) => {
            if (err) {
              console.log(`cannot read file ${HEADPath}`);
            } else {
              state.bars = normalBars(JSON.parse(data.toString()).child);
            }
          });
        } else {
          state.bars = [];
        }
      }
    });

    // init the Editor
    // ------------------------------------------------------------------------
    state.editor.container = document.createElement('div');
    state.editor.container.style.height = '5em';
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
    // update state's bars
    state.bars = bars;

    // update the HEAD pointer
    const data: Blob = {prev: state.setting.HEAD, child: bars};
    const hash: string = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
    state.setting.HEAD = hash;

    // write it to `settingPath`
    fs.writeFile(state.settingPath, JSON.stringify(state.setting), (err) => {
      if (err) {
        console.error(`Cannot write to ${state.settingPath}!`);
      }
    });

    // write the object to `pool`/`hashArray[0]`/`hashArray[1]`
    const hashArray: string[] = [hash.slice(0, 2), hash.slice(2)];
    const hashFolder: string = path.join(state.setting.pool, hashArray[0]);
    fs.mkdir(hashFolder, {recursive: true}, (err) => {
      if (err) {
        console.log(`Cannot make folder: ${hashFolder}`);
      } else {
        const hashFile: string = path.join(hashFolder, hashArray[1]);
        fs.writeFile(hashFile, JSON.stringify(data), (err) => {
          if (err) {
            console.error(`Cannot write to ${hashFile}`);
          }
        });
      }
    });
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

