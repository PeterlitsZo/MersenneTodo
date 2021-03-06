# mersenne-todo

> A nice planner. Builded on `electron` and `vue`.

## Screenshot

<p align="center"><img
  src="./screenshot/mersenne-todo.png"
  width="48%"
></div>

## Download

Go to [release page](https://github.com/PeterlitsZo/MersenneTodo/releases)
to download the lastest MersenneTodo.

## build/run by source

Before build/run it, you should download `yarn` and download this project's
dependency:

``` shell
sudo apt install yarn
yarn
```

### Builded for Windows and Linux

Run script in shell:

``` shell
yarn electron:allbuild
```

### Run in electron application

Run script in shell:

``` shell
yarn electron:serve
```

## Todo

This is a todo list for this project:

- [ ] Root
  - [ ] Rfcr
    - [ ] Rfcr: Split store/*/todolist
  - [ ] Comman
    - [x] Feat: icon component
    - [x] Feat: title component
  - [ ] TodoList
    - [ ] Feat: Add a process bar
    - [ ] Feat: Draggle
    - [ ] Feat: make the bar can be edited
    - [ ] Feat: Javascript support
    - [ ] Feat: update the default helpful msg
    - [ ] Feat: make the overflow bar like the Monaco editor bar
    - [ ] Feat: history
      - [ ] Feat: todolist/history component
      - [ ] Feat: settings.json
      - [ ] Feat: save as a object pool
    - [x] Feat: Better toolkit
      - [x] Feat: OK buttom
      - [ ] Feat: Draggle buttom
    - [x] Fix : Nav cannot highlight now
    - [x] Fix : Cannot edit
    - [x] Feat: make the toolkit auto pop
    - [x] Fix : folding, then updating
    - [x] Feat: fold the tree todo
    - [x] Feat: bar state: OK / not OK / list
    - [x] ...
  - [ ] DayChart
  - [ ] Code Editor
  - [ ] Others
    - [ ] Feat: Skeleton screen
    - [x] Feat: remove the title bars of the application
    - [x] Feat: add a icon of the application
    - [x] Fix : the setTimeout function in src/main.js
    - [x] Feat: Use Vuex
    - [x] Fix : flex looks bad.
    - [x] ...
  - [ ] Setting
    - [ ] Setting the path. (add a setting json file)
    - [x] Open file manager of the userdata json file
  - [x] Nav
  - [x] Info

