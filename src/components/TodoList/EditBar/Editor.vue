<template>
  <div class="editor" ref="editor"></div>
</template>

<script>
  import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

  export default {
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
      this.editor = monaco.editor.create(this.$refs.editor, {
        value: this.code,
        language: 'markdown',
        folding: true,
        foldingStrategy: 'indentation',
        automaticLayout: true,
        overviewRulerBorder: false,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false
        }
      })
      // Set the command for edit to enter the message
      this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        this.$emit('enter', this.editor.getValue())
        this.editor.setValue('')
      })
    },
    beforeDestroy () {
      this.editor && this.editor.dispose()
    },
    watch: {
      initData () {
        if (this.initData !== this.code) {
          this.editor.setValue(this.initData)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor {
    box-sizing: border-box;
    width: 100%;
    height: 5em;
  }
</style>
