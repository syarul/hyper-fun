import h from 'hyperscript'
import o from 'observable'
import { ENTER_KEY, ESC_KEY } from './utils'

const {
    input
} = o

export const todoItem = item => {

    const { todo, completed, editing, dispatch } = item

    const onkeyup = e => {
        if (e.keyCode === ENTER_KEY) {
            dispatch({
                action: 'edit',
                todo: {
                    ...item,
                    todo: e.target.value.trim(),
                    editing: false
                }
            })
        } else if (e.keyCode === ESC_KEY) {
            dispatch({
                action: 'edit',
                todo: {
                    ...item,
                    editing: false
                }
            })
        }
    }

    const toggle = () =>
        dispatch({
            action: 'edit',
            todo: {
                ...item,
                completed: !completed
            }
        })

    const activeClass = () => {
        let cl = []
        if (completed) cl = cl.concat('completed')
        if (editing) cl = cl.concat('editing')
        return cl.join(' ')
    }

    const editTodo = () =>
        dispatch({
            action: 'edit',
            todo: {
                ...item,
                editing: true
            }
        })

    const destroy = () =>
        dispatch({ action: 'remove', todo: item })

    return h('li',
        {
            className: activeClass()
        },
        h('div.view',
            h('input.toggle',
                {
                    type: 'checkbox',
                    checked: completed ? true : false,
                    onclick: toggle
                }
            ),
            h('label', {
                ondblclick: editTodo,
                todo
            }, todo),
            h('button.destroy',
                {
                    onclick: destroy
                }
            )
        ),
        h('input.edit',
            {
                value: todo,
                onkeyup: onkeyup,
                autofocus: true
            }
        )
    )
}