<template>
  <div class="NavButtom">
    <router-link class="NavText" :to="{ name: to, params: params}">
      <div v-if="icon"><v-icon scale="2" :name="icon" /></div>
      <div v-else>{{ to }}</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'NavButtom',
    props: {
      to: {type: String, required: true},
      params: {type: Object, default: function() {return {}} /*Empty object*/ },
      icon: {type: String, default: ""}
    }
  }
</script>

<style>
  .NavButtom {
    height: 3em;
    margin: 1em 0 1em auto;
    background: #f2f2f2;
    position: relative;
  }

  .NavButtom:hover {
    background: #e2e2e2;
  }

  .NavText {
    color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
