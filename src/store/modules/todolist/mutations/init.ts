import fs from 'fs';
import { MutationTree } from 'vuex';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { BarAbsolute, State } from "../types"
import { normalBars } from '../utils';

interface InitPayload {
  filePath: string;
}

const INIT_BARS = normalBars([
  { title: '1. Click on my text to set my state (OK/Todo)' },
  {
    title: (
      '2. Want to set a new Todo? Edit at below editor, then press '
      + '`Ctrl+Enter`'
    )
  },
  {
    title: (
      '3. A Useless Todo bar? move on me and you can find a bin icon, then '
      + 'click on the my delete bin icon'
    )
  }
]);

const MONACO_CONFIG: monaco.editor.IStandaloneEditorConstructionOptions = {
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
};

/**
 * Init the todolist.
 */
export function init(
  this: MutationTree<any>,
  state: State,
  payload: InitPayload
) {
  // Get the data from fs.
  state.filePath = payload.filePath;
  try {
    const data = fs.readFileSync(state.filePath);
    const child = normalBars(JSON.parse(data.toString()));
    state.barRoot = { child };
    setParent(state.barRoot);
  } catch(err) {
    this.update(state, { bars: INIT_BARS });
    return;
  }
  console.info('The barRoot is:', state.barRoot);

  // Init the editor.
  state.editor.container = document.createElement('div')
  state.editor.container.style.height = '5em'
  state.editor.obj = monaco.editor.create(
    state.editor.container,
    MONACO_CONFIG
  );

  // Set the command for edit to enter the message.
  const CtrlAndEnter = monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter;
  state.editor.obj.addCommand(CtrlAndEnter, () => {
    if (state.editor.obj === null)
      return;
    this.commit('todolist/submit', {
      message: state.editor.obj.getValue()
    })
    state.editor.obj.setValue('')
  })

  // Set the command for enter the message for root
  state.editor.obj.addCommand(monaco.KeyCode.Escape, () => {
    this.commit('todolist/changeNextBarParentIndex', { index: undefined })
  });
}

const setParent = (root: BarAbsolute) => {
  for (let subBar of root.child) {
    setParent(subBar);
    subBar.parent = root;
  }
}