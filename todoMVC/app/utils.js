/* global localStorage */
export const store = (namespace, data) => {
  if (data) {
    return localStorage.setItem(namespace, JSON.stringify(data))
  }
  let store = localStorage.getItem(namespace)
  return (store && JSON.parse(store)) || []
}

export const uuid = () => Math.round(Math.random() * 1e12).toString(32)

export const camelCase = s => s.charAt(0).toUpperCase() + s.slice(1)

export const ENTER_KEY = 13
export const SHOW_ALL = 'All'
export const SHOW_ACTIVE = 'Active'
export const SHOW_COMPLETE = 'Completed'
