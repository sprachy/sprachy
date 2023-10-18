import type { Confetti } from '~/lib/Confetti'

export class CanvasEffects {
  canvas?: HTMLCanvasElement
  _confetti?: Confetti

  async initialize() {
    const { Confetti } = await import('../lib/Confetti')
    this.canvas = document.createElement('canvas')
    this.canvas.id = "effectCanvas"
    document.body.appendChild(this.canvas)
    window.addEventListener("resize", this.resize.bind(this))
    this.resize()

    this.canvas.style.position = "fixed"
    this.canvas.style.left = "0px"
    this.canvas.style.top = "0px"
    this.canvas.style.width = "100vw"
    this.canvas.style.height = "100vh"
    this.canvas.style.pointerEvents = "none"
    this.canvas.style.zIndex = "1"

    this._confetti = new Confetti(this.canvas)
  }

  get confetti() {
    if (!this._confetti) {
      throw new Error("CanvasEffects not initialized")
    }
    return this._confetti
  }

  private resize() {
    this.canvas!.width = window.innerWidth
    this.canvas!.height = window.innerHeight
  }
}

export const effects = new CanvasEffects()