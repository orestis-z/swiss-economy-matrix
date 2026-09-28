import React, { useState } from 'react'
import { X, ExternalLink, ShieldCheck, AlertTriangle, CheckCircle2, FileText } from 'lucide-react'
import { OFFICIAL_SOURCES } from '../data/swissEconomyData'

interface SourcesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sources' | 'methodology'>('methodology')
  if (!isOpen) return null

  const sourcesList = Object.values(OFFICIAL_SOURCES)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Data Provenance & Sources</h2>
              <p className="text-xs text-slate-400">
                Official federal accounts, verified trade bodies & modeled sub-tier methodology
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

        {/* Tab switcher */}
        <div className="px-6 pt-4 border-b border-slate-800 bg-slate-950/30 flex gap-3 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('methodology')}
            className={`pb-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'methodology'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Official vs. Modeled Disclosures</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sources')}
            className={`pb-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'sources'
                ? 'border-emerald-500 text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Administrative Citations ({sourcesList.length})</span>
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'methodology' ? (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>1. Direct Official Administrative Statistics</span>
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  The macro figures at Levels 1 through 3 are <strong>directly sourced</strong> from verified publications of official Swiss federal authorities and recognized national trade associations:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                  <li><strong>Total GDP & 3 Sectors:</strong> Swiss Federal Statistical Office (BFS / FSO) National Accounts (ESVG 2010) — Tertiary 74.7%, Secondary 24.7%, Primary 0.6%.</li>
                  <li><strong>Primary Sector Splits:</strong> Federal Office for Agriculture (FOAG / BLW) annual <em>Agrarbericht</em> and FOEN (BAFU) forest inventory.</li>
                  <li><strong>Industry Level Totals:</strong> Swiss Watchmaking from the <em>Federation of the Swiss Watch Industry (FH)</em> (~CHF 26B+), Machinery/Electronics from <em>Swissmem</em> (~CHF 19.4B), MedTech from <em>Swiss Medtech</em> (~CHF 17.5B), and Chemicals/Pharma from <em>scienceindustries</em> (~CHF 80B).</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-amber-200">
                <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>2. Modeled Sub-Tier Economic Estimates (Marked with * [Est.])</span>
                </h3>
                <p className="text-amber-100/90 leading-relaxed">
                  For granular sub-tiers (e.g. <em>Bühler Flour Mills vs. Chocolate Conches</em>, <em>Schindler Skyscraper Hoists vs. Eco-Elevators</em>, <em>Stäubli Cleanroom Robotics</em>, or <em>Tornos Swiss-Type Lathes</em>):
                </p>
                <ul className="list-disc list-inside space-y-1 text-amber-200/90 pl-1">
                  <li><strong>Why official statistics stop here:</strong> The Swiss government classifies economic branches using the <strong>NOGA</strong> standard (Nomenclature Générale des Activités Économiques), which stops at 4-digit codes (e.g., NOGA 28.93). Official bureaus <strong>do not publish separate GDP lines</strong> for individual equipment families.</li>
                  <li><strong>Calibration Method:</strong> Granular sub-tiers are economic estimates modeled on corporate annual filings (ABB, Schindler, Bühler, Georg Fischer, Tornos, Mikron, SIG, Lonza, Roche, Nestlé) and market share data from training knowledge.</li>
                  <li><strong>Normalization:</strong> All sub-tier figures are mathematically normalized to anchor into and sum up exactly to the authoritative parent sector totals published by Swissmem, FH, and BFS.</li>
                </ul>
                <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-300/90">
                  ⚠️ Whenever you inspect an estimated figure, the app explicitly marks it with <strong>* [Est.]</strong> and provides the specific corporate calibration methodology.
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
                Primary administrative and trade portals used as benchmarks throughout the application:
              </p>
              {sourcesList.map((src, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">{src.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                        {src.yearOrEdition}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      {src.organization}
                    </div>
                    <p className="text-xs text-slate-300 leading-normal">
                      {src.description}
                    </p>
                  </div>

                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all flex-shrink-0 self-start sm:self-auto group"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close Sources
          </button>
        </div>
      </div>
    </div>
  )
}
