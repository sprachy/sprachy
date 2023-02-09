
/**
 * A convenience wrapper for Vue's reactive() which behaves similarly
 * to Mobx's useLocalObservable.
 *
 * - Makes all getters into computed values
 * - Binds "this" for all non-getter functions
 */
export function useLocalReactive<T extends object>(obj: T) {
  const reactiveObj = reactive(obj)

  // Make all getters into computed values
  // See https://stackoverflow.com/questions/75357694/are-vue-3-reactive-object-getters-made-into-computed-values/75358517
  // eslint-disable-next-line guard-for-in
  for (const key in reactiveObj) {
    const desc = Object.getOwnPropertyDescriptor(reactiveObj, key)
    if (desc && desc.get) {
      Object.defineProperty(obj, key, {
        value: computed(desc.get.bind(reactiveObj))
      })
    }
  }

  // Bind "this" for all non-getter functions
  // eslint-disable-next-line guard-for-in
  for (const key in reactiveObj) {
    const desc = Object.getOwnPropertyDescriptor(reactiveObj, key)
    if (desc && !desc.get && typeof desc.value === 'function') {
      Object.defineProperty(obj, key, {
        value: desc.value.bind(reactiveObj)
      })
    }
  }

  return reactiveObj
}
