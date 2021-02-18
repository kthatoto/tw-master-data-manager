import { PADDING, CanvasState } from './index'

interface Vector {
  x: number
  y: number
}

export default class Drawer {
  constructor () {
    this.state = { width: 0, height: 0, rx: 0, ry: 0, vx: 0, vy: 0 }
    this.rulerSize = 30
  }

  ctx: any
  setContext (ctx: any) {
    this.ctx = ctx
  }

  state: CanvasState
  setState (state: CanvasState) {
    this.state = state
  }

  rulerSize: number
  setRulerSize (rulerSize: number) {
    this.rulerSize = rulerSize
  }

  get vw () {
    return this.state.width - this.rulerSize
  }

  get halfVw () {
    return Math.round(this.vw / 2)
  }

  get vh () {
    return this.state.height - this.rulerSize
  }

  get halfVh () {
    return Math.round(this.vh / 2)
  }

  clearScreen () {
    this.ctx.fillStyle = '#eee'
    this.ctx.fillRect(0, 0, 3000, 3000)
  }

  fillRect (position: Vector, width: number, height: number) {
    this.ctx.fillRect(PADDING + position.x, PADDING + position.y, width, height)
  }

  line (strokeStyle: string, start: Vector, end: Vector) {
    this.ctx.beginPath()
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = strokeStyle
    this.ctx.moveTo(PADDING + start.x, PADDING + start.y)
    this.ctx.lineTo(PADDING + end.x, PADDING + end.y)
    this.ctx.stroke()
    this.ctx.closePath()
  }

  fillText (text: string, position: Vector) {
    this.ctx.fillText(text, PADDING + position.x, PADDING + position.y)
  }
}
