import Drawer from '../drawer'

export default (d: Drawer, rulerSize: number, tileSize: number) => {
  d.ctx.fillStyle = '#555'
  d.fillRect({ x: 0, y: rulerSize }, rulerSize, d.state.height - rulerSize)
  d.fillRect({ x: rulerSize, y: 0 }, d.state.width - rulerSize, rulerSize)

  const dx = d.state.dx
  const dy = d.state.dy

  for (let x = dx + rulerSize; x < dx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    d.line(
      '#fff',
      { x: x - dx, y: 0 },
      { x: x - dx, y: rulerSize }
    )
  }
  for (let y = dy + rulerSize; y < dy + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    d.line(
      '#fff',
      { x: 0, y: y - dy },
      { x: rulerSize, y: y - dy }
    )
  }

  d.ctx.fillStyle = 'white'
  d.ctx.textAlign = 'center'
  d.ctx.textBaseline = 'middle'
  for (let x = dx + rulerSize; x < dx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    const n: number = x / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, { x: x - dx + (tileSize / 2), y: rulerSize / 2 })
    }
  }
  for (let y = dy + rulerSize; y < dy + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    const n: number = y / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, { x: rulerSize / 2, y: y - dy + (tileSize / 2) })
    }
  }
}
