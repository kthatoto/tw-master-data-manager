import { onMounted, ref, reactive } from '@vue/composition-api'

import Drawer from './drawer'
import drawRuler from './components/ruler'
import drawGrid from './components/grid'

export const largeBoxSize = 2000
export const PADDING = 50
const moveEdgeRatio = 0.05
const tileSize = 30
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
  const scrollContainer = ref<any>(undefined)

  const state = reactive<CanvasState>({ width: 0, height: 0, rx: 0, ry: 0, vx: 0, vy: 0 })

  const d = new Drawer()
  const draw = () => {
    d.clearScreen()
    d.setState(state)
    d.setRulerSize(30)

    drawGrid(d, tileSize)
    drawRuler(d, tileSize)
  }

  onMounted(() => {
    canvas.value = document.getElementById('mapCanvas')
    context.value = canvas.value.getContext('2d')
    d.setContext(context.value)
    makeCanvasFullScreen()

    scrollContainer.value = document.getElementById('container')
    repositionCanvas()
    scrollContainer.value.scrollTo((largeBoxSize - state.width) / 2, (largeBoxSize - state.height) / 2)
    scrollContainer.value.addEventListener('scroll', repositionCanvas)
    setTimeout(() => {
      state.vx = 0
      state.vy = 0
      repositionCanvas()
    }, 10)
  })

  const repositionCanvas = () => {
    const nextRx = scrollContainer.value.scrollLeft - PADDING
    const nextRy = scrollContainer.value.scrollTop - PADDING
    state.vx += (nextRx - state.rx) / tileSize
    state.vy -= (nextRy - state.ry) / tileSize
    const scrollPosition = {
      left: nextRx + PADDING,
      right: nextRx + state.width + PADDING,
      top: nextRy + PADDING,
      bottom: nextRy + state.height + PADDING
    }
    const scrollCenterPosition = {
      x: (largeBoxSize - state.width) / 2,
      y: (largeBoxSize - state.height) / 2
    }
    if (scrollPosition.left <= largeBoxSize * moveEdgeRatio || largeBoxSize * (1 - moveEdgeRatio) <= scrollPosition.right) {
      state.rx = Math.floor(scrollCenterPosition.x)
      state.ry = nextRy
      scrollContainer.value.scrollTo(scrollCenterPosition.x + PADDING, nextRy + PADDING)
    } else if (scrollPosition.top <= largeBoxSize * moveEdgeRatio || largeBoxSize * (1 - moveEdgeRatio) <= scrollPosition.bottom) {
      state.rx = nextRx
      state.ry = Math.floor(scrollCenterPosition.y)
      scrollContainer.value.scrollTo(nextRx + PADDING, scrollCenterPosition.y + PADDING)
    } else {
      state.rx = nextRx
      state.ry = nextRy
    }
    canvas.value.style.transform = `translate(${state.rx}px, ${state.ry}px)`
    draw()
  }

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

  const canvasStoreInterface = {
    jumpPosition: async (x: number, y: number) => {
      scrollContainer.value.scrollTo((largeBoxSize - state.width) / 2, (largeBoxSize - state.height) / 2)
      setTimeout(() => {
        state.vx = x
        state.vy = y
        draw()
      }, 20)
    }
  }

  return { state, canvasStoreInterface }
}
