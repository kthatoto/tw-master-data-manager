import Drawer from '../drawer'

export default (d: Drawer, rulerSize: number, tileSize: number) => {
  d.ctx.fillStyle = '#555'
  d.fillRect(0, rulerSize, rulerSize, d.state.height - rulerSize)
  d.fillRect(rulerSize, 0, d.state.width - rulerSize, rulerSize)

  const dx = d.state.dx
  const dy = d.state.dy

  for (let x = dx + rulerSize; x < dx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    d.line(
      '#fff',
      { x: x - dx, y: 0 },
      { x: x - dx, y: rulerSize }
    )

    d.line(
      '#333',
      { x: x - dx, y: rulerSize },
      { x: x - dx, y: d.state.height }
    )
  }
  for (let y = dy + rulerSize; y < dy + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    d.line(
      '#fff',
      { x: 0, y: y - dy },
      { x: rulerSize, y: y - dy }
    )

    d.line(
      '#333',
      { x: rulerSize, y: y - dy },
      { x: d.state.width, y: y - dy }
    )
  }
}
