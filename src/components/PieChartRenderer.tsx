import React, { useState, useId } from 'react'
import type { PieSlice } from '../utils/pieMath'
import { calculateSlices, polarToCartesian, formatValue } from '../utils/pieMath'
import type { SectorNode } from '../data/swissEconomyData'
import { ChevronRight } from 'lucide-react'

interface PieChartRendererProps {
  currentNode: SectorNode
  items: SectorNode[]
  selectedId: string | null
  onSelectSlice: (node: SectorNode) => void
  onDrillDown: (node: SectorNode) => void
  currency: 'USD' | 'CHF'
  chartStyle: 'donut' | 'pie'
  totalGdpUSD: number
  size?: number
}

export const PieChartRenderer: React.FC<PieChartRendererProps> = ({
  currentNode,
  items,
  selectedId,
  onSelectSlice,
  onDrillDown,
  currency,
  chartStyle,
  totalGdpUSD,
  size = 460
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<PieSlice | null>(null)
  const chartId = useId()

  const cx = size / 2
  const cy = size / 2
  const outerRadius = size * 0.42
  const innerRadius = chartStyle === 'donut' ? size * 0.23 : 0

  const slices = calculateSlices(items, cx, cy, outerRadius, innerRadius)
  const totalValue = items.reduce((sum, item) => sum + item.valueUSD, 0)

  // Active slice for center display (hovered or selected or null)
  const activeSlice = hoveredSlice || slices.find((s) => s.id === selectedId) || null

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full">
      {/* SVG Pie Chart Graphic */}
      <div className="relative flex flex-col items-center select-none">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible drop-shadow-xl"
        >
          <defs>
            <filter id={`shadow-${chartId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.45" />
            </filter>
            {slices.map((slice) => (
              <linearGradient
                key={slice.id}
                id={`grad-${chartId}-${slice.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={slice.color} stopOpacity="1" />
                <stop offset="100%" stopColor={slice.color} stopOpacity="0.82" />
              </linearGradient>
            ))}
          </defs>

          {/* Slices */}
          <g>
            {slices.map((slice) => {
              const isHovered = hoveredSlice?.id === slice.id
              const isSelected = selectedId === slice.id

              // Offset slice on hover along its midAngle
              let transform = ''
              if (isHovered || isSelected) {
                const offsetDistance = isHovered ? 12 : 6
                const rad = ((slice.midAngle - 90) * Math.PI) / 180
                const ox = offsetDistance * Math.cos(rad)
                const oy = offsetDistance * Math.sin(rad)
                transform = `translate(${ox}, ${oy})`
              }

              // Label position
              const labelRadius = chartStyle === 'donut'
                ? (outerRadius + innerRadius) / 2
                : outerRadius * 0.68
              const labelPos = polarToCartesian(cx, cy, labelRadius, slice.midAngle)

              return (
                <g
                  key={slice.id}
                  className="transition-transform duration-300 ease-out cursor-pointer group"
                  transform={transform}
                  onMouseEnter={() => {
                    setHoveredSlice(slice)
                    onSelectSlice(slice.originalNode)
                  }}
                  onMouseLeave={() => setHoveredSlice(null)}
                  onClick={() => {
                    if (slice.hasChildren) {
                      onDrillDown(slice.originalNode)
                    } else {
                      onSelectSlice(slice.originalNode)
                    }
                  }}
                >
                  {/* Slice Path */}
                  <path
                    d={slice.pathData}
                    fill={`url(#grad-${chartId}-${slice.id})`}
                    stroke={isSelected ? '#ffffff' : '#0f172a'}
                    strokeWidth={isSelected ? 3 : 2}
                    filter={isHovered ? `url(#shadow-${chartId})` : undefined}
                    className="transition-all duration-200 hover:brightness-110"
                  />

                  {/* Slice Label (percentage or icon) if slice is wide enough */}
                  {slice.percentage >= 6 && (
                    <g
                      transform={`translate(${labelPos.x}, ${labelPos.y})`}
                      pointerEvents="none"
                      className="transition-opacity duration-200"
                    >
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="fill-white font-bold text-xs tracking-wide drop-shadow-md select-none pointer-events-none"
                      >
                        {slice.percentage >= 10 ? `${slice.percentage.toFixed(1)}%` : slice.icon}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </g>

          {/* Donut Center Display */}
          {chartStyle === 'donut' && (
            <g transform={`translate(${cx}, ${cy})`} pointerEvents="none">
              <circle
                r={innerRadius - 4}
                className="fill-slate-900/95 stroke-slate-800"
                strokeWidth="2"
              />
              {activeSlice ? (
                <>
                  <text
                    y="-22"
                    textAnchor="middle"
                    className="text-2xl select-none"
                  >
                    {activeSlice.icon}
                  </text>
                  <text
                    y="2"
                    textAnchor="middle"
                    className="fill-slate-100 font-bold text-sm tracking-tight select-none"
                  >
                    {activeSlice.percentage.toFixed(1)}%
                  </text>
                  <text
                    y="20"
                    textAnchor="middle"
                    className="fill-emerald-400 font-semibold text-xs tracking-wider select-none"
                  >
                    {formatValue(activeSlice.value, currency)}
                  </text>
                  <text
                    y="36"
                    textAnchor="middle"
                    className="fill-slate-400 text-[10px] select-none max-w-[90px] truncate"
                  >
                    {activeSlice.shortName || activeSlice.name.substring(0, 16)}
                  </text>
                </>
              ) : (
                <>
                  <text
                    y="-16"
                    textAnchor="middle"
                    className="fill-slate-400 text-[11px] font-medium tracking-wider uppercase select-none"
                  >
                    Current Total
                  </text>
                  <text
                    y="8"
                    textAnchor="middle"
                    className="fill-white font-extrabold text-base tracking-tight select-none"
                  >
                    {formatValue(totalValue, currency)}
                  </text>
                  <text
                    y="26"
                    textAnchor="middle"
                    className="fill-slate-400 text-[10px] select-none"
                  >
                    {((totalValue / totalGdpUSD) * 100).toFixed(1)}% of Swiss GDP
                  </text>
                </>
              )}
            </g>
          )}
        </svg>

        {/* Drill down helper tip */}
        <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/60">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Click any slice or button to <strong>drill down</strong> deeper</span>
        </div>
      </div>

      {/* Interactive Legend & Quick Actions List */}
      <div className="flex-1 w-full max-w-md flex flex-col gap-2.5">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span>Category Breakdown ({items.length})</span>
          <span>Share & Value</span>
        </div>

        <div className="flex flex-col gap-2 max-h-[460px] overflow-y-auto pr-1">
          {slices.map((slice) => {
            const isHovered = hoveredSlice?.id === slice.id
            const isSelected = selectedId === slice.id
            const percentOfSwissGDP = (slice.value / totalGdpUSD) * 100

            return (
              <div
                key={slice.id}
                onMouseEnter={() => {
                  setHoveredSlice(slice)
                  onSelectSlice(slice.originalNode)
                }}
                onMouseLeave={() => setHoveredSlice(null)}
                onClick={() => onSelectSlice(slice.originalNode)}
                className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected || isHovered
                    ? 'bg-slate-800/90 border-slate-600 shadow-lg translate-x-1'
                    : 'bg-slate-900/60 border-slate-800/90 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                {/* Left: Indicator, Icon, Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-3.5 h-3.5 rounded-md flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="text-lg flex-shrink-0">{slice.icon}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-slate-100 truncate group-hover:text-white">
                      {slice.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {percentOfSwissGDP >= 0.1
                        ? `${percentOfSwissGDP.toFixed(1)}% of total Swiss GDP`
                        : `<0.1% of Swiss GDP`}
                    </span>
                  </div>
                </div>

                {/* Right: Absolute value, percentage, Drill-down button */}
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-emerald-400">
                      {formatValue(slice.value, currency)}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      {slice.percentage.toFixed(1)}%
                    </span>
                  </div>

                  {slice.hasChildren ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDrillDown(slice.originalNode)
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 transition-all shadow-sm"
                      title={`Open sub-pie chart for ${slice.name}`}
                    >
                      <span>Drill</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-500 uppercase font-mono px-2 py-1 bg-slate-950/60 rounded">
                      Terminal
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
