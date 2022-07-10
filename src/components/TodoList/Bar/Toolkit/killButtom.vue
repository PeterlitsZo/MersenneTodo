<template>
  <!-- Kill Button-->
  <div class="icon KillButton" @click="deleteBar">
    <Icon class="icon" name="trash" />
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
      deleteBar () {
        this.$store.commit('todolist/deleteBar', {index: (this as any).index})
      },
    },
    components: {
      Icon,
    }
  });
</script>
