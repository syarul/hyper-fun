import morphdom from 'morphdom'
import h from 'hyperscript'
// console.log(h.eventStore)
const nodeMap = h.eventStore

const traversal = node => {
  let checkNode
  while (node) {
    checkNode = node
    node = node.nextSibling
    if (checkNode.nodeType === 1) {
      if (nodeMap.has(checkNode)) {
        nodeMap.delete(checkNode)
      }
      traversal(checkNode.firstChild)
    }
  }
}

const morph = (node, update) => {
  morphdom(node, update, {
    onNodeAdded: el => {
      // if (el.nodeType === 1 && nodeMap.has(el)) {
      //   nodeMap.set(el, nodeMap.get(el))
      // }
    },
    onBeforeElUpdated: (fromEl, toEl) => {
      // sane way to handle event listeners
      // if (nodeMap.has(toEl)) {
      //   const n = nodeMap.get(toEl)
      //   const o = nodeMap.get(fromEl)
      //   if (o) {
      //     for (const i in o) {
      //       fromEl.removeEventListener(i, o[i])
      //     }
      //   }
      //   for (const i in n) {
      //     fromEl.addEventListener(i, n[i])
      //   }
      //   nodeMap.set(fromEl, n)
      //   nodeMap.delete(toEl)
      // }
      // if (fromEl.nodeName === 'INPUT' && fromEl.hasAttribute('autofocus')) {
      //   fromEl.focus()
      // }
      // spec - https://dom.spec.whatwg.org/#concept-node-equals
      if (fromEl.isEqualNode(toEl)) {
        return false
      }
      return true
    },
    onBeforeNodeDiscarded: node => {
      traversal(node)
    },
    childrenOnly: true
  })
}

export default morph
