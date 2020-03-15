import h from 'hyperscript'
import o from 'observable'
import { ENTER_KEY } from './utils'

const {
    transform
} = o

const useState = o

export const todoItem = (item) => {

    const { todo, completed, editing, dispatch } = item

    const [value, setValue] = useState(todo)

    return h('li',
        h('div.view',
            h('input.toggle',
                {
                    type: 'checkebox',
                    checked: completed,
                    onclick: () => { console.log('toggle') }
                }
            ),
            h('label', {
                ondblclick: () => { console.log('dbl click') },
                value
            }, todo),
            h('button.destroy',
                {
                    onclick: () => { console.log('destroy') }
                }
            )
        ),
        h('input.edit',
            {
                value: value,
                onkeyup: () => { console.log('on key up') },
                autofocus: true
            }
        )
    )
}