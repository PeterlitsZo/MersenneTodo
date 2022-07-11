import type { MutationTree } from 'vuex';
import { remote } from 'electron'

import type { State, Bar } from '../types';
import { barByIndex, normalBar } from '../utils';

interface DeleteBarPayload {
  index: number[];
}

// Delete bar by its index.
// The index is an array of number. Make sure its length >= 1
export function deleteBar (
  this: MutationTree<any>,
  state: State,
  payload:DeleteBarPayload,
) {
  // reset the editor's index
  this.commit('todolist/changeNextBarParentIndex', { index: undefined })

  // Get the `parentBarArr` and `last_index`, to make we can find the bar.
  const index_copy = payload.index.slice()
  let parentBarArr: Bar[];
  const last_index: number = index_copy.pop()!;
  if (payload.index.length > 1) {
    parentBarArr = barByIndex(state.barRoot, index_copy).child;
  } else if (payload.index.length == 1) {
    parentBarArr = state.barRoot.child;
  } else {
    console.error(`index == ${payload.index}`)
    console.error('we need it be array of at least one number')
    return
  }

  // Copy to avoid we forget it.
  remote.clipboard.writeText(parentBarArr[last_index].title);

  // Delete the bar.
  parentBarArr.splice(last_index, 1);

  // Update.
  this.commit('todolist/update', { barRoot: state.barRoot })
}