<template>
  <div class="editor">
    <div class="Text">Text TODO, enter <kbd>Ctrl+Enter</kbd> to submit:</div>
    <CodeEditor class="EditBarInput" @change="update" @enter="submit" :initData="''" />
  </div>
</template>

<script>
  import CodeEditor from './EditBar/Editor.vue'

  export default {
    name: 'EditBar',
    data: () => {
      return {
        message: ''
      }
    },
    methods: {
      submit () {
        if (this.message) {
          console.log('submit: ', this.message)
          this.$emit('submit', this.message)
          this.message = ''
        } else {
          this.$emit('dissubmit')
        }
      },
      update (message) {
        console.log('change: ', message)
        this.message = message
      }
    },
    components: {
      'CodeEditor': CodeEditor
    }
  }
</script>

<style>
  .Text {
    text-size: 1em;
  }

  .EditBarInput {
    border: #f2f2f2 solid 1px;
    width: 100%;
  }

  .editor::before {
    background-color: #f2f2f2;
    top: 0;
    content: '';
    height: 1px;
    left: 0;
    opacity: 1;
    pointer-events: none;
    position: absolute;
  }

</style>
