<template>
  <div>
    <div
      class="bar"
      :class="{OK: obj.OK, hoverd: ishovered && !obj.OK, hoverdOK: ishovered && obj.OK}"
      @mouseover="hoverBar(true)"
      @mouseout="hoverBar(false)"
    >
      <OKBox :OK="obj.OK" @bar-OK="setState('OK')" @bar-not-OK="setState('not OK')"/>
      <div class="barName" :class="{deleteText: obj.OK}">{{ obj.title }}</div>
      <KillButton @kill-bar="killSelf" v-show="ishovered" />
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
    data: () => {
      return {
        ishovered: false
      }
    },
    methods: {
      setState (message) {
        this.obj.OK = (message === 'OK')
      },
      killSelf () {
        this.$emit('kill-bar', this.index)
      },
      hoverBar (value) {
        this.ishovered = value
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

  .hoverd {
    color: #387994;
  }

  .hoverdOK {
    color: #3d7e9a;
  }

  .deleteText {
    text-decoration: line-through;
  }
</style>
