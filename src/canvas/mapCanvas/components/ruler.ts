import Drawer from '../drawer'

export default (d: Drawer, tileSize: number) => {
  const rulerSize = d.rulerSize
  d.ctx.fillStyle = '#555'
  d.fillRect({ x: 0, y: rulerSize }, rulerSize, d.state.height - rulerSize)
  d.fillRect({ x: rulerSize, y: 0 }, d.state.width - rulerSize, rulerSize)
  d.ctx.fillStyle = 'white'
  d.fillRect({ x: 0, y: 0 }, rulerSize, rulerSize)

  const vx = Math.round(d.state.vx * 30)
  const vy = Math.round(-d.state.vy * 30)

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
  d.line('red', { x: rulerSize, y: rulerSize }, { x: d.state.width, y: d.state.height })
  d.line('red', { x: rulerSize, y: d.state.height }, { x: d.state.width, y: rulerSize })
  d.line('red', { x: (d.state.width + rulerSize) / 2, y: rulerSize }, { x: (d.state.width + rulerSize) / 2, y: d.state.height })
  d.line('red', { x: rulerSize, y: (d.state.height + rulerSize) / 2 }, { x: d.state.width, y: (d.state.height + rulerSize) / 2 })

  d.ctx.fillStyle = 'white'
  d.ctx.textAlign = 'center'
  d.ctx.textBaseline = 'middle'
  for (let x = vx - d.halfVw - tileSize; x < vx + d.halfVw + tileSize; x++) {
    if (x % tileSize !== 0) continue
    const n: number = x / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, {
        x: x - vx + (d.vw / 2) + rulerSize,
        y: rulerSize / 2
      })
    }
  }
  for (let y = vy - d.halfVh - tileSize; y < vy + d.halfVh + tileSize; y++) {
    if (y % tileSize !== 0) continue
    const n: number = -y / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, {
        x: rulerSize / 2,
        y: y - vy + (d.vh / 2) + rulerSize
      })
    }
  }
}
