export interface PieSlice {
  id: string
  name: string
  shortName?: string
  value: number
  percentage: number
  color: string
  icon: string
  startAngle: number
  endAngle: number
  midAngle: number
  pathData: string
  hasChildren: boolean
  originalNode: any
}

// Convert degrees/radians to coordinates
export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

// Generate SVG Path for a donut or pie slice
export function describeArc(
  x: number,
  y: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
): string {
  // Clamp full circle
  const isFullCircle = endAngle - startAngle >= 359.99
  const actualEndAngle = isFullCircle ? startAngle + 359.999 : endAngle

  const outerStart = polarToCartesian(x, y, outerRadius, actualEndAngle)
  const outerEnd = polarToCartesian(x, y, outerRadius, startAngle)
  const innerStart = polarToCartesian(x, y, innerRadius, startAngle)
  const innerEnd = polarToCartesian(x, y, innerRadius, actualEndAngle)

  const largeArcFlag = actualEndAngle - startAngle <= 180 ? "0" : "1"

  if (innerRadius === 0) {
    // Solid pie
    return [
      "M", x, y,
      "L", outerEnd.x, outerEnd.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 1, outerStart.x, outerStart.y,
      "Z"
    ].join(" ")
  }

  // Donut slice
  return [
    "M", outerEnd.x, outerEnd.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 1, outerStart.x, outerStart.y,
    "L", innerEnd.x, innerEnd.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 0, innerStart.x, innerStart.y,
    "Z"
  ].join(" ")
}

// Calculate slice geometries from an array of items
export function calculateSlices(
  items: Array<{ id: string; name: string; shortName?: string; valueUSD: number; color: string; icon: string; children?: any[] }>,
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number
): PieSlice[] {
  const total = items.reduce((acc, item) => acc + item.valueUSD, 0)
  if (total <= 0) return []

  let currentAngle = 0
  return items.map((item) => {
    const sliceAngle = (item.valueUSD / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle
    const midAngle = startAngle + sliceAngle / 2
    currentAngle = endAngle

    const percentage = (item.valueUSD / total) * 100
    const pathData = describeArc(cx, cy, outerRadius, innerRadius, startAngle, endAngle)

    return {
      id: item.id,
      name: item.name,
      shortName: item.shortName,
      value: item.valueUSD,
      percentage,
      color: item.color,
      icon: item.icon,
      startAngle,
      endAngle,
      midAngle,
      pathData,
      hasChildren: Boolean(item.children && item.children.length > 0),
      originalNode: item
    }
  })
}

// Format currency
export function formatValue(valueUSD: number, currency: "USD" | "CHF", rate: number = 0.88): string {
  const symbol = currency === "USD" ? "$" : "CHF "
  const finalVal = currency === "USD" ? valueUSD : valueUSD * rate

  if (finalVal >= 1) {
    return `${symbol}${finalVal.toFixed(1)}B`
  }
  const millions = finalVal * 1000
  if (millions >= 1) {
    return `${symbol}${millions.toFixed(0)}M`
  }
  const thousands = millions * 1000
  return `${symbol}${thousands.toFixed(0)}k`
}
