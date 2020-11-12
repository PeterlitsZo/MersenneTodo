<template>
  <div>
    <div class="bar">
      <OKBox />
      <div class="barName">{{ obj.title }}</div>
      <KillButton />
    </div>
  </div>
</template>

<script>
  import KillButton from './Bar/KillButton.vue'
  import OKBox from './Bar/OKBox.vue'
  
  export default {
    name: 'Bar',
    props: {
      obj: Object
    },
    components: {
      KillButton: KillButton,
      OKBox: OKBox
    }
  }
</script>

<style>
  .bar {
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .barName {
    flex: auto;
    margin-left: 0.5em;
  }
</style>
