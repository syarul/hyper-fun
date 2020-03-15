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
    transform
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

    // when accessing an observable value pass closing bracket '()'
    // but this does not apply in hyperscript, since hyperscript will
    // resolve the observable directly or using binding, transform, 
    // compute etc++
    const [todos, setTodos] = useState(state().todos)

    // assigning function to an observable. This
    // pretty much how useEffect/useLayoutEffect
    // behave instead it attach directly to the
    // observable, and guess what it's anagram for
    // observable all along ironically
    state(({ todos }) => setTodos(todos))

    const useTodos = () => {

        const { name = SHOW_ALL } = filter().find(({ selected }) => selected) || {}

        const t = todos().filter(t => {
            if (name === SHOW_ACTIVE) {
                return !t.completed
            } else if (name === SHOW_COMPLETE) {
                return t.completed
            } else {
                return t
            }
        })

        return t
    }

    return h('section.todoapp',
        header({ dispatch }),
        h('section.main',
            h('input.toggle-all#toggle-all',
                {
                    type: 'checkbox',
                    checked: state().isChecked,
                    onclick: () => dispatch({ action: 'completeAll' })
                }
            ),
            h('label ', { 
                attrs: { for: 'toggle-all' } 
            }, 'Mark all as complete'),
            transform(todos, t => todo({ todos: useTodos(todos), dispatch }))
        ),
        transform(todos, t => t.length ? todoFooter({ 
            count: state().count,
            plural: state().plural,
            clearToggle: state().clearToggle,
            clearCompleted: () => dispatch({ action: 'clearComplete' }),
            filter,
            dispatchFilter
        }) : '')
    )
}