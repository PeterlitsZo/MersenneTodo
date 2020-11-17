# mersenne-todo

> A nice planner. Builded on `electron` and `vue`.

## run by bin file

Go to [here](https://github.com/PeterlitsZo/MersenneTodo/releases/tag/v0.0.2-alpha)
for download.

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
  - [ ] Nav
  - [ ] TodoList
    - [ ] Feat: history
    - [ ] Feat: Tool kits for Bars
    - [ ] Feat: Make it suppose the MarkDown highlight
    - [ ] Feat: Make it can deal with MarkDown
    - [ ] Feat: Todo as a tree
    - [x] Feat: make the Bar's OK area be bigger
    - [x] Fix : fix that it cannot build (bacause webpack, i guess).
    - [x] Feat: Use `yarn` but not `npm`
    - [x] Feat: Can make the todolist be stored as a `.json` file.
    - [x] Design it to make it looks really good.
    - [x] Add the time information
    - [x] Add hline bettwen two bars.
    - [x] ...
  - [ ] DayChart
  - [ ] Code Editor
  - [ ] Info
    - [ ] Info about github address, issue address

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
