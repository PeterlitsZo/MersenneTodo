<template>
  <div>
    <input
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
</style>
