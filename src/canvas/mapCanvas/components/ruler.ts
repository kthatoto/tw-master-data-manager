import Drawer from '../drawer'

export default (d: Drawer, rulerSize: number) => {
  d.ctx.fillStyle = '#555'
  d.fillRect(0, rulerSize, rulerSize, d.state.height - rulerSize)
  d.fillRect(rulerSize, 0, d.state.width - rulerSize, rulerSize)
}
