import React, { useState } from 'react'
import type { SectorNode } from '../data/swissEconomyData'
import { findSectorById } from '../data/swissEconomyData'
import type { PieSlice } from '../utils/pieMath'
import { calculateSlices, formatValue } from '../utils/pieMath'
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react'

interface MultiChartGridViewProps {
  onSelectAndFocus: (node: SectorNode) => void
  currency: 'USD' | 'CHF'
  totalGdpUSD: number
}

// Mini SVG Donut Chart for grid display
const MiniDonut: React.FC<{
  node: SectorNode
  currency: 'USD' | 'CHF'
  onFocus: () => void
}> = ({ node, currency, onFocus }) => {
  const [hoveredSlice, setHoveredSlice] = useState<PieSlice | null>(null)
  const size = 180
  const cx = size / 2
  const cy = size / 2
  const outerRadius = 75
  const innerRadius = 40

  const items = node.children || []
  const slices = calculateSlices(items, cx, cy, outerRadius, innerRadius)
  const total = items.reduce((acc, it) => acc + it.valueUSD, 0)

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-xl group">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">{node.icon}</span>
            <div>
              <h4 className="font-bold text-sm text-slate-100 group-hover:text-white transition-colors">
                {node.name}
              </h4>
              <span className="text-xs text-slate-400">
                {items.length} sub-branches
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-emerald-400">
              {formatValue(node.valueUSD, currency)}
            </div>
            <div className="text-[11px] text-slate-400">
              {((node.valueUSD / 936.5) * 100).toFixed(1)}% of GDP
            </div>
          </div>
        </div>

        {/* Center SVG Chart */}
        <div className="flex justify-center my-4 relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
            {slices.map((slice) => {
              const isHov = hoveredSlice?.id === slice.id
              let transform = ''
              if (isHov) {
                const rad = ((slice.midAngle - 90) * Math.PI) / 180
                const ox = 6 * Math.cos(rad)
                const oy = 6 * Math.sin(rad)
                transform = `translate(${ox}, ${oy})`
              }

              return (
                <path
                  key={slice.id}
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="#0f172a"
                  strokeWidth="2"
                  transform={transform}
                  className="transition-transform duration-200 cursor-pointer hover:brightness-115"
                  onMouseEnter={() => setHoveredSlice(slice)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              )
            })}

            {/* Inner text */}
            <g transform={`translate(${cx}, ${cy})`} pointerEvents="none">
              <circle r={innerRadius - 2} fill="#090d16" />
              {hoveredSlice ? (
                <>
                  <text y="-8" textAnchor="middle" className="text-base select-none">
                    {hoveredSlice.icon}
                  </text>
                  <text y="8" textAnchor="middle" className="fill-white font-bold text-xs select-none">
                    {hoveredSlice.percentage.toFixed(0)}%
                  </text>
                  <text y="22" textAnchor="middle" className="fill-emerald-400 text-[10px] font-mono select-none">
                    {formatValue(hoveredSlice.value, currency)}
                  </text>
                </>
              ) : (
                <>
                  <text y="-2" textAnchor="middle" className="fill-slate-400 text-[10px] select-none">
                    Total
                  </text>
                  <text y="14" textAnchor="middle" className="fill-white font-bold text-xs select-none">
                    {formatValue(total, currency)}
                  </text>
                </>
              )}
            </g>
          </svg>
        </div>

        {/* Slices legend preview */}
        <div className="flex flex-col gap-1.5 text-xs mt-2 max-h-36 overflow-y-auto pr-1">
          {slices.map((slice) => (
            <div
              key={slice.id}
              className={`flex items-center justify-between p-1.5 rounded-lg transition-colors ${
                hoveredSlice?.id === slice.id ? 'bg-slate-800' : 'hover:bg-slate-800/40'
              }`}
              onMouseEnter={() => setHoveredSlice(slice)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-slate-300 truncate text-[11px]">
                  {slice.shortName || slice.name}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 font-mono text-[11px]">
                <span className="text-emerald-400">{formatValue(slice.value, currency)}</span>
                <span className="text-slate-400">{slice.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: Source + Focus Button */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <a
          href={node.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 text-[11px] truncate max-w-[170px]"
          title={node.source.name}
        >
          <span className="truncate">{node.source.organization.split('(')[0]}</span>
          <ExternalLink className="w-3 h-3 flex-shrink-0" />
        </a>

        <button
          type="button"
          onClick={onFocus}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 transition-all font-semibold text-xs"
        >
          <span>Explore</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

export const MultiChartGridView: React.FC<MultiChartGridViewProps> = ({
  onSelectAndFocus,
  currency,
  totalGdpUSD
}) => {
  const [activeTab, setActiveTab] = useState<'3sectors' | 'primaryGranular' | 'secondaryGranular'>(
    '3sectors'
  )

  // Fetch nodes
  const tertiary = findSectorById('tertiary')
  const secondary = findSectorById('secondary')
  const primary = findSectorById('primary')

  // Primary subcategories
  const agri = findSectorById('primary-agriculture')
  const forestry = findSectorById('primary-forestry')
  const fishing = findSectorById('primary-fishing')
  const dairy = findSectorById('agri-dairy')
  const meat = findSectorById('agri-livestock-meat')
  const crops = findSectorById('agri-crops-cereals')

  // Secondary subcategories
  const manufacturing = findSectorById('secondary-manufacturing')
  const pharma = findSectorById('secondary-pharma-chemicals')
  const medtech = findSectorById('secondary-precision-medtech')
  const watch = findSectorById('secondary-watchmaking')
  const machinery = findSectorById('secondary-machinery-electronics')
  const food = findSectorById('secondary-food-processing')
  const construction = findSectorById('secondary-construction')
  const energy = findSectorById('secondary-energy-utilities')

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('3sectors')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === '3sectors'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🇨🇭 3 Core Swiss Sectors (Breakdown Charts)</span>
          </button>

          <button
            onClick={() => setActiveTab('primaryGranular')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'primaryGranular'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🌱 Primary Sector Granular Breakdown (Lots of Pie Charts)</span>
          </button>

          <button
            onClick={() => setActiveTab('secondaryGranular')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'secondaryGranular'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>⚙️ High-Tech & Precision Manufacturing Deep Suite</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Click any <strong>Explore</strong> button to drill down interactively</span>
        </div>
      </div>

      {/* Tab 1: The 3 Main Sectors (Prompt: "break down each of those 3 swiss sectors in 3 pie charts showing subcategories") */}
      {activeTab === '3sectors' && (
        <div className="flex flex-col gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white">Three Macro Sector Breakdown:</span> Switzerland’s $936.5B economy divided into its three classical tiers. Below are the 3 distinct pie charts visualizing the internal Gross Value Added (GVA) distribution inside each sector.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tertiary && (
              <MiniDonut
                node={tertiary}
                currency={currency}
                onFocus={() => onSelectAndFocus(tertiary)}
              />
            )}
            {secondary && (
              <MiniDonut
                node={secondary}
                currency={currency}
                onFocus={() => onSelectAndFocus(secondary)}
              />
            )}
            {primary && (
              <MiniDonut
                node={primary}
                currency={currency}
                onFocus={() => onSelectAndFocus(primary)}
              />
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Deep Primary Sector Granular Subcategories (Prompt: "now one level deeper, create lots of pie charts for each of the primary sectors subcategories") */}
      {activeTab === 'primaryGranular' && (
        <div className="flex flex-col gap-4">
          <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-800/30 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-emerald-400">Primary Sector Granular Multi-Chart Suite:</span> While agriculture makes up only 0.6% ($5.6B) of Swiss GDP, it is deeply multifaceted, heavily protected by federal direct payments (Direktzahlungen), and culturally paramount. Here are the dedicated pie charts for each primary branch and sub-branch:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agri && (
              <MiniDonut
                node={agri}
                currency={currency}
                onFocus={() => onSelectAndFocus(agri)}
              />
            )}
            {forestry && (
              <MiniDonut
                node={forestry}
                currency={currency}
                onFocus={() => onSelectAndFocus(forestry)}
              />
            )}
            {fishing && (
              <MiniDonut
                node={fishing}
                currency={currency}
                onFocus={() => onSelectAndFocus(fishing)}
              />
            )}
            {dairy && (
              <MiniDonut
                node={dairy}
                currency={currency}
                onFocus={() => onSelectAndFocus(dairy)}
              />
            )}
            {meat && (
              <MiniDonut
                node={meat}
                currency={currency}
                onFocus={() => onSelectAndFocus(meat)}
              />
            )}
            {crops && (
              <MiniDonut
                node={crops}
                currency={currency}
                onFocus={() => onSelectAndFocus(crops)}
              />
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Secondary & Industrial Sub-Charts */}
      {activeTab === 'secondaryGranular' && (
        <div className="flex flex-col gap-4">
          <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-800/30 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-400">High-Tech & Precision Manufacturing Deep Suite ($168.8B):</span> Switzerland is the world's most sophisticated exporter of life sciences, luxury mechanical horology, micron-accurate MedTech, and industrial robotics per capita. Explore the dedicated sub-pie charts for every single manufacturing discipline below:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manufacturing && (
              <MiniDonut
                node={manufacturing}
                currency={currency}
                onFocus={() => onSelectAndFocus(manufacturing)}
              />
            )}
            {pharma && (
              <MiniDonut
                node={pharma}
                currency={currency}
                onFocus={() => onSelectAndFocus(pharma)}
              />
            )}
            {watch && (
              <MiniDonut
                node={watch}
                currency={currency}
                onFocus={() => onSelectAndFocus(watch)}
              />
            )}
            {medtech && (
              <MiniDonut
                node={medtech}
                currency={currency}
                onFocus={() => onSelectAndFocus(medtech)}
              />
            )}
            {machinery && (
              <MiniDonut
                node={machinery}
                currency={currency}
                onFocus={() => onSelectAndFocus(machinery)}
              />
            )}
            {food && (
              <MiniDonut
                node={food}
                currency={currency}
                onFocus={() => onSelectAndFocus(food)}
              />
            )}
            {construction && (
              <MiniDonut
                node={construction}
                currency={currency}
                onFocus={() => onSelectAndFocus(construction)}
              />
            )}
            {energy && (
              <MiniDonut
                node={energy}
                currency={currency}
                onFocus={() => onSelectAndFocus(energy)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
