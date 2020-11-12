# mersennetodo

> A MersenneTodo that handle the todo list

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

## TODO

- [ ] Root
  - [ ] TodoList
    - [ ] Feat: make the bars have the state in TodoList.
    - [ ] Fear: Can make the todolist be stored as a `.json` file.
    - [ ] Stl : Make the TodoList/AddButton looks better.
      - [x] Stl: Make the TodoList/AddButton bigger
      - [ ] ...
    - [ ] Stl : Make the TodoList/EditBar looks better.
      - [x] Stl: Make the TodoList/EditBar widen.
      - [ ] ...
    - [ ] Fear: Better Bar
      - [ ] has a button to kill self.
        - [x] make the icon firstly
        - [x] make TodoList/Bar/KillButton be a component
        - [ ] emit event to Bar.
        - [ ] Bar need to deal with the event.
      - [ ] has a checkedbox to gray self.
        - [x] make the icon firstly
        - [x] make TodoList/Bar/OKBox be a component
        - [x] make it can change its icon by its state
        - [x] emit event to Bar.
        - [ ] Bar need to deal with the event.
    - [x] Fear: Add TodoList/Bar's add button.
    - [x] Fear: Add TodoList/EidtBar.
    - [x] Fix : TodoList/EidtBar need to enempty its message after enter.
    - [x] Fear: TodoList/EidtBar need to cannel if it meet a empty input.
  - [ ] DayChart

---

This project was generated with
[electron-vue](https://github.com/SimulatedGREG/electron-vue)
@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634)
using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the
original structure can be found
[here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

