<template>
  <div>
    <div class="bar" :class="{OK: obj.OK}">
      <OKBox :OK="obj.OK" @bar-OK="setState('OK')" @bar-not-OK="setState('not OK')"/>
      <div class="barName" :class="{deleteText: obj.OK}">{{ obj.title }}</div>
      <KillButton @kill-bar="killSelf" />
    </div>
  </div>
</template>

<script>
  import KillButton from './Bar/KillButton.vue'
  import OKBox from './Bar/OKBox.vue'
  
  export default {
    name: 'Bar',
    props: {
      obj: Object,
      index: Number
    },
    methods: {
      setState (message) {
        this.obj.OK = (message === 'OK')
      },
      killSelf () {
        this.$emit('kill-bar', this.index)
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

  .deleteText {
    text-decoration: line-through;
  }
</style>
