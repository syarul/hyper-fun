import h from 'hyperscript'
import { ENTER_KEY } from './utils'

export const header = ({ dispatch }) => {

    const onkeyup = e => {
        const todo = e.target.value.trim()
        if (e.which === ENTER_KEY && todo.length) {
            dispatch({ action: 'add', todo })
            e.target.value = ''
        }
    }

    return h('header',
        h('h1', 'todos'),
        h('input.new-todo',
            {
                onkeyup: onkeyup,
                placeholder: 'What needs to be done?',
                autofocus: true
            }
        )
    )
}