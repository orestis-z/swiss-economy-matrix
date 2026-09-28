import { useState, useEffect } from 'react'
import type { SectorNode } from './data/swissEconomyData'
import {
  SWISS_ECONOMY_TREE,
  TOTAL_SWISS_GDP_USD,
  findSectorById,
  getAncestors
} from './data/swissEconomyData'
import { PieChartRenderer } from './components/PieChartRenderer'
import { BreadcrumbNav } from './components/BreadcrumbNav'
import { SectorDetailCard } from './components/SectorDetailCard'
import { MultiChartGridView } from './components/MultiChartGridView'
import { EducationalTheoryModal } from './components/EducationalTheoryModal'
import { OnlineToolsDrawer } from './components/OnlineToolsDrawer'
import { SourcesModal } from './components/SourcesModal'
import { SearchBar } from './components/SearchBar'
import confetti from 'canvas-confetti'
import {
  Compass,
  PieChart as PieIcon,
  CircleDot,
  LayoutGrid,
  BookOpen,
  Globe2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Download,
  Share2,
  Check
} from 'lucide-react'
import { formatValue } from './utils/pieMath'

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

export function App() {
  const [currentNode, setCurrentNode] = useState<SectorNode>(SWISS_ECONOMY_TREE)
  const [selectedNode, setSelectedNode] = useState<SectorNode>(
    SWISS_ECONOMY_TREE.children ? SWISS_ECONOMY_TREE.children[0] : SWISS_ECONOMY_TREE
  )
  const [currency, setCurrency] = useState<'USD' | 'CHF'>('CHF')
  const [chartStyle, setChartStyle] = useState<'donut' | 'pie'>('donut')
  const [viewMode, setViewMode] = useState<'drilldown' | 'multigrid'>('drilldown')

  // Modals
  const [isTheoryOpen, setIsTheoryOpen] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isSourcesOpen, setIsSourcesOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Compute ancestors for breadcrumbs
  const ancestors = getAncestors(currentNode.id) || [SWISS_ECONOMY_TREE]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.key === 'Backspace' && !(e.target instanceof HTMLInputElement))) {
        handleStepBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [ancestors])

  // Drill down into a node
  const handleDrillDown = (node: SectorNode) => {
    if (node.children && node.children.length > 0) {
      setCurrentNode(node)
      setSelectedNode(node.children[0])

      // If drilling into level 3, fire confetti celebration
      const path = getAncestors(node.id) || []
      if (path.length >= 3) {
        try {
          confetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.6 }
          })
        } catch (_) {}
      }
    } else {
      setSelectedNode(node)
    }
  }

  // Step up one level
  const handleStepBack = () => {
    if (ancestors.length > 1) {
      const parentNode = ancestors[ancestors.length - 2]
      setCurrentNode(parentNode)
      setSelectedNode(currentNode)
    }
  }

  // Select node from search or direct shortcut
  const handleJumpToNode = (node: SectorNode) => {
    // If it has children, make it current node, else make its parent current node
    if (node.children && node.children.length > 0) {
      setCurrentNode(node)
      setSelectedNode(node.children[0])
    } else {
      const path = getAncestors(node.id) || []
      if (path.length > 1) {
        const parent = path[path.length - 2]
        setCurrentNode(parent)
        setSelectedNode(node)
      } else {
        setSelectedNode(node)
      }
    }
    setViewMode('drilldown')
  }

  // Copy shareable link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const itemsToRender = currentNode.children || [currentNode]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Swiss Banner */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div
              onClick={() => {
                setCurrentNode(SWISS_ECONOMY_TREE)
                setSelectedNode(SWISS_ECONOMY_TREE.children![0])
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              {/* Swiss Red Cross Icon */}
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform flex-shrink-0">
                <span className="text-white font-extrabold text-lg leading-none">✚</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-base md:text-lg tracking-tight text-white m-0 p-0">
                    Swiss Economy Matrix
                  </h1>
                  <span className="text-[10px] font-mono uppercase bg-red-950/80 text-red-300 border border-red-800/40 px-1.5 py-0.5 rounded">
                    2024 GDP
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Interactive Drill-Down Pie Explorer & Official Citations
                </p>
              </div>
            </div>

            {/* Quick Macro Stats */}
            <div className="hidden lg:flex items-center gap-4 text-xs pl-6 border-l border-slate-800">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px]">Nominal GDP</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {formatValue(TOTAL_SWISS_GDP_USD, currency)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px]">Sectors</span>
                <span className="text-slate-200 font-medium">3 Main • 15+ Branches</span>
              </div>
            </div>
          </div>

          {/* Middle: Search Bar */}
          <SearchBar onSelectResult={handleJumpToNode} currency={currency} />

          {/* Right Controls */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Currency toggle */}
            <div className="flex items-center bg-slate-800 rounded-xl p-0.5 border border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  currency === 'USD' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('CHF')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  currency === 'CHF' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                CHF (Fr.)
              </button>
            </div>

            {/* Theory Modal Trigger */}
            <button
              onClick={() => setIsTheoryOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-all"
              title="Learn about Three-Sector Economic Theory"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Theory</span>
            </button>

            {/* Online Tools Trigger */}
            <button
              onClick={() => setIsToolsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-all"
              title="Official online visualization portals (Agrarbericht, OEC, BFS)"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Tools</span>
            </button>

            {/* Sources & Methodology Trigger */}
            <button
              onClick={() => setIsSourcesOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-all"
              title="Official Data Sources, Provenance & Modeling Disclosures"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Sources & Disclosures</span>
            </button>

            {/* GitHub Source Link */}
            <a
              href="https://github.com/orestis-z/swiss-economy-matrix"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-all"
              title="View Source Repository on GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1 flex flex-col gap-6">
        {/* Quick Sector Shortcuts & Mode Switches */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2.5 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs">
          {/* Left: Quick Sector Links */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 text-[11px] font-medium pl-2">Jump to:</span>
            <button
              onClick={() => handleJumpToNode(findSectorById('tertiary')!)}
              className="px-2.5 py-1 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/40 transition-colors flex items-center gap-1"
            >
              <span>🏢 Tertiary (74.7%)</span>
            </button>
            <button
              onClick={() => handleJumpToNode(findSectorById('secondary')!)}
              className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 transition-colors flex items-center gap-1"
            >
              <span>⚙️ Secondary (24.7%)</span>
            </button>
            <button
              onClick={() => handleJumpToNode(findSectorById('primary')!)}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40 transition-colors flex items-center gap-1"
            >
              <span>🌱 Primary (0.6%)</span>
            </button>
            <button
              onClick={() => handleJumpToNode(findSectorById('secondary-manufacturing')!)}
              className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/40 transition-colors flex items-center gap-1"
            >
              <span>🏭 High-Tech Mfg ($168.8B)</span>
            </button>
            <button
              onClick={() => handleJumpToNode(findSectorById('secondary-watchmaking')!)}
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              ⌚ Watches ($23.6B)
            </button>
            <button
              onClick={() => handleJumpToNode(findSectorById('secondary-precision-medtech')!)}
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              🔬 MedTech ($32.1B)
            </button>
            <button
              onClick={() => handleJumpToNode(findSectorById('secondary-machinery-electronics')!)}
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              🤖 Machinery ($21.9B)
            </button>
            <button
              onClick={() => handleJumpToNode(findSectorById('agri-dairy')!)}
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              🧀 Dairy
            </button>
            <button
              onClick={() => handleJumpToNode(findSectorById('secondary-pharma-chemicals')!)}
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              💊 Pharma
            </button>
          </div>

          {/* Right: View Mode & Chart Style Switcher */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Mode Switch: Drill-down vs Multi-Grid */}
            <div className="flex items-center bg-slate-800 rounded-xl p-0.5 border border-slate-700">
              <button
                onClick={() => setViewMode('drilldown')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg font-semibold transition-all ${
                  viewMode === 'drilldown'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Interactive Drill-Down Explorer"
              >
                <PieIcon className="w-3.5 h-3.5" />
                <span>Drill-Down</span>
              </button>
              <button
                onClick={() => setViewMode('multigrid')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg font-semibold transition-all ${
                  viewMode === 'multigrid'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="All Sectors Multi-Chart Matrix"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Multi-Chart Grid</span>
              </button>
            </div>

            {/* Donut vs Pie Toggle (only when in drilldown) */}
            {viewMode === 'drilldown' && (
              <div className="hidden sm:flex items-center bg-slate-800 rounded-xl p-0.5 border border-slate-700">
                <button
                  onClick={() => setChartStyle('donut')}
                  className={`p-1.5 rounded-lg transition-all ${
                    chartStyle === 'donut' ? 'bg-slate-700 text-white' : 'text-slate-400'
                  }`}
                  title="Donut Chart View"
                >
                  <CircleDot className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setChartStyle('pie')}
                  className={`p-1.5 rounded-lg transition-all ${
                    chartStyle === 'pie' ? 'bg-slate-700 text-white' : 'text-slate-400'
                  }`}
                  title="Solid Pie Chart View"
                >
                  <PieIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* View Mode 1: Interactive Drill-Down View */}
        {viewMode === 'drilldown' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Breadcrumb Trail */}
            <BreadcrumbNav
              ancestors={ancestors}
              currentNode={currentNode}
              onNavigate={(node) => {
                setCurrentNode(node)
                setSelectedNode(node.children ? node.children[0] : node)
              }}
              onStepBack={handleStepBack}
              currency={currency}
              totalGdpUSD={TOTAL_SWISS_GDP_USD}
            />

            {/* Main Interactive Chart Card */}
            <div className="p-6 md:p-8 bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl relative">
              {/* Header inside Chart Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-red-400 tracking-wider">
                    <span>Active Exploration Level</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2.5">
                    <span>{currentNode.icon}</span>
                    <span>{currentNode.name}</span>
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentNode(SWISS_ECONOMY_TREE)
                      setSelectedNode(SWISS_ECONOMY_TREE.children![0])
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Macro</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>

              {/* Chart Renderer */}
              <PieChartRenderer
                currentNode={currentNode}
                items={itemsToRender}
                selectedId={selectedNode?.id || null}
                onSelectSlice={(node) => setSelectedNode(node)}
                onDrillDown={handleDrillDown}
                currency={currency}
                chartStyle={chartStyle}
                totalGdpUSD={TOTAL_SWISS_GDP_USD}
              />
            </div>

            {/* Selected Sector Inspector Detail Card */}
            {selectedNode && (
              <SectorDetailCard
                node={selectedNode}
                onDrillDown={handleDrillDown}
                currency={currency}
                totalGdpUSD={TOTAL_SWISS_GDP_USD}
                onOpenSourceModal={() => setIsSourcesOpen(true)}
              />
            )}
          </div>
        )}

        {/* View Mode 2: Multi-Chart Grid Matrix */}
        {viewMode === 'multigrid' && (
          <div className="animate-fade-in">
            <MultiChartGridView
              onSelectAndFocus={(node) => {
                handleJumpToNode(node)
              }}
              currency={currency}
              totalGdpUSD={TOTAL_SWISS_GDP_USD}
            />
          </div>
        )}
      </main>

      {/* Footer with Always Visible Official Sources Quotes */}
      <footer className="mt-12 bg-slate-900 border-t border-slate-800 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 font-semibold">
              <span className="text-red-500 font-bold">✚</span>
              <span>Swiss National Accounts & Economic Sector Visualizer</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xl">
              Official macroeconomic benchmarks: Swiss Federal Statistical Office (BFS / FSO), FOAG (BLW), FOEN (BAFU), Swissmem, and FH. Product-level micro-splits marked with <span className="text-amber-400 font-semibold">* [Est.]</span> are economic estimates modeled from corporate financial filings and calibrated to match official parent aggregates.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 pt-1 text-[11px] text-slate-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span>Created & Curated by:</span>
                <a
                  href="https://orestis.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-red-400 underline underline-offset-4 transition-colors"
                >
                  orestis.ch
                </a>
              </span>
              <span className="text-slate-700">•</span>
              <span>
                Last Updated: <strong className="text-slate-300 font-medium">September 28, 2026</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center text-xs">
            <a
              href="https://github.com/orestis-z/swiss-economy-matrix"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white underline underline-offset-4 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setIsSourcesOpen(true)}
              className="text-slate-300 hover:text-white underline underline-offset-4"
            >
              All Official Sources & Citations
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setIsTheoryOpen(true)}
              className="text-slate-300 hover:text-white underline underline-offset-4"
            >
              Three-Sector Economic Theory
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setIsToolsOpen(true)}
              className="text-slate-300 hover:text-white underline underline-offset-4"
            >
              Online Viz Tools (Agrarbericht / STAT-TAB)
            </button>
          </div>
        </div>
      </footer>

      {/* Educational Theory Modal */}
      <EducationalTheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
      />

      {/* Online Visualization Tools Drawer */}
      <OnlineToolsDrawer
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
      />

      {/* Official Sources Modal */}
      <SourcesModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
      />
    </div>
  )
}

export default App
