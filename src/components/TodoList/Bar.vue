<template>
  <div>
    <!-- Main bar -->
    <div
      class="bar"
      :class="{OK: OK}"
      @mouseover="setHover"
      @mouseout="setUnHover"
    >
      <div class="toolkit-swaper">
        <Toolkit
          class="toolkit"
          :ishovered="ishovered"
          :index="index"
        />
      </div>
      <div
        @click="changeState"
        class="barName"
        :class="{deleteText: OK, left: !havechildren}"
      >
        <span v-html="mdedTitle" />
        <small class="time">{{ obj.time.toLocaleDateString() }}</small>
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

<script lang="ts">
  import Vue from 'vue'

  import Toolkit from './Bar/Toolkit.vue'

  import MarkdownIt from 'markdown-it'
  import highlight from 'highlight.js'

  var md = new MarkdownIt({
    highlight: (str: string, lang: string) => {
      if (lang && highlight.getLanguage(lang)) {
        try {
          return highlight.highlight(lang, str).value
        } catch (__) {
          // do nothing
        }
      }
      return ''
    }
  })
  
  export default Vue.extend({
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
        if (!this.$store.getters['todolist/havechildren']((this as any).index)) {
          this.$store.commit('todolist/changeState', {index: (this as any).index})
        }
      },

      setHover () {
        (this as any).ishovered=true;

        var unHover = (event: any) => {
          var element = event.target;
          if (this.$el !== element && !this.$el.contains(element)) {
            (this as any).ishovered = false;
          }
          document.removeEventListener('mousemove', unHover, true);
        };
        document.addEventListener('mousemove', unHover, true);
      },
      setUnHover () {
        (this as any).ishovered=false;
      }
    },
    computed: {
      mdedTitle () {
        return md.renderInline(this.obj.title)
      },
      folding () {
        var folding: boolean = this.$store.getters['todolist/folding'](this.index);
        return folding;
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
  })
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
        color: #206080;
      }
    }
    &:not([class~="OK"]) {
      &:not(:hover) {
        color: black;
      }
      &:hover {
        color: #4f8fa4;
      }
    }

    /* Toolkit at the heading of the bar */
    .toolkit-swaper {
      height: 100%;
      position: relative;
      width: 2em;

      .toolkit {
        height: 100%;
        background: white;
        position: absolute;
        left: 0;

        &:hover {
          border: 1px solid #f2f2f2;
          box-shadow: 0 0 5px #aaaaaa;
          z-index: 10;
        }
      }
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
