import { isString } from "lodash-es"

export function useSlotText() {
  // Hacky! https://stackoverflow.com/a/71112772/16811479
  let slots: any = useSlots()

  console.log(slots.default()[0].children.default())

  while (slots?.default) {
    const child = slots.default()[0]?.children
    if (isString(child)) {
      return child
    } else {
      slots = child
    }
  }
}