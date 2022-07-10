import { remote } from 'electron'
import { MutationTree } from 'vuex'

import { EDITOR_TEXT, state, normalBar, barByIndex } from './utils';
import type { State, Bar } from './types';
import { init } from './mutations/init';
import { update } from './mutations/update';
import { changeState } from './mutations/changeState';

// mutations
const mutations: MutationTree<any> = {
  init,
  update,
  changeState,

  // Delete bar by its index.
  // The index is an array of number. Make sure its length >= 1
  deleteBar (state: State, { index }: { index: number[] }) {
    // reset the editor's index
    this.commit('todolist/changeNextBarParentIndex', { index: undefined })

    // Get the `parentBarArr` and `last_index`, to make we can find the bar.
    const index_copy = index.slice()
    let parentBarArr: Bar[];
    const last_index: number = index_copy.pop()!;
    if (index.length > 1) {
      parentBarArr = barByIndex(state.barRoot, index_copy).child;
    } else if (index.length == 1) {
      parentBarArr = state.barRoot.child;
    } else {
      console.error(`index == ${index}`)
      console.error('we need it be array of at least one number')
      return
    }

    // Copy to avoid we forget it.
    remote.clipboard.writeText(parentBarArr[last_index].title);

    // Delete the bar.
    parentBarArr.splice(last_index, 1);

    // Update.
    this.commit('todolist/update', { barRoot: state.barRoot })
  },

  // change the index of the next bar in the todo list for editor:
  // - if index == undef, add bar to the root
  // - else, add bar for bars[index[0]][index[1]]...
  changeNextBarParentIndex (state: State, { index }: { index: number[] }) {
    // Change the index of editor and update its helpful text.
    state.editor.index = index
    if (state.editor.index != undefined) {
      var aim = barByIndex(state.barRoot, state.editor.index)
      state.editor.text = EDITOR_TEXT.sub(aim.title)
    } else {
      state.editor.text = EDITOR_TEXT.main
    }

    // Focus the editor.
    if (state.editor.obj === null) {
      console.error('state.editor.obj is null')
      return;
    }
    state.editor.obj.focus();

    // TODO: What it means???
    this.commit('todolist/update', { barRoot: state.barRoot })
  },

  // fold Bar for todo list
  foldBar (state: State, { index }: { index: number[]; }) {
    var aim = barByIndex(state.barRoot, index);
    aim.folding = !aim.folding;
    this.commit('todolist/update', { barRoot: state.barRoot });
  },

  // submit by message and index, and then update it:
  //  - if index == undef, add bar to the root
  //  - else, add bar for bars[index]
  submit (state: State, { message }: { message: string; }) {
    if (state.editor.index != undefined) {
      var aim = barByIndex(state.barRoot, state.editor.index)
      aim.child.unshift(normalBar({title: message}));
      this.commit('todolist/update', { barRoot: state.barRoot });
    } else {
      state.barRoot.child.unshift(normalBar({title: message}));
      this.commit('todolist/update', { barRoot: state.barRoot })
    }
  }
}

const getters = {
  state: (state: State) => (index: number[]) => {
    var aim = barByIndex(state.barRoot, index)
    if (aim.child.length != 0) {
      return aim.folding ? 'folding' : 'unfolding'
    } else {
      return aim.OK ? 'OK' : 'not OK'
    }
  },
  folding: (state: State) => (index: number[]) => {
    return barByIndex(state.barRoot, index).folding
  },
  havechildren: (state: State) => (index: number[]) => {
    return barByIndex(state.barRoot, index).child.length != 0
  },
  OK: (state: State, getters: any) => (index: number[]) => {
    var aim = barByIndex(state.barRoot, index)
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
