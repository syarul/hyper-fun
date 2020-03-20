import { app, state, filter } from './app/todoapp'
import { render } from '../render'

// render will do the efficient diffing 
// between virtual node and the real DOM
render(
    document.getElementById('app'), // mount node
    [state, filter],                // observable(s) to listen, pass as array if more than one
    app                             // the target function hook
)