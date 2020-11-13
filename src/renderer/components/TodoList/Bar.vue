<template>
  <div>
    <div
      class="bar"
      :class="{OK: obj.OK, hoverd: ishovered && !obj.OK, hoverdOK: ishovered && obj.OK}"
      @mouseover="hoverBar(true)"
      @mouseout="hoverBar(false)"
    >
      <OKBox
        class="icon"
        :OK="obj.OK"
        v-show="!ishovered"
      />
      <KillButton
        class="icon"
        @kill-bar="killSelf"
        v-show="ishovered"
      />
      <div @click="changeState" class="barName" :class="{deleteText: obj.OK}">
        {{ obj.title }}
      </div>
        
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
      changeState () {
        this.$emit('change-state', this.index)
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
    padding: 0.3em;
    justify-content: center;
    align-items: center;
  }

  .icon {
    flex: none;
    margin-left: 0.5em;
    width: 1em;
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
