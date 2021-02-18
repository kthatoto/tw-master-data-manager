import { PADDING, CanvasState } from './index'

interface Vector {
  x: number
  y: number
}

export default class Drawer {
  ctx: any
  setContext (ctx: any) {
    this.ctx = ctx
  }

  state: CanvasState
  setState (state: CanvasState) {
    this.state = state
  }

  constructor () {
    this.state = { width: 0, height: 0, dx: 0, dy: 0 }
  }

  clearScreen () {
    this.ctx.fillStyle = '#fff'
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

  fillText () {
  }
}
