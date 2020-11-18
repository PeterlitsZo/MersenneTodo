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

<script>
  export default {
    name: 'NavButtom',
    props: {
      to: {type: String, required: true},
      params: {type: Object, default: function() {return {}} /*Empty object*/ },
      icon: {type: String, default: ""}
    },
    computed: {
      isactivation () {
        console.log(this.$route.name, this.to)
        return this.$route.name == this.to
      }
    }
  }
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
