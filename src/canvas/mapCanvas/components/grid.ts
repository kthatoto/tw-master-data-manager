import Drawer from '../drawer'

export default (d: Drawer, tileSize: number) => {
  const rulerSize = d.rulerSize
  const vx = d.state.vx
  const vy = d.state.vy

  for (let x = vx + rulerSize; x < vx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    d.line(
      '#333',
      { x: x - vx, y: rulerSize },
      { x: x - vx, y: d.state.height }
    )
  }
  for (let y = vy + rulerSize; y < vy + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    d.line(
      '#333',
      { x: rulerSize, y: y - vy },
      { x: d.state.width, y: y - vy }
    )
  }
}
