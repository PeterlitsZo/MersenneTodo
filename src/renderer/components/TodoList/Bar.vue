<template>
  <div>
    <div class="bar">
      <!--<OKBox />-->
      <div style="flex: none; margin-right: 0.5em">
        <v-icon name="regular/circle" />
      </div>
      <div class="barName">{{ obj.title }}</div>
      <!--<KillButton />-->
      <div style="flex: none">
        <v-icon name="times-circle" />
      </div>
    </div>
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
  .bar {
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .barName {
    flex: auto;
  }
</style>
