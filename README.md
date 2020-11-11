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
  - [ ] Add TodoList/EidtBar.
    > When the add button is pushed, this component need to show and wait for a input.
    > After input, the conntent need to add to the `bars'.
    - [x] Make the TodoList/EidtBar be a component.
    - [ ] Make it can deal with input and raise a event.
    - [ ] Let the TodoList accept the event.
  - [ ] Can make the todolist be stored as a `.json` file.
  - [ ] Make the TodoList/AddButton looks better.
  - [x] Add TodoList/Bar's add button.

---

This project was generated with
[electron-vue](https://github.com/SimulatedGREG/electron-vue)
@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634)
using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the
original structure can be found
[here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

