import type { MutationTree } from 'vuex';

import type { State } from '../types';
import { barByIndex, EDITOR_TEXT } from '../utils';

interface ChangeNextBarParentIndexPayload {
  index: number[];
}

// change the index of the next bar in the todo list for editor:
// - if index == undef, add bar to the root
// - else, add bar for bars[index[0]][index[1]]...
export function changeNextBarParentIndex(
  this: MutationTree<any>,
  state: State,
  payload: ChangeNextBarParentIndexPayload,
) {
  // Change the index of editor and update its helpful text.
  state.editor.index = payload.index
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
}
