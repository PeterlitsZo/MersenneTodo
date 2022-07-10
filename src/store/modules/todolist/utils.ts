import type { State, Bar, BarAbsolute } from './types';

// EDITOR_TEXT: const state for editor's text
export const EDITOR_TEXT: any = {
  main: 'Text TODO, enter <kbd>Ctrl+Enter</kbd> to submit:',
  sub: (title: string): string => {
    return `Text TODO, enter <kbd>Ctrl+Enter</kbd> for submit for ` +
    `${JSON.stringify(title)}, and enter <kbd>Esc</kbd> to ` +
    `leave:`
  }
}

export const state = (): State => ({
  barRoot: { child: [] },
  editor: {
    text: EDITOR_TEXT.main,
    index: [],
    container: undefined,
    obj: null
  },
  filePath: ''
})

// make the bar/bars be normal, be in bars' shape
export const normalBar = (bar: any): Bar => {
  if (!bar.title) console.error('Bar require title!!!')
  bar.time = bar.time ? new Date(bar.time) : new Date()
  bar.OK = bar.OK ? bar.OK : false
  bar.folding = bar.folding ? bar.folding : false
  bar.child = bar.child ? normalBars(bar.child as any[]) : ([] as any[])
  return bar
}

export const normalBars = (bars: any[]): Bar[] => {
  var result = []
  for (var i = 0; i < bars.length; i++) {
    if(bars[i])
      result.push(normalBar(bars[i]))
  }
  return result
}

// get the bar by index
export const barByIndex = (barRoot: BarAbsolute, index: number[]): Bar => {
  if (index.length == 0) {
    console.error('index.length == 0: But we hope it > 0');
  }
  for (let i = 0; i < index.length; i++) {
    barRoot = barRoot.child[index[i]];
  }
  return (barRoot as Bar)
}