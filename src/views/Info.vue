<template>
  <div>
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
  </div>
</template>

<script>
  import Title from '../components/Comman/Title.vue'

  import { shell } from 'electron'

  export default {
    name: 'Info',
    mounted () {
      document.getElementById('issue-path').addEventListener('click', () => {
        shell.openExternal('https://github.com/PeterlitsZo/MersenneTodo/issues')
      })
    },
    components : {
      Title
    }
  }
</script>

<style>
  .title {
    font-size: 2em;
  }

  .info {
    padding: 20px;
  }

  a {
    color: #3d7e9a;
    cursor: pointer;
  }
</style>
