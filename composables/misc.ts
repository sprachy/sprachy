import { isString } from "lodash-es"
import { useSlots } from 'vue'


const getSlotChildrenText = children => children.map(node => {
  if (!node.children || typeof node.children === 'string') return node.children || ''
  else if (Array.isArray(node.children)) return getSlotChildrenText(node.children)
  else if (node.children.default) return getSlotChildrenText(node.children.default())
}).join('')


export function useSlotText() {
  // Hacky! https://stackoverflow.com/a/71112772/16811479
  let slots: any = useSlots()

  return getSlotChildrenText(slots.default())

  // while (slots?.default) {
  //   const child = slots.default()[0]?.children
  //   console.log(child)
  //   if (isString(child)) {
  //     return child
  //   } else {
  //     slots = child
  //   }
  // }
}