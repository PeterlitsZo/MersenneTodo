<template>
  <div>
    <!-- Main bar -->
    <div
      class="bar"
      :class="{OK: OK}"
      @mouseover="ishovered=true"
      @mouseout="ishovered=false"
    >
      <Toolkit
        class="toolkit"
        :ishovered="ishovered"
        :index="index"
      />
      <div
        @click="changeState"
        class="barName"
        :class="{deleteText: OK, left: !havechildren}"
      >
        <span v-html="mdedTitle" />
        <small class="time">{{ obj.time.toLocaleTimeString() }}</small>
      </div>
    </div>

    <!-- Subbar -->
    <div v-if="!folding">
      <Bar
        class="subBar"
        v-for="(bar, i) in obj.child"
        :obj="bar"
        :index="[...index, i]"
        :key="i"
      />
    </div>
  </div>
</template>

<script>
  import Toolkit from './Bar/Toolkit.vue'

  import MarkdownIt from 'markdown-it'
  import highlight from 'highlight.js'
  var md = new MarkdownIt({
    highlight: (str, lang) => {
      if (lang && highlight.getLanguage(lang)) {
        try {
          return highlight.highlight(lang, str).value
        } catch (__) {
          // ...
        }
      }
      return ''
    }
  })
  
  export default {
    name: 'Bar',
    props: {
      obj: Object,
      index: Array
    },
    data () {
      return {
        ishovered: false
      }
    },
    methods: {
      changeState () {
        if (!this.$store.getters['todolist/havechildren'](this.index)) {
          this.$store.commit('todolist/changeState', {index: this.index})
        }
      }
    },
    computed: {
      mdedTitle () {
        return md.renderInline(this.obj.title)
      },
      folding () {
        return this.$store.getters['todolist/folding'](this.index)
      },
      OK () {
        return this.$store.getters['todolist/OK'](this.index)
      },
      havechildren () {
        return this.$store.getters['todolist/havechildren'](this.index)
      }
    },
    components: {
      Toolkit
    }
  }
</script>

<style lang="scss">
  .bar {
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
        &[class~="left"] {
          background: #f2f2f2;
        }
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

  /* Subbar */
  .subBar {
    margin-left: 2em;
    position: relative;

    &::before {
      position: absolute;
      background-color: #f2f2f2;
      content: '';
      height: 1px;
      top: 0;
      left: 0;
      right: 0;
      opacity: 1;
      pointer-events: none;
    }
  }
</style>
