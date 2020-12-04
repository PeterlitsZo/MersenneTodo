<template>
  <div class="editor" ref="editor"></div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'CodeEditor',
    props: {
      initData: String
    },
    data () {
      return {
        editor: null,
        code: this.initData
      }
    },
    model: {
      event: 'change'
    },
    mounted () {
      var editor: HTMLDivElement = this.$refs.editor as HTMLDivElement;
      editor.appendChild(this.$store.state.todolist.editor.container)
    }
  })
</script>

<style lang="scss" scoped>
  .editor {
    box-sizing: border-box;
    width: 100%;
    height: 5em;
  }
</style>
