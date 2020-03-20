import h from 'hyperscript'
import o from 'observable'
import { render } from '../render'

const root = document.getElementById('app')

const useState = o

useState.useHook(true)

const [state, setState] = useState([])

const app = state => {

    return h('div',
        h('button', {
            onclick: () => {
                state.push(state.length)
                if (state.length > 10) {
                    state = []
                }
                setState(state)
            }
        }, 'pop'),
        state.length ? h('ul', state.map((s, i) => h(`li#${i}`, s))) : null
    )
}

const [input, setInput] = useState('')

const app2 = (state, input) => {
    return h('div',
        h('input', {
            value: input,
            onkeyup: e => {
                setInput(e.target.value)
                if(e.which === 13){
                    setState(state.concat({
                        id: Math.round(Math.random()*1e17).toString(32),
                        text: input
                    }))
                    setInput('')
                }
            }
        }),
        h('p', input),
        state.length ? h('ul', state.map(s => 
            h(`li#${s.id}`,
                s.text,
                h('button.destroy',
                    {
                        onclick: () => {
                            const idx = state.findIndex(c => c.id === s.id)
                            state.splice(idx, 1)
                            setState(state)
                        }
                    },
                'x')
            )
        )) : null
    )
}

// render(root, state, app)

render(root, [state, input], app2)