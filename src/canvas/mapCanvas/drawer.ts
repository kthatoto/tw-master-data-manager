import { PADDING, CanvasState } from './index'

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

  fillRect (x: number, y: number, width: number, height: number) {
    this.ctx.fillRect(PADDING + x, PADDING + y, width, height)
  }
}
