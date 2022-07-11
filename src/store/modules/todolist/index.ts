import { MutationTree } from 'vuex'

import { state, barByIndex } from './utils';
import type { State, Bar } from './types';
import { init } from './mutations/init';
import { update } from './mutations/update';
import { changeState } from './mutations/changeState';
import { submit } from './mutations/submit';
import { deleteBar } from './mutations/deleteBar';
import { foldBar } from './mutations/foldBar';
import { changeNextBarParentIndex } from './mutations/changeNextBarParentIndex';

// mutations
const mutations: MutationTree<any> = {
  init,
  update,
  changeState,
  submit,
  deleteBar,
  foldBar,
  changeNextBarParentIndex,
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
