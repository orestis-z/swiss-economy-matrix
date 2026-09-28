import React from 'react'
import type { SectorNode } from '../data/swissEconomyData'
import { ExternalLink, Building2, TrendingUp, BookOpen, ChevronRight } from 'lucide-react'
import { formatValue } from '../utils/pieMath'

interface SectorDetailCardProps {
  node: SectorNode
  onDrillDown: (node: SectorNode) => void
  currency: 'USD' | 'CHF'
  totalGdpUSD: number
  onOpenSourceModal: (source: any) => void
}

export const SectorDetailCard: React.FC<SectorDetailCardProps> = ({
  node,
  onDrillDown,
  currency,
  totalGdpUSD,
  onOpenSourceModal
}) => {
  const percentOfTotal = (node.valueUSD / totalGdpUSD) * 100
  const hasChildren = Boolean(node.children && node.children.length > 0)

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden">
      {/* Background ambient color glow matching node color */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: node.color }}
      />

      {/* Header: Title, Icon, Values */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-start gap-3.5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md border border-white/10"
            style={{ backgroundColor: `${node.color}25` }}
          >
            {node.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: node.color }}
              />
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Selected Sector Detail
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
              {node.name}
            </h3>
          </div>
        </div>

        {/* Value pills */}
        <div className="flex flex-col items-start md:items-end gap-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-extrabold text-emerald-400 tracking-tight">
              {formatValue(node.valueUSD, currency)}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({currency === 'USD' ? 'USD' : 'CHF'})
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Share of Swiss GDP:</span>
            <span className="font-semibold text-slate-200">
              {percentOfTotal >= 0.1 ? `${percentOfTotal.toFixed(2)}%` : '<0.1%'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar showing share of Total Economy */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Economic Footprint vs Entire Switzerland</span>
          <span className="font-mono text-slate-300">
            {formatValue(node.valueUSD, currency)} / {formatValue(totalGdpUSD, currency)}
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.min(100, Math.max(1, percentOfTotal))}%`,
              backgroundColor: node.color
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="text-sm leading-relaxed text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
        <p>{node.description}</p>
        {node.additionalNotes && (
          <p className="mt-2 text-xs text-slate-400 border-t border-slate-800/80 pt-2 italic">
            📌 {node.additionalNotes}
          </p>
        )}
      </div>

      {/* Key Drivers & Key Entities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {node.keyDrivers && node.keyDrivers.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <TrendingUp className="w-3.5 h-3.5 text-red-400" />
              <span>Key Growth & Production Drivers</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {node.keyDrivers.map((driver, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/60"
                >
                  {driver}
                </span>
              ))}
            </div>
          </div>
        )}

        {node.notableEntities && node.notableEntities.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Notable Swiss Entities & Champions</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {node.notableEntities.map((entity, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-blue-950/40 text-blue-300 border border-blue-800/40"
                >
                  {entity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Official Data Source Citation Box (Prompt explicitly required: "make sure to always quote and link the source used to create the data") */}
      <div className="mt-2 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5 min-w-0">
          <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-slate-200">Official Data Source:</span>
              <span className="text-slate-300 font-medium">{node.source.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                {node.source.yearOrEdition}
              </span>
            </div>
            <span className="text-slate-400 text-[11px] truncate">
              Published by {node.source.organization}
            </span>
          </div>
        </div>

        <a
          href={node.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 hover:text-emerald-200 border border-emerald-800/50 font-medium transition-all text-xs flex-shrink-0 self-start sm:self-auto group"
          title="Open official government/academic portal in a new tab"
        >
          <span>Verify at Official Source</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Action Footer: Drill Down Button */}
      {hasChildren && (
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => onDrillDown(node)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-red-600/30 group"
          >
            <span>Drill Down into Sub-Categories ({node.children?.length} items)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  )
}
