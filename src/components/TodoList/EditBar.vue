<template>
  <div class="editor">
    <div class="Text"><span v-html="$store.state.todolist.editor.text"></span></div>
    <CodeEditor class="EditBarInput" @enter="submit" :initData="''" />
  </div>
</template>

<script>
  import CodeEditor from './EditBar/Editor.vue'

  export default {
    name: 'EditBar',
    methods: {
      submit (message) {
        this.$store.commit('todolist/submit', { message })
      }
    },
    components: {
      'CodeEditor': CodeEditor
    }
  }
</script>

<style lang="scss">
  .Text {
    font-size: 1em;
    padding: 0.3em;
    background: #f2f2f2;
  }

  .EditBarInput {
    border: #f2f2f2 solid 1px;
    width: 100%;
  }
</style>
