import h from 'hyperscript'
import o from 'observable'
import { ENTER_KEY } from './utils'
import {todoItem } from './todoItem'

const {
    transform
} = o

let initial = true

export const filter = ({ filter, dispatchFilter }) => {

    const updateUrl = e => {
        dispatchFilter(e.target.hash)
    }

    if(initial) {
        initial = false
        if (!filter.find(({ href }) => href === window.location.hash)) {
            window.history.pushState({}, null, '#/all')
        }
    }

    return h('ul.filters', 
        Array.from(filter, ({ name, href, selected }) => {
            return h('li',
                {
                    id: name,
                    onclick: updateUrl
                },
                h('a', {
                    className: selected ? 'selected' : '',
                    href
                }, name)
            )
        })
    )
}