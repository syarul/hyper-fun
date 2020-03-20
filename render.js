import patch from './patch'
import { compute } from 'observable'

const isNode = el =>
    el && el.nodeName && el.nodeType

export const render = (node, observable, caller) => {
    if(Array.isArray(observable)){
        compute(observable, (...args) =>
            internalRender.apply(null, args)
        )
    } else {
        observable(internalRender)
    }

    function internalRender(...observable) {
        const f = document.createDocumentFragment()
        const v = caller(...observable)
        if (Array.isArray(v)) {
            Array.from(v, v => f.appendChild(isNode(v) ? v : document.createTextNode(v)))
        } else {
            f.appendChild(isNode(v) ? v : document.createTextNode(v))
        }
        patch(node, f)
    }
    return node
}   