<template>
  <div @mouseenter="setClick" @mouseleave="unClick">
    <!-- State: Clicked -->
    <div v-if="clicked" key="toolkit" class="fullHeight">
      <State class="icon" :index="index"/>

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
      <div v-if="ishovered" class="icon">
        <Icon name="ellipsis-h"/>
      </div>
      <State class="icon" :index="index" v-else/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  import Icon from '../../Comman/Icon.vue'

  import State from './Toolkit/State.vue'

  export default Vue.extend({
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
        this.$store.commit('todolist/killBar', {index: (this as any).index})
      },
      addBar () {
        this.$store.commit('todolist/addBar', {index: (this as any).index})
      },

      unClick () {
        (this as any).clicked = false;
      },
      setClick () {
        (this as any).clicked = true;

        var closeForgotToolkit = (event: any) => {
          var element = event.target;
          if (this.$el !== element && !this.$el.contains(element)) {
            (this as any).clicked = false;
          }
          document.removeEventListener('mousemove', closeForgotToolkit, true);
        };
        document.addEventListener('mousemove', closeForgotToolkit, true);
      },
    },
    components: {
      Icon,
      State
    }
  })
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
