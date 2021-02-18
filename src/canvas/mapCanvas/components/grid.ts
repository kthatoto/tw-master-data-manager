import Drawer from '../drawer'

export default (d: Drawer, tileSize: number) => {
  const rulerSize = d.rulerSize
  const vx = d.state.vx
  const vy = d.state.vy

  for (let x = vx - d.halfVw - rulerSize; x < vx + d.halfVw; x++) {
    if (x % tileSize !== 0) continue
    d.line(
      '#333',
      { x: x - vx + (d.vw / 2) + (tileSize / 2) + rulerSize, y: rulerSize },
      { x: x - vx + (d.vw / 2) + (tileSize / 2) + rulerSize, y: d.state.height }
    )
  }
  for (let y = vy - d.halfVh - rulerSize; y < vy + d.halfVh; y++) {
    if (y % tileSize !== 0) continue
    d.line(
      '#333',
      { y: y - vy + (d.vh / 2) + (tileSize / 2) + rulerSize, x: rulerSize },
      { y: y - vy + (d.vh / 2) + (tileSize / 2) + rulerSize, x: d.state.width }
    )
  }
}
