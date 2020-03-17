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
    input,
    signal
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

    // signal observable does not get trigged
    // when new value is the same as old value
    const showFilter = signal(SHOW_ALL)

    // observe when filter change / todos change
    const [run, setRun] = useState()

    showFilter(v =>{
        setRun(true)
    })

    filter(filter => {
        const { name = SHOW_ALL } = filter.find(({ selected }) => selected) || {}
        showFilter(name) 
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
    
    // observe the length of todos
    const len = signal(state().todos.length > 0)

    let main, foo

    len(l => {
        console.log(`length has change ${l}`)
        l ? main = h('section.main',
            toggleAll,
            h('label ', {
                attrs: { for: 'toggle-all' }
            }, 'Mark all as complete'),
            // 'foo'
            // transform(run, () =>{
            //     let n = h('h4', 'foo')
            //     if(!n.isEqualNode(foo)){
            //         console.log('aw')
            //         foo = n 
            //     }
            //     return foo
            // })
            // transform(run, () =>
            //     todo({ todos: useTodos(showFilter(), todos()), dispatch })
            // )
        ) : null
    })

    // assigning function to an observable. This
    // pretty much how useEffect/useLayoutEffect
    // behave instead it attach directly to the
    // observable, and guess what it's anagram for
    // observable all along ironically
    state(state => {
        setTodos(state.todos)
        // if all todos is checked, toggle it
        handler(state.isChecked)

        len(state.todos.length > 0)

        setRun(true)
    })


    const frag = document.createDocumentFragment()

    const node = h('section.todoapp',
        header({ dispatch }),
        // main
        transform(len, len => {
            console.log('render main')
            return len ? h('section.main',
                toggleAll,
                h('label ', { 
                    attrs: { for: 'toggle-all' } 
                }, 'Mark all as complete'),
                transform(run, () =>
                    todo({ todos: useTodos(showFilter(), todos()), dispatch })
                )
            ): null
        }),

        // transform(state, ({ todos, count, plural, clearToggle }) => todoFooter({
        //     show: todos.length,
        //     count,
        //     plural,
        //     clearToggle,
        //     showFilter,
        //     filter,
        //     dispatchFilter,
        //     clearCompleted: () => dispatch({ action: 'clearComplete' })
        // }))
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

    // footer is static so don't bother diffing this
    frag.appendChild(node)
    frag.appendChild(footer)
    
    return [frag, run]
}