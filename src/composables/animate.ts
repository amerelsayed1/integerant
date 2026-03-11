import { type Directive } from 'vue'

export const vAnimate: Directive<HTMLElement, string | undefined> = {
  mounted(el, binding) {
    const animClass = binding.arg === 'scale' ? 'fade-in-scale' : 'fade-in-up'

    for (const mod of Object.keys(binding.modifiers)) {
      if (mod.startsWith('delay-')) {
        const ms = mod.replace('delay-', '')
        el.style.transitionDelay = `${ms}ms`
      }
    }

    if (binding.modifiers.stagger) {
      const children = Array.from(el.children) as HTMLElement[]
      children.forEach((child, i) => {
        child.classList.add(animClass)
        child.style.transitionDelay = `${i * 80}ms`
      })

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            children.forEach((child) => child.classList.add('is-visible'))
            observer.disconnect()
          }
        },
        { rootMargin: '-60px', threshold: 0.1 }
      )
      observer.observe(el)
    } else {
      el.classList.add(animClass)

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.disconnect()
          }
        },
        { rootMargin: '-80px', threshold: 0.1 }
      )
      observer.observe(el)
    }
  },
}
