import h from 'hyperscript'
import o from 'observable'
import patch from '../todoMVC/morph'

// o.useHook(true)

const { transform, signal } = o

const root = document.getElementById('app')

const useState = o

// const [state, setState] = useState([0, 1, 2, 3, 5])

let state = useState([0, 1, 2, 3, 5])

let m

const renderState = state => {
    return state.map((s, i) => h(`li#${i}`, s))
}

state(state => {
    if(!m) return
    const newNode = renderState(state)
    const f = document.createDocumentFragment()
    if(Array.isArray(newNode)) {
        Array.from(newNode, n => f.appendChild(n))
    } else {
        f.appendChild(newNode)
    }
    patch(m, f)
})

const app = h('div',
    h('button', {
        onclick: e => {
            let cur = state()
            cur.pop()
            if(cur.length === 0){
                cur = [0, 1, 2, 3, 5]
            }
            state(cur)
        }
    }, 'pop'),
    m = h('ul', 
        renderState(state())
    )
)

patch(root, app)