<template>
  <div>
    <div class="bar" :class="{OK: state}">
      <OKBox @bar-OK="setState('OK')" @bar-not-OK="setState('not OK')"/>
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
    data: () => {
      return {
        state: false
      }
    },
    methods: {
      setState (message) {
        this.state = (message === 'OK')
      }
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

  .OK {
    color: #888888;
  }
</style>
