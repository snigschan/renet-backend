// Performance monitoring and metrics

export interface PerformanceMetric {
  name: string
  value: number
  unit: string
  timestamp: Date
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private marks = new Map<string, number>()

  // Mark the start of a performance measurement
  mark(name: string) {
    this.marks.set(name, performance.now())
    console.log(`[v0] Performance mark: ${name}`)
  }

  // Measure the time between two marks
  measure(name: string, startMark: string, endMark?: string): number {
    const startTime = this.marks.get(startMark)
    const endTime = endMark ? this.marks.get(endMark) : performance.now()

    if (!startTime) {
      console.warn(`[v0] Start mark not found: ${startMark}`)
      return 0
    }

    const duration = (endTime || performance.now()) - startTime

    this.metrics.push({
      name,
      value: duration,
      unit: "ms",
      timestamp: new Date(),
    })

    console.log(`[v0] Performance measure: ${name} = ${duration.toFixed(2)}ms`)
    return duration
  }

  // Get Core Web Vitals
  getCoreWebVitals(): {
    LCP?: number // Largest Contentful Paint
    FID?: number // First Input Delay
    CLS?: number // Cumulative Layout Shift
  } {
    const vitals: any = {}

    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          vitals.LCP = lastEntry.renderTime || lastEntry.loadTime
        })
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })
      } catch (e) {
        console.warn("[v0] LCP observation not supported")
      }

      // FID
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            vitals.FID = entry.processingStart - entry.startTime
          })
        })
        fidObserver.observe({ entryTypes: ["first-input"] })
      } catch (e) {
        console.warn("[v0] FID observation not supported")
      }

      // CLS
      try {
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          vitals.CLS = clsValue
        })
        clsObserver.observe({ entryTypes: ["layout-shift"] })
      } catch (e) {
        console.warn("[v0] CLS observation not supported")
      }
    }

    return vitals
  }

  // Get all metrics
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  // Clear all metrics
  clear() {
    this.metrics = []
    this.marks.clear()
    console.log("[v0] Performance metrics cleared")
  }

  // Log performance summary
  logSummary() {
    console.group("[v0] Performance Summary")
    this.metrics.forEach((metric) => {
      console.log(`${metric.name}: ${metric.value.toFixed(2)}${metric.unit}`)
    })
    console.groupEnd()
  }
}

// Singleton instance
let monitorInstance: PerformanceMonitor | null = null

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!monitorInstance) {
    monitorInstance = new PerformanceMonitor()
  }
  return monitorInstance
}
