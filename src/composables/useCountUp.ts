import { ref, onMounted } from 'vue'

export function useCountUp(target: number, duration = 1800, startOnMount = true) {
  const value = ref(0)
  let started = false

  function start() {
    if (started) return
    started = true
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      value.value = Math.round(eased * target)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  if (startOnMount) onMounted(start)

  return { value, start }
}
