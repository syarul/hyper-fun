import h from 'hyperscript'
import o from 'observable'
import { ENTER_KEY } from './utils'
import {todoItem } from './todoItem'

const {
    transform
} = o

export const todo = ({ todos, dispatch }) =>
    h('ul.todo-list', 
        todos.map(todo => todoItem({ ...todo, dispatch }))
    )