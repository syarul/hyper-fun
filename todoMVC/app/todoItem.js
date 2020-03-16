import h from 'hyperscript'
import o from 'observable'
import { ENTER_KEY, ESC_KEY } from './utils'

const useState = o

export const todoItem = item => {

    const { todo, completed, editing, dispatch } = item

    const [value, setValue] = useState(todo)

    const onkeyup = e => {
        setValue(e.target.value.trim())
        if (e.keyCode === ENTER_KEY) {
            dispatch({
                action: 'edit',
                todo: {
                    ...item,
                    todo: value(),
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

    const toggle = () => {
        dispatch({
            action: 'edit',
            todo: {
                ...item,
                completed: !completed
            }
        })
    }

    const activeClass = () => {
        let cl = []
        if (completed) cl = cl.concat('completed')
        if (editing) cl = cl.concat('editing')
        return cl.join(' ')
    }

    const editTodo = () => {
        dispatch({
            action: 'edit',
            todo: {
                ...item,
                editing: true
            }
        })
    }

    const destroy = () => {
        dispatch({ action: 'remove', todo: item })
    }

    const [isEditing] = useState(editing)

    let edit

    // need to wait for sometime
    isEditing(e => {
        e && setTimeout(() =>{
            edit.focus()
        })
    })

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
                value
            }, todo),
            h('button.destroy',
                {
                    onclick: destroy
                }
            )
        ),
        edit = h('input.edit',
            {
                value: value,
                onkeyup: onkeyup
            }
        )
    )
}