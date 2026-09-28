import React from 'react'
import { X, ExternalLink, Compass } from 'lucide-react'

interface OnlineToolsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

interface ToolInfo {
  name: string
  provider: string
  url: string
  badge: string
  description: string
  bestFor: string
  features: string[]
}

const ONLINE_TOOLS: ToolInfo[] = [
  {
    name: "The Swiss Agricultural Report (Agrarbericht)",
    provider: "Federal Office for Agriculture (FOAG / BLW)",
    url: "https://www.agrarbericht.ch/",
    badge: "Official Swiss Agriculture",
    description: "The premier annual interactive report published by the Swiss federal government detailing dairy cattle headcount, organic Knospe farms, land cultivation, producer prices, and farm subsidies.",
    bestFor: "Drilling down into the Primary Sector: milk yields, livestock censuses, and cantonal agricultural subsidies.",
    features: [
      "Interactive data plots for cheese and milk production",
      "Direct payment subsidies calculator",
      "Migrating to data.blw.admin.ch centralized portal"
    ]
  },
  {
    name: "STAT-TAB Interactive Database",
    provider: "Swiss Federal Statistical Office (FSO / BFS / OFS)",
    url: "https://www.bfs.admin.ch/bfs/en/home/services/stat-tab.html",
    badge: "Macroeconomic & Branches",
    description: "The Swiss Confederation's official multidimensional statistics cube. Allows users to dynamically slice National Accounts by sector, NOGA classification code, canton, and year.",
    bestFor: "Custom GDP time-series, labor force breakdowns, and Gross Value Added (GVA) by economic branch.",
    features: [
      "Dynamic pivot-table builder",
      "Full NOGA branch taxonomy export",
      "Quarterly GDP updates and employment rates"
    ]
  },
  {
    name: "The Observatory of Economic Complexity (OEC)",
    provider: "Datawheel / MIT Media Lab heritage",
    url: "https://oec.world/en/profile/country/che",
    badge: "Trade & Manufacturing Treemaps",
    description: "The world's foremost visual platform for international trade and economic complexity. Features stunning interactive treemaps and product-space networks for Switzerland's secondary sector.",
    bestFor: "Visualizing Swiss exports: pharmaceuticals, packaged medicaments, luxury watches, and gold refining.",
    features: [
      "Interactive zoomable treemaps",
      "Trade partner destination networks",
      "Product complexity indices (PCI)"
    ]
  },
  {
    name: "Trading Economics & World Bank Open Data",
    provider: "Trading Economics & The World Bank Group",
    url: "https://tradingeconomics.com/switzerland/gdp",
    badge: "Macro Global Benchmarks",
    description: "Fast, clean interactive macroeconomic charts comparing Swiss GDP, sector contribution percentages, GDP per capita ($105k+), and historical inflation/interest rates against global peers.",
    bestFor: "Long-term historical trends (1960–2025) and multi-country benchmarking.",
    features: [
      "Interactive real-time line charts",
      "Forecast models and historical data tables",
      "API access and country comparisons"
    ]
  }
]

export const OnlineToolsDrawer: React.FC<OnlineToolsDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Recommended Online Visualization Tools</h2>
              <p className="text-xs text-slate-400">
                Official Swiss platforms and global tools to explore this data interactively
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid of Tools */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ONLINE_TOOLS.map((tool, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/40">
                      {tool.badge}
                    </span>
                    <span className="text-xs text-slate-400 truncate">{tool.provider}</span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
                    <strong className="text-emerald-400">Best for:</strong> {tool.bestFor}
                  </div>

                  <ul className="mt-3 space-y-1 text-[11px] text-slate-400">
                    {tool.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">External Platform</span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all group"
                  >
                    <span>Launch Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close Tools List
          </button>
        </div>
      </div>
    </div>
  )
}
