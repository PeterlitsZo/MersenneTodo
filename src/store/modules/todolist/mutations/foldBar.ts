import type { MutationTree } from "vuex";

import type { State } from "../types";
import { barByIndex } from '../utils';

interface FoldBarPayload {
  index: number[];
}

// fold Bar for todo list
export function foldBar(
  this: MutationTree<any>,
  state: State,
  payload: FoldBarPayload,
) {
  var aim = barByIndex(state.barRoot, payload.index);
  aim.folding = !aim.folding;
  this.commit('todolist/update', { barRoot: state.barRoot });
}