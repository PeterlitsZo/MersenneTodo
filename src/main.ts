
import { VNode } from 'vue/types'
import { DirectiveBinding } from 'vue/types/options'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'

Vue.config.productionTip = false

Vue.component('v-icon', Icon)

// stack-overflow: https://stackoverflow.com/a/65006128/13031497
interface HTMLElementWithClickOutside extends HTMLElement {
  clickOutsideEvent?(event: MouseEvent): void;
}

Vue.directive('click-outside', {
  bind (el: HTMLElementWithClickOutside, binding: DirectiveBinding, vnode: VNode) {
    // stack-overflow: https://stackoverflow.com/a/42389266/13031497
    el.clickOutsideEvent = function (event: MouseEvent): void {
      if (!(el == event.target) ||
            event.target instanceof Node && el.contains(event.target)) {
        // TODO: `as any' is ungy.
        (vnode.context as any)[binding.expression](event);
      }
    }
    // TODO: ugly, but fix the bug:
    // 2020/11/20 - Peterlits Zo
    // When I click the the ellipsis-h buttom, it do not change anything.
    // I find that itself call this function auto, so I add this after times.
    setTimeout(() => {
      if (el.clickOutsideEvent) {
        document.body.addEventListener('click', el.clickOutsideEvent)
      }
    }, 50)
  },
  unbind (el: HTMLElementWithClickOutside) {
    if (el.clickOutsideEvent) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
