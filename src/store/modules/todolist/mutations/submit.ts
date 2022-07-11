import type { MutationTree } from 'vuex';

import type { State } from '../types';
import { barByIndex, normalBar } from '../utils';

interface SubmitPayload {
  message: string;
}

// submit by message and index, and then update it:
//  - if index == undef, add bar to the root
//  - else, add bar for bars[index]
export function submit(
  this: MutationTree<any>,
  state: State,
  payload: SubmitPayload
) {
  const bar = normalBar({title: payload.message});
  const parent = barByIndex(state.barRoot, state.editor.index);
  bar.parent = parent;
  parent.child.unshift(bar);
  this.commit('todolist/update', { barRoot: state.barRoot });
}