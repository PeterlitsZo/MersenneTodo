<template>
  <div>
    <div
      class="bar"
      :class="{OK: obj.OK}"
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
        {{ obj.title }} <small class="time">{{ obj.time.toLocaleTimeString() }}</small>
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
    methods: {
      changeState () {
        this.$emit('change-state', this.index)
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

<style lang="scss">
  .bar {
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;

    &[class~="OK"] {
      &:not(:hover) {
        color: #888888;
      }
      &:hover {
        color: #3d7e9a;
      }
    }
    &:not([class~="OK"]) {
      &:not(:hover) {
        color: black;
      }
      &:hover {
        color: #387994;
      }
    }

    /* Icon at the heading of the bar */
    .icon {
      flex: none;
      margin-left: 0.5em;
      width: 1em;
    }

    /* BarName, the main part of the bar */
    .barName {
      flex: auto;
      padding: 0.3em;
      margin-left: 0.5em;

      &:hover {
        background: #f2f2f2;
      }

      .deleteText {
        text-decoration: line-through;
      }
      .time {
        font-size: 0.6em;
        float: right;
        padding: 0.2em;
        background: #f2f2f2;
      }
    }
  }
</style>
