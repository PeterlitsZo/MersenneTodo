import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

Vue.component('v-icon', Icon)

// stack-overflow: https://stackoverflow.com/a/42389266/13031497
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    console.log('Binding')
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    // ugly, but fix the bug:
    // 2020/11/20 - Peterlits Zo
    // When I click the the ellipsis-h buttom, it do not change anything.
    // I find that itself call this function.
    setTimeout(() => {
      document.body.addEventListener('click', el.clickOutsideEvent)
    }, 100)
  },
  unbind: function (el) {
    console.log('UnBinding')
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
