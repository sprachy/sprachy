import { delay as _delay } from 'lodash-es'
import canAutoPlay from 'can-autoplay'

/** 
 * This is just a reimplementation of default template literals
 * Used to inform syntax highlighting of markdown
 */
export function md(strs: TemplateStringsArray, ...substs: any[]) {
  return substs.reduce(
    (prev, cur, i) => prev + cur + strs[i + 1],
    strs[0]
  )
}

export async function delay(amount: number) {
  return new Promise(resolve => {
    _delay(resolve, amount)
  })
}

/**
 * Returns true if user interaction has already bypassed the autoplay policy.
 * Otherwise, we probably need to have the user click a button before we
 * can play audio.
 */
export async function checkAudioPlayability(): Promise<boolean> {
  const { result } = await canAutoPlay.audio()
  return result
}

/** Prompt the user to choose a file for upload. */
export async function chooseFilePrompt(): Promise<File | undefined> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'

    input.onchange = () => {
      const file = (input.files as FileList)[0]
      resolve(file)
    }

    input.click()
  })
}