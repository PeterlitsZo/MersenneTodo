<template>
  <div>
    <!-- State: Clicked -->
    <div v-if="clicked" key="toolkit" class="fullHeight" v-click-outside="unClick">
      <div class="icon KillButton" @click="deleteBar">
        <Icon class="icon" name="trash" />
      </div>
      <div class="icon">
        <Icon name="plus" />
      </div>
    </div>

    <!-- State: Unclicked -->
    <div v-else key="toolkitinfo" class="fullHeight">
      <div v-if="ishovered" class="icon" @click="setClick">
        <Icon name="ellipsis-h"/>
      </div>
      <div v-else class="icon">
        <Icon v-if="state == 'OK'" name="check-circle" />
        <Icon v-else name="regular/circle" />
      </div>
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
      },
      unClick () {
        console.log('unClicking')
        this.clicked = false
      },
      setClick () {
        console.log('Clicking')
        this.clicked = true
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss">
  .fullHeight {
    height: 100%;
    display: flex;

    .icon {
      width: 2em;
      height: 100%;

      &:hover {
        background: #f2f2f2;

        &[class~=KillButton] {
          color: #f14668;
        }
      }
    }
  }

</style>
