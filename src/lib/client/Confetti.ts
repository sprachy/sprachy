import { cubicOut } from 'svelte/easing'
import _ from 'lodash'

const confettiColors = [
  '#FFFF04',
  '#EA4C89',
  '#892AB8',
  '#4AF2FD'
]

class Particle {
  vx = (Math.random() - 0.5) * 30
  vy = -Math.random() * 30
  r = Math.random() * 3 + 3
  lifetime = Math.random() * 500 + 300
  birth = Date.now()
  color = confettiColors[Math.floor(Math.random() * confettiColors.length)]!
  constructor(public x: number, public y: number) { }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vx *= 0.9
    this.vy *= 0.9
    this.vy += 0.5
  }
}

export class Confetti {
  ctx: CanvasRenderingContext2D
  running: boolean = false
  particles: Particle[] = []

  constructor(readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
  }

  private loop() {
    const { canvas, ctx, particles } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles) {
      p.update()
      ctx.beginPath()
      ctx.fillStyle = p.color
      const t = _.clamp((Date.now() - p.birth) / p.lifetime, 0, 1)
      ctx.globalAlpha = 1 - cubicOut(t)
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    this.particles = particles.filter((p) => Date.now() - p.birth <= p.lifetime)

    if (this.particles.length) requestAnimationFrame(() => this.loop())
    else {
      this.running = false
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  spawnAt(element: HTMLElement) {
    const box = element.getBoundingClientRect()
    for (let i = 0; i < 50; i++) {
      this.particles.push(
        new Particle(box.left + box.width / 2, box.top + box.height / 2)
      )
    }
    if (!this.running) {
      this.running = true
      this.loop()
    }
  }
}