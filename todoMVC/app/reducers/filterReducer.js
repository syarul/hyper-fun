import { camelCase } from '../utils'

export const initialFilter = Array.from(['all', 'active', 'completed'], page => {
  const [selected] = window.location.hash.match(/([^#/])(.*)/) || ['all']
  return {
    href: `#/${page}`,
    name: camelCase(page),
    selected: selected === page
  }
})

export const filterReducer = (state, href) => {
  return Array.from(state, filter =>
    filter.href === href ? ({ ...filter, selected: true }) : ({ ...filter, selected: false })
  )
}
