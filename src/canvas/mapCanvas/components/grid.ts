import Drawer from '../drawer'

export default (d: Drawer, rulerSize: number, tileSize: number) => {
  const rx = d.state.rx
  const ry = d.state.ry

  for (let x = rx + rulerSize; x < rx + d.state.width; x++) {
    if (x % tileSize !== 0) continue
    d.line(
      '#333',
      { x: x - rx, y: rulerSize },
      { x: x - rx, y: d.state.height }
    )
  }
  for (let y = ry + rulerSize; y < ry + d.state.height; y++) {
    if (y % tileSize !== 0) continue
    d.line(
      '#333',
      { x: rulerSize, y: y - ry },
      { x: d.state.width, y: y - ry }
    )
  }
}
