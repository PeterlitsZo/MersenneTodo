import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export interface BarAbsolute {
  child: Bar[];
}

export interface Bar extends BarAbsolute {
  title: string;
  time: Date;
  OK: boolean;
  folding: boolean;
  child: Bar[];
  parent: BarAbsolute;
}

export interface Editor {
  text: string;
  index: number[];
  container?: HTMLElement;
  obj: null | monaco.editor.IStandaloneCodeEditor;
}

export interface State {
  barRoot: BarAbsolute;
  editor: Editor;
  filePath: string;
}