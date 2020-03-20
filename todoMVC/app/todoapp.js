import h from 'hyperscript'
import o from 'observable'
import { render } from '../../render'

import { todoReducer, initialTodo } from './reducers/todoReducer'
import { filterReducer, initialFilter } from './reducers/filterReducer'
import { header } from './header'
import { todo } from './todo'
import { todoFooter } from './todoFooter'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETE } from './utils'

// enable use hook with observable
o.useHook(true)

const {
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

// non-scope observable declaration
export const [state, dispatch] = useReducer(todoReducer, initialTodo)

// non-scope observable declaration
export const [filter, dispatchFilter] = useReducer(filterReducer, initialFilter)

let handler

state(state => 
    // if all todos is checked, toggle it
    handler && handler(state.isChecked)
)

export const app = (state, filter) => {

    const {
        todos,
        plural,
        count,
        isChecked,
        clearToggle,
    } = state

    const len = todos.length > 0

    const { name = SHOW_ALL } = filter.find(({ selected }) => selected) || {}

    const toggleAll = h('input.toggle-all#toggle-all',
        {
            type: 'checkbox',
            checked: isChecked,
            onclick: () => dispatch({ action: 'completeAll' })
        }
    )

    // bind the toggle all to a handler observable
    handler = input(toggleAll, 'checked', 'change')

    const useTodos = name =>
        todos.filter(t => {
            if (name === SHOW_ACTIVE) {
                return !t.completed
            } else if (name === SHOW_COMPLETE) {
                return t.completed
            } else {
                return t
            }   
        })

    const frag = document.createDocumentFragment()

    const node = h('section.todoapp',
        header({ dispatch }),
        len ? h('section.main',
                toggleAll,
                h('label ', { 
                    attrs: { for: 'toggle-all' } 
                }, 'Mark all as complete'),
            todo({ todos: useTodos(name), dispatch })
            ): null,
        len ? todoFooter({
            show: todos.length,
            count,
            plural,
            clearToggle,
            filter,
            dispatchFilter,
            clearCompleted: () => dispatch({ action: 'clearComplete' })
        }) : null
    )

    const footer = h('footer.info',
        h('p', 'Double-click to edit a todo'),
        h('p', 'Created by ',
            h('a', { href: 'https://github.com/syarul' }, 'Shahrul Nizam Selamat')
        ),
        h('p', 'Part of ',
            h('a', { href: 'http://todomvc.com' }, 'TodoMVC')
        )
    )

    frag.appendChild(node)
    frag.appendChild(footer)
    
    return frag
}