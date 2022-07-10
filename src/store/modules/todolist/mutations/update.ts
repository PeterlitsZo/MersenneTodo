import { MutationTree } from "vuex";
import fs from "fs";

import { State, Bar, BarAbsolute } from "../types";

interface UpdatePayload {
  barRoot: BarAbsolute;
}

// update Bars and save
// set the state.bars' value to `bars`, then write it to filePath
export function update(
  this: MutationTree<any>,
  state: State,
  payload: UpdatePayload
) {
  state.barRoot = payload.barRoot;
  const data = JSON.stringify(state.barRoot.child, (k, v) => {
    if (k === 'parent')
      return;
    return v;
  });
  fs.writeFile(state.filePath, data, (err) => {
    if (err) {
      console.error(`Cannot write to ${state.filePath}!`)
    }
  });
}