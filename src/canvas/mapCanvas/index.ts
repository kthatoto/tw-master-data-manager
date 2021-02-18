import { onMounted, ref, reactive } from '@vue/composition-api'

import Drawer from './drawer'
import drawRuler from './components/ruler'

export const PADDING = 50
export interface CanvasState {
  width: number
  height: number
  dx: number
  dy: number
}

export default () => {
  const container = ref<any>(undefined)
  const canvas = ref<any>(undefined)
  const context = ref<any>(undefined)

  const state = reactive<CanvasState>({ width: 0, height: 0, dx: 0, dy: 0 })

  const d = new Drawer()
  const draw = () => {
    const { dx, dy } = state
    const ctx: any = context.value
    d.clearScreen()
    d.setState(state)

    // ruler
    const rulerSize = 30
    drawRuler(d, rulerSize)

    const origin = { x: dx + PADDING, y: dy + PADDING }
    const rulerOrigin = { x: origin.x + rulerSize, y: origin.y + rulerSize }
    const tileSize = 30
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = rulerOrigin.x; x < rulerOrigin.x + state.width - rulerSize; x++) {
      if (x % tileSize !== 0) continue
      ctx.moveTo(x - dx, rulerOrigin.y - dy)
      ctx.lineTo(x - dx, origin.y - dy)
      ctx.strokeStyle = '#fff'
      ctx.stroke()

      ctx.moveTo(x - dx, rulerOrigin.y - dy)
      ctx.lineTo(x - dx, rulerOrigin.y - dy + state.height - rulerSize)
      ctx.strokeStyle = '#333'
      ctx.stroke()
    }
    for (let y = rulerOrigin.y; y < rulerOrigin.y + state.height - rulerSize; y++) {
      if (y % tileSize !== 0) continue
      ctx.moveTo(rulerOrigin.x - dx, y - dy)
      ctx.lineTo(origin.x - dx, y - dy)
      ctx.strokeStyle = '#fff'
      ctx.stroke()

      ctx.moveTo(rulerOrigin.x - dx, y - dy)
      ctx.lineTo(rulerOrigin.x - dx + state.width - rulerSize, y - dy)
      ctx.strokeStyle = '#333'
      ctx.stroke()
    }
  }

  onMounted(() => {
    canvas.value = document.getElementById('mapCanvas')
    context.value = canvas.value.getContext('2d')
    d.setContext(context.value)
    makeCanvasFullScreen()

    const scrollContainer: any = document.getElementById('container')
    const repositionCanvas = () => {
      state.dx = scrollContainer.scrollLeft - PADDING
      state.dy = scrollContainer.scrollTop - PADDING
      canvas.value.style.transform = `translate(${state.dx}px, ${state.dy}px)`
      draw()
    }
    repositionCanvas()
    scrollContainer.addEventListener('scroll', repositionCanvas)
  })

  const makeCanvasFullScreen = () => {
    container.value = document.getElementById('container')
    state.width = container.value.clientWidth
    state.height = container.value.clientHeight
    canvas.value.width = container.value.clientWidth + PADDING * 2
    canvas.value.height = container.value.clientHeight + PADDING * 2
  }
  window.addEventListener('resize', () => {
    makeCanvasFullScreen()
    draw()
  })
}
