<template>
  <div>
    <div
      class="bar"
      :class="{OK: obj.OK}"
      @mouseover="ishovered=true"
      @mouseout="ishovered=false"
    >
      <Toolkit
        class="toolkit"
        :state="obj.OK ? 'OK' : 'not OK'"
        :ishovered="ishovered"
        :index="index"
      />
      <div @click="changeState" class="barName" :class="{deleteText: obj.OK}">
        {{ obj.title }} <small class="time">{{ obj.time.toLocaleTimeString() }}</small>
      </div>
    </div>
  </div>
</template>

<script>
  import Toolkit from './Bar/Toolkit.vue'
  
  export default {
    name: 'Bar',
    props: {
      obj: Object,
      index: Number
    },
    data () {
      return {
        ishovered: false
      }
    },
    methods: {
      changeState () {
        this.$store.commit('todolist/changeState', {index: this.index})
      }
    },
    components: {
      Toolkit
    }
  }
</script>

<style lang="scss">
  .bar {
    font-size: 1.5em;
    display: grid;
    grid-template-columns: auto 1fr;
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
    .toolkit {
      height: 100%;
    }

    /* BarName, the main part of the bar */
    .barName {
      padding: 0.3em;

      &:hover {
        background: #f2f2f2;
      }
      &.deleteText {
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
