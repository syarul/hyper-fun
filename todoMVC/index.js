import h from 'hyperscript'
import { app } from './app/todoapp'

const root = document.getElementById('app')

// currently just rerender everything which is not efficient
// should go thorough diffing/patching on subsequent update
root.appendChild(app())

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
root.appendChild(footer)