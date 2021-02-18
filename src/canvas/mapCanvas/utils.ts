import { PADDING } from './index'

export default class Drawer {
  get getContext () {
    this.ctx
  }
  setContext (ctx: any) {
    this.ctx = ctx
  }

  clearScreen () {
    this.ctx.fillStyle = '#fff'
    this.ctx.fillRect(0, 0, 3000, 3000)
  }

  fillRect (x: number, y: number, width: number, height: number) {
    this.ctx.fillRect(PADDING + x, PADDING + y, width, height)
  }
}
