import { MutationTree } from 'vuex';

import { barByIndex } from '../utils';
import type { State } from '../types';

interface ChangeStatePayload {
  index: number[];
}

// change the bay's OK state by index
export function changeState(
  this: MutationTree<any>,
  state: State,
  payload: ChangeStatePayload
) {
  const { index } = payload;

  // do not change the state if the index have its children
  if ((this.getters as any)["todolist/havechildren"](index))
    return;
  if (index.length <= 0) {
    console.error('The index.length should >= 1');
  }

  var aim = barByIndex(state.barRoot, index);
  aim.OK = !aim.OK;
  aim.parent.child.splice(index[index.length-1], 1);
  if (aim.OK) {
    aim.parent.child.push(aim);
  } else {
    aim.parent.child.unshift(aim);
  }
  this.commit('todolist/update', { barRoot: state.barRoot });
}