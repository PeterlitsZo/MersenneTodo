<template>
  <router-link
    :to="{ name: to, params: params}"
  >
    <div class="NavButtom" :class="{activation: isactivation}">
      <div class="NavText">
        <template v-if="icon"><v-icon scale="1.4" :name="icon" /></template>
        <template v-else>{{ to }}</template>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'NavButtom',
    props: {
      to: {type: String, required: true},
      params: {type: Object, default: function() {return {}} /*Empty object*/ },
      icon: {type: String, default: ""}
    },
    computed: {
      isactivation () {
        var router = this.$route
        if ('name' in router) {
          return router.name == this.to
        } else {
          return false
        }
      }
    }
  })
</script>

<style lang="scss">
  .NavButtom {
    height: 2.5em;
    margin: 0.5em 0 0.5em auto;
    position: relative;

    &[class~="activation"] {
      .NavText {
        color: #1F3550;
      }
      &:hover{
        background: #e2e2e2;
      }
      &:not(:hover) {
        background: #f2f2f2;
      }
    }

    &:not([class~="activation"]) {
      .NavText {
        color: #e2e2e2;
      }
      &:hover {
        background: #1F3550;
      }
      &:not(:hover) {
        background: #0F2540;
      }
    }
  }

  .NavText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
