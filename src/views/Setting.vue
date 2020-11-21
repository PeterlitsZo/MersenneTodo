<template>
  <div class="info-page">
    <Title class="title">Mersenne Todo Setting Page</Title>
    <div class="info">
      <div class="list">
        <div class="Bar">
          file path:
          <div id="datafile-path">
            {{ $store.state.todolist.filePath }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Title from '../components/Comman/Title.vue'

  import { shell } from 'electron'

  export default {
    name: 'Info',
    mounted () {
      document.getElementById('datafile-path').addEventListener('click', () => {
        shell.showItemInFolder(this.$store.state.todolist.filePath)
      })
    },
    components : {
      Title,
    }
  }
</script>

<style lang="scss">
  .info-page {
    display: flex;
    height: 100%;
    flex-flow: column;

    .title {
      flex: none;
      font-size: 2em;
    }

    .info {
      flex: auto;
      padding: 20px;
      
      .list {
        padding: 20px;
        flex-grow: 1;
        overflow: auto;
        font-size: 1.5em;

        .Bar {
          position: relative;

          + .Bar::before {
            background-color: #f2f2f2;
            position: absolute;
            content: '';
            height: 1px;
            top: 0;
            left: 0;
            right: 0;
            opacity: 1;
            pointer-events: none;
          }

          #datafile-path {
            &:hover {
              background: #f2f2f2;
            }
          }
        }
      }
    }
  }
</style>
