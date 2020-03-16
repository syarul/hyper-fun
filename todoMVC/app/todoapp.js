import h from 'hyperscript'
import o from 'observable'

import { todoReducer, initialTodo } from './reducers/todoReducer'
import { filterReducer, initialFilter } from './reducers/filterReducer'
import { header } from './header'
import { todo } from './todo'
import { todoFooter } from './todoFooter'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETE } from './utils'

// enable use hook with observable
o.useHook(true)

const {
    transform,
    input
} = o

// for the sake of clarity purpose and
// modernizing observable interface.
// useReducer/useState refer to observable
// and function the same way. When added
// second argument, it will assume the 1st
// value as the reducer aggregator, while the
// the 2nd as the initial value for the reducer
const useReducer = o
const useState   = o

export const app = () => {

    const [state, dispatch] = useReducer(todoReducer, initialTodo)

    const [filter, dispatchFilter] = useReducer(filterReducer, initialFilter)

    const [showFilter, setShowFilter] = useState(SHOW_ALL)

    filter(filter => {
        const { name = SHOW_ALL } = filter.find(({ selected }) => selected) || {}
        setShowFilter(name) 
    })

    // when accessing an observable value pass closing bracket '()'
    // but this does not apply in hyperscript, since hyperscript will
    // resolve the observable directly or using binding, transform, 
    // compute etc++
    const [todos, setTodos] = useState(state().todos)
    
    const toggleAll = h('input.toggle-all#toggle-all',
        {
            type: 'checkbox',
            onclick: () => dispatch({ action: 'completeAll' })
        }
    )
    
    // bind the toggle all to a handler observable
    const handler = input(toggleAll, 'checked', 'change')

    // assigning function to an observable. This
    // pretty much how useEffect/useLayoutEffect
    // behave instead it attach directly to the
    // observable, and guess what it's anagram for
    // observable all along ironically
    state(state => {
        setTodos(state.todos)
        // if all todos is checked, toggle it
        handler(state.isChecked)
    })

    const useTodos = (name, todos) =>
        todos.filter(t => {
            if (name === SHOW_ACTIVE) {
                return !t.completed
            } else if (name === SHOW_COMPLETE) {
                return t.completed
            } else {
                return t
            }
        })

    return h('section.todoapp',
        header({ dispatch }),
        transform(todos, todos => todos.length ? h('section.main',
            toggleAll,
            h('label ', { 
                attrs: { for: 'toggle-all' } 
            }, 'Mark all as complete'),
            transform(showFilter, show => todo({ todos: useTodos(show, todos), dispatch }))
        ): null),
        transform(state, ({ todos, count, plural, clearToggle }) => todoFooter({
            show: todos.length,
            count,
            plural,
            clearToggle,
            showFilter,
            filter,
            dispatchFilter,
            clearCompleted: () => dispatch({ action: 'clearComplete' })
        }))
    )
}