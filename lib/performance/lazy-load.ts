// Lazy loading utilities for images and components

export interface LazyLoadOptions {
  threshold?: number
  rootMargin?: string
  onLoad?: () => void
  onError?: (error: Error) => void
}

export class LazyLoader {
  private observer: IntersectionObserver | null = null
  private loadedElements = new Set<Element>()

  constructor(options?: LazyLoadOptions) {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.loadedElements.has(entry.target)) {
              this.loadElement(entry.target as HTMLElement, options)
              this.loadedElements.add(entry.target)
            }
          })
        },
        {
          threshold: options?.threshold || 0.1,
          rootMargin: options?.rootMargin || "50px",
        },
      )
    }
  }

  observe(element: HTMLElement) {
    if (this.observer) {
      this.observer.observe(element)
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadElement(element)
    }
  }

  unobserve(element: HTMLElement) {
    if (this.observer) {
      this.observer.unobserve(element)
    }
  }

  private loadElement(element: HTMLElement, options?: LazyLoadOptions) {
    if (element.tagName === "IMG") {
      const img = element as HTMLImageElement
      const src = img.dataset.src

      if (src) {
        img.src = src
        img.onload = () => {
          img.classList.add("loaded")
          options?.onLoad?.()
          console.log("[v0] Image lazy loaded:", src)
        }
        img.onerror = () => {
          const error = new Error(`Failed to load image: ${src}`)
          options?.onError?.(error)
          console.error("[v0] Image load error:", error)
        }
      }
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect()
    }
    this.loadedElements.clear()
  }
}

// React hook for lazy loading
export function useLazyLoad(options?: LazyLoadOptions) {
  const loader = new LazyLoader(options)

  return {
    observe: (element: HTMLElement | null) => {
      if (element) loader.observe(element)
    },
    unobserve: (element: HTMLElement | null) => {
      if (element) loader.unobserve(element)
    },
    disconnect: () => loader.disconnect(),
  }
}
