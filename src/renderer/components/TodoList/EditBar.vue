<template>
  <div>
    <input
      v-model="message"
      @keyup.enter="$emit('submit', message)"
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
    }
  }
</script>

<style>
</style>
