<template>
  <div>
    <h2>{{ obj.title }}</h2>
  </div>
</template>

<script>
  export default {
    name: 'Bar',
    props: {
      obj: Object
    }
  }
</script>

<style>
</style>
