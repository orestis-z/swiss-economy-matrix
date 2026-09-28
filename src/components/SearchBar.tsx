import React, { useState, useRef, useEffect } from 'react'
import { Search, X, ChevronRight } from 'lucide-react'
import type { SectorNode } from '../data/swissEconomyData'
import { searchSectors } from '../data/swissEconomyData'
import { formatValue } from '../utils/pieMath'

interface SearchBarProps {
  onSelectResult: (node: SectorNode) => void
  currency: 'USD' | 'CHF'
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectResult, currency }) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SectorNode[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length > 1) {
      const found = searchSectors(query)
      setResults(found)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (node: SectorNode) => {
    onSelectResult(node)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs md:max-w-sm">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sectors, companies, crops..."
          className="w-full bg-slate-900/90 text-slate-200 placeholder-slate-500 pl-9 pr-8 py-2 rounded-xl text-xs border border-slate-700/80 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 p-0.5 rounded text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-72 overflow-y-auto divide-y divide-slate-800">
          <div className="p-2 text-[10px] uppercase font-mono tracking-wider text-slate-400 bg-slate-950/60">
            Found {results.length} sectors & sub-branches
          </div>
          {results.map((node) => (
            <button
              key={node.id}
              onClick={() => handleSelect(node)}
              className="w-full text-left p-3 hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-lg flex-shrink-0">{node.icon}</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                    {node.name}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    {node.shortName || node.name}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-bold text-emerald-400">
                  {formatValue(node.valueUSD, currency)}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
