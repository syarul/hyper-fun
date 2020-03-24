# hyper-fun
fun way to build app with hyperscript and observable

[![npm package](https://img.shields.io/badge/npm-0.0.2-blue.svg)](https://www.npmjs.com/package/hyper-fun) [![browser build](https://img.shields.io/badge/unpkg-0.0.2-ff69b4.svg)](https://unpkg.com/hyper-fun@0.0.2/hyper-fun.min.js)

[live todoMVC sample](https://syarul.github.io/hyper-fun)

## What's this
With [hyperscript](https://github.com/hyperhype/hyperscript) and [observable](https://github.com/dominictarr/observable) as core + render/diffing, we get a decent view layer for building web app. No compiler is needed. If you itch for using html templating instead of hyperscript you can substitute with [htm](https://github.com/developit/htm).

> observable is using my fork version which has non-breaking updated features that have slightly modern interface + hyperscript with event caching.

## Usage

has a new option setting called ```useHook```. This's just synthetic sugar of the observable

```js
import { o } from 'hyper-fun';

o.useHook(true)

const useState = o

// now observable has array like interface when declared
const [state, setState] = useState('foo')

// to make the observable behave like useReducer pass
// a second argument as initial value
const useReducer = o

const [state, dispatch] = useReducer(reducer, initialValue)

// to make it behave like an effect, call it with a function
// where it will pass the new value, whenever the value changes.
state(newState =>
    console.log('Was changed to', newState)
)

// to stop being notifed of these changes, call the function that was returned
const stop = state(newState =>
    console.log('Was changed to', newState)
)
// then some time later
stop()
```

A simple usage case

```js
import { render, h, o as useState } from 'hyper-fun'

const [state, setState] = useState([])

const app = state =>
    h('div',
        h('button', {
            onclick: () => {
                state.push(state.length)
                if (state.length > 10) {
                    state = []
                }
                setState(state)
            }
        }, 'pop'),
        state.length ? 
            h('ul',
                state.map((s, i) => 
                    h(`li#${i}`, s)
                )
            ) : null
    )

render(document.getElementById('app'), state, app)
```

## Samples


run ```npm run todo``` or ```npm run vdom``` to see working sample

### Extra
has a new interface called ```fun```. This basically an accessor for cleaner codes i.e
which has advantage when you want want to loop/compute observable value directly.
```js
import { o } from 'hyper-fun'

const { 
    fun 
} = o

// original inteface
onclick: e => {
    setState(state() + 1)
}
// instead with accessor
onclick: fun(s =>
   setState(s + 1)
, state)

```

