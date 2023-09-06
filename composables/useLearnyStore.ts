const learnyStore = defineState({
  learnedLemmas: new Set(),

  addLemma(lemma: string) {
    this.learnedLemmas.add(lemma)
  },

  knowsLemma(lemma: string) {
    return this.learnedLemmas.has(lemma)
  }

})


export function useLearnyStore() {
  return learnyStore
}