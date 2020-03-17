import h from 'hyperscript'
import patch from './morph'
import { app } from './app/todoapp'

const root = document.getElementById('app')



// currently just rerender everything which is not efficient
// should go thorough diffing/patching on subsequent update
const [node, run] = app()
console.log(node.cloneNode(true))
let cycle = run
let init = false
cycle(v => {
    console.log('cycle') 
    if(init){
        h.cleanup()
        const [node, run] = app()
        cycle = run
        patch(root, node)
    }
    init = true
})
patch(root, node)