import h from 'hyperscript'
import o from 'observable'
import { ENTER_KEY } from './utils'
import { filter as filterc } from './filter'

const {
    transform
} = o

export const todoFooter = ({ count, plural, clearToggle, filter, dispatchFilter, clearCompleted }) => {

    return h('footer.footer',
        h('span.todo-count',
            h('strong', count),
            ` item${plural} left`
        ),
        filterc({ filter, dispatchFilter }),
        clearToggle ? h('button.clear-completed',
           {
               onclick: clearCompleted,
           },
           'Clear Complete'
        ) : ''
    )
}