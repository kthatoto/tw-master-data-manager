import { onMounted, ref, reactive } from '@vue/composition-api'

import Drawer from './drawer'
import drawRuler from './components/ruler'
import drawGrid from './components/grid'

export const largeBoxSize = 10000
export const PADDING = 50
export interface CanvasState {
  width: number
  height: number
  rx: number // real-x
  ry: number // real-y
  vx: number // virtual-x
  vy: number // virtual-y
}

export default () => {
  const container = ref<any>(undefined)
  const canvas = ref<any>(undefined)
  const context = ref<any>(undefined)

  const state = reactive<CanvasState>({ width: 0, height: 0, rx: 0, ry: 0, vx: 0, vy: 0 })

  const d = new Drawer()
  const draw = () => {
    d.clearScreen()
    d.setState(state)

    const rulerSize = 30
    const tileSize = 30
    drawRuler(d, rulerSize, tileSize)
    drawGrid(d, rulerSize, tileSize)
  }

  onMounted(() => {
    canvas.value = document.getElementById('mapCanvas')
    context.value = canvas.value.getContext('2d')
    d.setContext(context.value)
    makeCanvasFullScreen()

    const scrollContainer: any = document.getElementById('container')
    const repositionCanvas = () => {
      state.rx = scrollContainer.scrollLeft - PADDING
      state.ry = scrollContainer.scrollTop - PADDING
      canvas.value.style.transform = `translate(${state.rx}px, ${state.ry}px)`
      draw()
    }
    repositionCanvas()
    scrollContainer.scrollTo(largeBoxSize / 2, largeBoxSize / 2)
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
