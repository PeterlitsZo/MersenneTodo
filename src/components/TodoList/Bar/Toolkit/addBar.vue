<template>
  <div class="icon" @click="addBar">
    <Icon name="plus" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue' 
  import Icon from '../../../Comman/Icon.vue'

  export default Vue.extend({
    props: {
      index: {
        type: Array,
        required: true,
      },
    },
    methods: {
      addBar () {
        this.$store.commit('todolist/addBar', {index: (this as any).index});
      },
    },
    components: {
      Icon,
    }
  });
</script>
