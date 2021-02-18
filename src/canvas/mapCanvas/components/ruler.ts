import Drawer from '../drawer'

export default (d: Drawer, tileSize: number) => {
  const rulerSize = d.rulerSize
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

  d.line('red', { x: rulerSize, y: rulerSize }, { x: d.state.width, y: d.state.height })
  d.line('red', { x: rulerSize, y: d.state.height }, { x: d.state.width, y: rulerSize })
  d.line('red', { x: (d.state.width + rulerSize) / 2, y: rulerSize }, { x: (d.state.width + rulerSize) / 2, y: d.state.height })
  d.line('red', { x: rulerSize, y: (d.state.height + rulerSize) / 2 }, { x: d.state.width, y: (d.state.height + rulerSize) / 2 })

  d.ctx.fillStyle = 'white'
  d.ctx.textAlign = 'center'
  d.ctx.textBaseline = 'middle'
  for (let x = vx - parseInt(d.vw / 2); x < vx + parseInt(d.vw / 2); x++) {
    if (x % tileSize !== 0) continue
    const n: number = x / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, { x: x - vx + (d.vw / 2) + tileSize, y: rulerSize / 2 })
    }
  }
  for (let y = vy - parseInt(d.vh / 2); y < vy + parseInt(d.vh / 2); y++) {
    if (y % tileSize !== 0) continue
    const n: number = y / tileSize
    if (n % 5 === 0) {
      d.fillText(`${n}`, { x: rulerSize / 2, y: y - vy + (d.vh / 2) + tileSize })
    }
  }
}
