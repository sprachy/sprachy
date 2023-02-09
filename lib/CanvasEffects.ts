import _ from 'lodash'
import { Confetti } from './Confetti'

export class CanvasEffects {
  canvas: HTMLCanvasElement
  confetti: Confetti

  constructor() {
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

    this.confetti = new Confetti(this.canvas)
  }

  private resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
}