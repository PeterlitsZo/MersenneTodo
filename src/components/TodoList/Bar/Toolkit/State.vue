<template>
  <div>
    <div v-if="havechildren" class="icon" @click="foldBar">
      <Icon v-if="folding" name="angle-right" />
      <Icon v-else name="angle-down" />
    </div>
    <div v-else class="icon" @click="changeState">
      <Icon v-if="state == 'OK'" name="check-circle" />
      <Icon v-else name="regular/circle" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue' 
  import Icon from '../../../Comman/Icon.vue'

  export default Vue.extend({
    props: {
      index: {
        type: Array,
        required: true
      },
    },
    methods: {
      foldBar () {
        this.$store.commit('todolist/foldBar', {index: (this as any).index});
      },
      changeState () {
        this.$store.commit('todolist/changeState', {index: (this as any).index});
      },
    },
    computed: {
      state () {
        return this.$store.getters['todolist/state'](this.index);
      },
      folding () {
        return this.$store.getters['todolist/folding'](this.index);
      },
      havechildren () {
        return this.$store.getters['todolist/havechildren'](this.index);
      },
    },
    components: {
      Icon,
    }
  });
</script>
