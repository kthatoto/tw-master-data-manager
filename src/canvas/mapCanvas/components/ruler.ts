import Drawer from '../drawer'

export default (d: Drawer, tileSize: number) => {
  const rulerSize = d.rulerSize
  d.ctx.fillStyle = '#555'
  d.fillRect({ x: 0, y: rulerSize }, rulerSize, d.state.height - rulerSize)
  d.fillRect({ x: rulerSize, y: 0 }, d.state.width - rulerSize, rulerSize)
  d.ctx.fillStyle = 'white'
  d.fillRect({ x: 0, y: 0 }, rulerSize, rulerSize)

  const vx = d.state.vx
  const vy = d.state.vy

  for (let x = vx - d.halfVw - tileSize; x <= vx + d.halfVw + tileSize; x++) {
    if (x % tileSize !== 0) continue
    d.line(
      '#fff',
      { x: x - vx + (d.vw / 2) + (tileSize / 2) + rulerSize, y: 0 },
      { x: x - vx + (d.vw / 2) + (tileSize / 2) + rulerSize, y: rulerSize }
    )
  }
  for (let y = vy - d.halfVh - tileSize; y < vy + d.halfVh + tileSize; y++) {
    if (y % tileSize !== 0) continue
    d.line(
      '#fff',
      { y: y - vy + (d.vh / 2) + (tileSize / 2) + rulerSize, x: 0 },
      { y: y - vy + (d.vh / 2) + (tileSize / 2) + rulerSize, x: rulerSize }
    )
  }

  d.ctx.fillStyle = 'white'
  d.ctx.textAlign = 'center'
  d.ctx.textBaseline = 'middle'
  for (let x = vx - d.halfVw - tileSize; x < vx + d.halfVw + tileSize; x++) {
    if (x % tileSize !== 0) continue
    const n: number = x / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, {
        x: x - vx + (d.vw / 2) + tileSize,
        y: rulerSize / 2
      })
    }
  }
  for (let y = vy - d.halfVh - tileSize; y < vy + d.halfVh + tileSize; y++) {
    if (y % tileSize !== 0) continue
    const n: number = y / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, {
        x: rulerSize / 2,
        y: y - vy + (d.vh / 2) + tileSize
      })
    }
  }
}
