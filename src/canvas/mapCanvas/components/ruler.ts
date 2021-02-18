import Drawer from '../drawer'

export default (d: Drawer, rulerSize: number, tileSize: number) => {
  d.ctx.fillStyle = '#555'
  d.fillRect({ x: 0, y: rulerSize }, rulerSize, d.state.height - rulerSize)
  d.fillRect({ x: rulerSize, y: 0 }, d.state.width - rulerSize, rulerSize)

  const vx = d.state.vx
  const vy = d.state.vy

  for (let x = vx + rulerSize; x < vx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    d.line(
      '#fff',
      { x: x - vx, y: 0 },
      { x: x - vx, y: rulerSize }
    )
  }
  for (let y = vy + rulerSize; y < vy + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    d.line(
      '#fff',
      { x: 0, y: y - vy },
      { x: rulerSize, y: y - vy }
    )
  }

  d.ctx.fillStyle = 'white'
  d.ctx.textAlign = 'center'
  d.ctx.textBaseline = 'middle'
  for (let x = vx + rulerSize; x < vx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    const n: number = x / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, { x: x - vx + (tileSize / 2), y: rulerSize / 2 })
    }
  }
  for (let y = vy + rulerSize; y < vy + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    const n: number = y / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, { x: rulerSize / 2, y: y - vy + (tileSize / 2) })
    }
  }
}
