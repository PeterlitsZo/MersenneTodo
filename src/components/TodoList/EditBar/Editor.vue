<template>
  <div class="editor" ref="editor"></div>
</template>

<script>
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
      this.$refs.editor.appendChild(this.$store.state.todolist.editor.container)
      // this.editor = monaco.editor.create(this.$refs.editor, {
      //   value: this.code,
      //   language: 'markdown',
      //   folding: true,
      //   foldingStrategy: 'indentation',
      //   automaticLayout: true,
      //   overviewRulerBorder: false,
      //   scrollBeyondLastLine: false,
      //   minimap: {
      //     enabled: false
      //   }
      // })
      // // Set the command for edit to enter the message
      // this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      //   console.log('enter ctrl enter')
      //   this.$store.commit('todolist/submit', { message: this.editor.getValue() })
      //   this.editor.setValue('')
      // })
      // // Set the command for enter the message for root
      // this.editor.addCommand(monaco.KeyCode.Escape, () => {
      //   console.log('enter esc')
      //   this.$store.commit('todolist/addBar', { index: undefined })
      // })
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
