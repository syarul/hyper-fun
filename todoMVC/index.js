import h from 'hyperscript'
import patch from './morph'
import { app, lifecycle } from './app/todoapp'

const root = document.getElementById('app')

const [f] = lifecycle
console.log(f)

// f(() => {
//     console.log(3) 
// })

// const [frag, lifecycle] = app()

// export const lifecycle = () => {
//     console.log(1)
//     console.log(app().cloneNode(true))
//     patch(root, app())
// }

f(() => {
    console.log(1)
    console.log(app().cloneNode(true))
    patch(root, app())
})

// const node = app()

// currently just rerender everything which is not efficient
// should go thorough diffing/patching on subsequent update
// root.appendChild(node)