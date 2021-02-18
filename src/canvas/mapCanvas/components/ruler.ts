import Drawer from '../drawer'

export default (d: Drawer, rulerSize: number, tileSize: number) => {
  d.ctx.fillStyle = '#555'
  d.fillRect({ x: 0, y: rulerSize }, rulerSize, d.state.height - rulerSize)
  d.fillRect({ x: rulerSize, y: 0 }, d.state.width - rulerSize, rulerSize)

  const rx = d.state.rx
  const ry = d.state.ry

  for (let x = rx + rulerSize; x < rx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    d.line(
      '#fff',
      { x: x - rx, y: 0 },
      { x: x - rx, y: rulerSize }
    )
  }
  for (let y = ry + rulerSize; y < ry + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    d.line(
      '#fff',
      { x: 0, y: y - ry },
      { x: rulerSize, y: y - ry }
    )
  }

  d.ctx.fillStyle = 'white'
  d.ctx.textAlign = 'center'
  d.ctx.textBaseline = 'middle'
  for (let x = rx + rulerSize; x < rx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    const n: number = x / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, { x: x - rx + (tileSize / 2), y: rulerSize / 2 })
    }
  }
  for (let y = ry + rulerSize; y < ry + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    const n: number = y / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, { x: rulerSize / 2, y: y - ry + (tileSize / 2) })
    }
  }
}
