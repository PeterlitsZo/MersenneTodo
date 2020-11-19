<template>
  <div>
    <!-- State: Clicked -->
    <div v-if="clicked" class="icon KillButton" @click="deleteBar">
      <Icon name="trash" />
    </div>

    <!-- State: Unclicked -->
    <div v-else class="icon" @click="clicked=true">
      <template v-if="ishovered">
        <Icon name="ellipsis-h"/>
      </template>
      <template v-else>
        <Icon v-if="state == 'OK'" name="check-circle" />
        <Icon v-else name="regular/circle" />
      </template>
    </div>
  </div>
</template>

<script>
  import Icon from '../../Comman/Icon.vue'

  export default {
    name: 'toolkit',
    props: {
      state: {
        type: String,
        required: true
      },
      ishovered: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        clicked: false
      }
    },
    methods: {
      deleteBar () {
        console.log('Killing')
        this.$emit('kill-bar')
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss">
  .icon {
    width: 2em;
    height: 100%;

    &:hover {
      background: #f2f2f2;
    }
  }

  .KillButton {
    &:hover {
      color: #f14668;
    }
  }
</style>
