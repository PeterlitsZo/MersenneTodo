<template>
  <div>
    <input
      class="EditBarInput"
      v-model="message"
      @keyup.enter="submit"
      placeholder="New Todo... (Enter nothing to cannel)"
    />
  </div>
</template>

<script>
  export default {
    name: 'EditBar',
    data: () => {
      return {
        message: ''
      }
    },
    methods: {
      submit () {
        this.$emit('submit', this.message)
        this.message = ''
      }
    }
  }
</script>

<style>
  .EditBarInput {
    width: 100%;
  }
</style>
