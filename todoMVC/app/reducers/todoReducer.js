import { store, uuid } from '../utils'

const DATA_STORE = 'DATA_STORE'
// we can disable using localStorage at anytime
const useStore = false

const processOutput = state => {
  const { todos } = state
  useStore && store(DATA_STORE, todos)
  const uncompleted = todos.filter(c => !c.completed)
  const completed = todos.filter(c => c.completed)
  return {
    todos,
    clearToggle: !!completed.length,
    plural: uncompleted.length === 1 ? '' : 's',
    count: uncompleted.length,
    isChecked: !uncompleted.length
  }
}

export const initialTodo = processOutput({
  todos: (useStore && store(DATA_STORE)) || [ /*{
    id: "9ngehrp",
    todo: "awdx",
    completed: false,
    editing: false
  }*/]
})

export const todoReducer = (state, { action, todo }) => {
  switch (action) {
    case 'add':
    {
      const newTodo = {
        id: uuid(),
        todo,
        completed: false,
        editing: false
      }
      const todos = [...state.todos, newTodo]
      return processOutput({
        ...state,
        todos
      })
    }
    case 'edit':
    {
      const idx = state.todos.findIndex(t => t.id === todo.id)
      const todos = Object.assign([], state.todos)
      todos.splice(idx, 1, todo)
      return processOutput({
        ...state,
        todos
      })
    }
    case 'remove':
    {
      const idx = state.todos.findIndex(t => t.id === todo.id)
      const todos = Object.assign([], state.todos)
      todos.splice(idx, 1)
      return processOutput({
        ...state,
        todos
      })
    }
    case 'clearComplete':
    {
      const todos = state.todos.filter(t => !t.completed)
      return processOutput({
        ...state,
        todos
      })
    }
    case 'completeAll':
    {
      const todos = state.todos.map(t => ({ ...t, completed: !state.isChecked }))
      return processOutput({
        ...state,
        todos
      })
    }
    default:
      return processOutput(state)
  }
}
