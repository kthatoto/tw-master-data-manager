import { onMounted, ref, reactive } from '@vue/composition-api'

export default () => {
  const padding = 50
  const container = ref<any>(undefined)
  const canvas = ref<any>(undefined)
  const context = ref<any>(undefined)

  const state = reactive<{
    width: number
    height: number
    dx: number
    dy: number
  }>({
    width: 0,
    height: 0,
    dx: 0,
    dy: 0
  })

  const makeCanvasFullScreen = () => {
    container.value = document.getElementById('container')
    state.width = container.value.clientWidth
    state.height = container.value.clientHeight
    canvas.value.width = container.value.clientWidth + padding * 2
    canvas.value.height = container.value.clientHeight + padding * 2
  }
  window.addEventListener('resize', () => {
    makeCanvasFullScreen()
    draw()
  })

  const draw = () => {
    const { dx, dy } = state
    const ctx: any = context.value
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, 2000, 2000)
    ctx.fillStyle = '#333'
    ctx.fillRect(350 - dx, 350 - dy, 300, 300)

    // ruler
    const rulerSize = 30
    ctx.fillStyle = '#555'
    ctx.fillRect(padding, padding + rulerSize, rulerSize, state.height - rulerSize)
    ctx.fillRect(padding + rulerSize, padding, state.width - rulerSize, rulerSize)

    const origin = { x: dx + padding, y: dy + padding }
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
    makeCanvasFullScreen()

    const scrollContainer: any = document.getElementById('container')
    const repositionCanvas = () => {
      state.dx = scrollContainer.scrollLeft - padding
      state.dy = scrollContainer.scrollTop - padding
      canvas.value.style.transform = `translate(${state.dx}px, ${state.dy}px)`
      draw()
    }
    repositionCanvas()
    scrollContainer.addEventListener('scroll', repositionCanvas)
  })
}
