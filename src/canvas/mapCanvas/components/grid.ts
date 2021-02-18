import Drawer from '../drawer'

export default (d: Drawer, rulerSize: number, tileSize: number) => {
  const dx = d.state.dx
  const dy = d.state.dy

  for (let x = dx + rulerSize; x < dx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    d.line(
      '#333',
      { x: x - dx, y: rulerSize },
      { x: x - dx, y: d.state.height }
    )
  }
  for (let y = dy + rulerSize; y < dy + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    d.line(
      '#333',
      { x: rulerSize, y: y - dy },
      { x: d.state.width, y: y - dy }
    )
  }
}
