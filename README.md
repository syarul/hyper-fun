# hyper-fun
fun way to build app with hyperscript and observable

## What's this
This repo will add more sample applications which is build using hyperscript and observable

> observable is using my fork version which has slightly non-breaking updated features

## Observable

has a new option setting called ```useHook```

```js
import o from 'obsevable';

o.useHook(true)

const useState = o

// now observable has array like interface when declared
const [state, setState] = useState('foo')

// to make the observable behave like useReducer pass
// a second argument as initial value
const useReducer = o

const [state, dispatch] = useReducer(reducer, initialValue)

```
has a new interface called ```fun```. This basically an accessor for cleaner codes i.e
which has advantage when you want want to loop/compute observable value directly.
```js
// original inteface
onclick: e => {
    setState(state() + 1)
}
// instead with accessor
onclick: fun(s =>
   setState(s + 1)
, state)

```

