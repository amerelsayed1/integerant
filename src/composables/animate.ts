import { type Directive } from 'vue'

const observerMap = new WeakMap<HTMLElement, IntersectionObserver>()

function isAlreadyInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

export const vAnimate: Directive<HTMLElement, string | undefined> = {
  mounted(el, binding) {
    const animClass = binding.arg === 'scale' ? 'fade-in-scale' : 'fade-in-up'

    for (const mod of Object.keys(binding.modifiers)) {
      if (mod.startsWith('delay-')) {
        const ms = mod.replace('delay-', '')
        el.style.transitionDelay = `${ms}ms`
      }
    }

    if (typeof IntersectionObserver === 'undefined') {
      if (binding.modifiers.stagger) {
        const children = Array.from(el.children) as HTMLElement[]
        children.forEach((child) => {
          child.classList.add(animClass, 'is-visible')
        })
      } else {
        el.classList.add(animClass, 'is-visible')
      }
      return
    }

    if (binding.modifiers.stagger) {
      const children = Array.from(el.children) as HTMLElement[]
      children.forEach((child, i) => {
        child.classList.add(animClass)
        child.style.transitionDelay = `${i * 80}ms`
      })

      // If already in viewport at mount time, show immediately (no rootMargin penalty)
      if (isAlreadyInViewport(el)) {
        requestAnimationFrame(() => children.forEach((child) => child.classList.add('is-visible')))
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            children.forEach((child) => child.classList.add('is-visible'))
            observer.disconnect()
          }
        },
        { rootMargin: '-40px', threshold: 0.05 }
      )
      observer.observe(el)
      observerMap.set(el, observer)
    } else {
      el.classList.add(animClass)

      // If already in viewport at mount time, show immediately
      if (isAlreadyInViewport(el)) {
        requestAnimationFrame(() => el.classList.add('is-visible'))
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.disconnect()
          }
        },
        { rootMargin: '-40px', threshold: 0.05 }
      )
      observer.observe(el)
      observerMap.set(el, observer)
    }
  },
  unmounted(el) {
    observerMap.get(el)?.disconnect()
    observerMap.delete(el)
  },
}
