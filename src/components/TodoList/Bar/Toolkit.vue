<template>
  <div>
    <!-- State: Clicked -->
    <div v-if="clicked" key="toolkit" class="fullHeight" @mouseleave="unClick">
      <!-- Fold self -->
      <div v-if="havechildren" class="icon" @click="foldBar">
        <!-- folded -->
        <Icon v-if="folding" name="angle-right" />
        <!-- unfolded -->
        <Icon v-else name="angle-down" />
      </div>

      <!-- Add sub list -->
      <div class="icon" @click="addBar">
        <Icon name="plus" />
      </div>

      <!-- Kill Button-->
      <div class="icon KillButton" @click="deleteBar">
        <Icon class="icon" name="trash" />
      </div>
    </div>

    <!-- State: Unclicked -->
    <div v-else key="toolkitinfo" class="fullHeight">
      <div v-if="ishovered" class="icon" @mouseenter="setClick">
        <Icon name="ellipsis-h"/>
      </div>
      <div v-else class="icon">
        <Icon v-if="state == 'OK'" name="check-circle" />
        <Icon v-else-if="state == 'not OK'" name="regular/circle" />
        <Icon v-else-if="state == 'folding'" name="angle-right" />
        <Icon v-else name="angle-down" />
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '../../Comman/Icon.vue'

  export default {
    name: 'toolkit',
    props: {
      ishovered: {
        type: Boolean,
        required: true
      },
      index: {
        type: Array,
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
        console.log('delete bar: ', this.index)
        this.$store.commit('todolist/killBar', {index: this.index})
      },
      addBar () {
        console.log('add bar to: ', this.index)
        this.$store.commit('todolist/addBar', {index: this.index,})
      },
      foldBar () {
        this.$store.commit('todolist/foldBar', {index: this.index})
      },
      unClick () {
        this.clicked = false
      },
      setClick () {
        this.clicked = true
      },
    },
    computed: {
      state () {
        return this.$store.getters['todolist/state'](this.index)
      },
      folding () {
        return this.$store.getters['todolist/folding'](this.index)
      },
      havechildren () {
        return this.$store.getters['todolist/havechildren'](this.index)
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
