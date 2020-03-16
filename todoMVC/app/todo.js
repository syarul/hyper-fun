import h from 'hyperscript'
import {todoItem } from './todoItem'

export const todo = ({ todos, dispatch }) =>
    h('ul.todo-list', 
        todos.map(todo => todoItem({ ...todo, dispatch }))
    )