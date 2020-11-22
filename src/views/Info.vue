<template>
    <div class="info-page">
      <Title class="title">Mersenne Todo Infomation Page</Title>
      <div class="info">
        MersenneTodo is a open-source application build on Electron and Vue and so on.
        It is going to make the PLAN be easy with javascript.
        <ul>
          <li>
            Have a new issue or want to have a new feature?
            Go <a id="issue-path">here</a>
            to make a new issue. Or give me a PR for new feature or bug fixing.
          </li>
        </ul>
      </div>
      <EndTitle>
        <div class="logo">
          <p>Powered by</p><img src="../assets/mersenne-prime-foundry.svg" />
        </div>
      </EndTitle>
    </div>
</template>

<script>
  import Title from '../components/Comman/Title.vue'
  import EndTitle from '../components/Comman/EndTitle.vue'

  import { shell } from 'electron'

  export default {
    name: 'Info',
    mounted () {
      document.getElementById('issue-path').addEventListener('click', () => {
        shell.openExternal('https://github.com/PeterlitsZo/MersenneTodo/issues')
      })
    },
    components : {
      Title,
      EndTitle
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
      font-size: 1.3em;
      padding: 20px;

      a {
        color: #3d7e9a;
        cursor: pointer;
      }
    }

    .logo {
      display: flex;
      float: right;
      align-items: center;

      p {
        flex: none;
        margin: 1em;
      }
      img {
        height: 4em;
      }
    }
  }
</style>
