import React from 'react'
import type { SectorNode } from '../data/swissEconomyData'
import { ChevronRight, ArrowLeft, Compass } from 'lucide-react'
import { formatValue } from '../utils/pieMath'

interface BreadcrumbNavProps {
  ancestors: SectorNode[]
  currentNode: SectorNode
  onNavigate: (node: SectorNode) => void
  onStepBack: () => void
  currency: 'USD' | 'CHF'
  totalGdpUSD: number
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  ancestors,
  currentNode,
  onNavigate,
  onStepBack,
  currency,
  totalGdpUSD
}) => {
  const isAtRoot = currentNode.id === 'switzerland'
  const currentDepth = ancestors.length - 1

  const getLevelLabel = (depth: number) => {
    switch (depth) {
      case 0:
        return 'Tier 1: Macro Economy (3 Main Sectors)'
      case 1:
        return 'Tier 2: Major Economic Branches'
      case 2:
        return 'Tier 3: Specialized Disciplines'
      case 3:
        return 'Tier 4: Market Segments & Industry Pillars'
      case 4:
        return 'Tier 5: Ultra-Granular Products & Regional Heritage'
      default:
        return `Tier ${depth + 1}: Deep Micro-Sectors`
    }
  }

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-md">
      {/* Left: Back button + Breadcrumb items */}
      <div className="flex items-center gap-2 flex-wrap min-w-0">
        {!isAtRoot && (
          <button
            onClick={onStepBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all shadow-sm group"
            title="Go up one level (Backspace)"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Up</span>
          </button>
        )}

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
          {ancestors.map((node, index) => {
            const isLast = index === ancestors.length - 1
            const isFirst = index === 0

            return (
              <React.Fragment key={node.id}>
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                )}
                <button
                  type="button"
                  onClick={() => onNavigate(node)}
                  disabled={isLast}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    isLast
                      ? 'bg-red-950/40 text-red-300 font-semibold border border-red-800/40 cursor-default'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60 cursor-pointer'
                  }`}
                >
                  {isFirst ? (
                    <span className="flex items-center gap-1">
                      <span>🇨🇭</span>
                      <span>Switzerland Total</span>
                    </span>
                  ) : (
                    <>
                      <span>{node.icon}</span>
                      <span className="truncate max-w-[130px] md:max-w-[180px]">
                        {node.shortName || node.name}
                      </span>
                    </>
                  )}
                </button>
              </React.Fragment>
            )
          })}
        </nav>
      </div>

      {/* Right: Depth Badge & Node Total */}
      <div className="flex items-center gap-3 self-end md:self-auto flex-shrink-0">
        <span className="text-[11px] font-medium text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-red-400" />
          <span>{getLevelLabel(currentDepth)}</span>
        </span>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
          <span className="text-xs text-slate-400">Total:</span>
          <span className="text-sm font-bold text-emerald-400">
            {formatValue(currentNode.valueUSD, currency)}
          </span>
          {!isAtRoot && (
            <span className="text-xs font-medium text-slate-400">
              ({((currentNode.valueUSD / totalGdpUSD) * 100).toFixed(1)}% of GDP)
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
