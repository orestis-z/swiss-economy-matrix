import React from 'react'
import { X, BookOpen, Globe2, ShieldCheck, Cpu, Award } from 'lucide-react'

interface EducationalTheoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export const EducationalTheoryModal: React.FC<EducationalTheoryModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">The Three-Sector Economic Theory</h2>
              <p className="text-xs text-slate-400">
                Origins, Global Standard, and the Modern Swiss Reality
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

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Section 1: Origins */}
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-base text-white flex items-center gap-2 mb-2">
              <Globe2 className="w-4 h-4 text-blue-400" />
              Why are they called Primary, Secondary, and Tertiary?
            </h3>
            <p>
              The terms originate from the <strong>Three-Sector Theory</strong> developed by economists{' '}
              <strong>Allan Fisher</strong>, <strong>Colin Clark</strong>, and <strong>Jean Fourastié</strong> in the 1930s and 1940s. It describes the natural progression of human economic activity and the sequential stages of the supply chain:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                <span className="font-bold text-emerald-400 block mb-1">1. Primary (First Step)</span>
                <p className="text-xs text-slate-300">
                  Extracting raw materials directly from the earth: agriculture, forestry, mining, and fishing.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40">
                <span className="font-bold text-amber-400 block mb-1">2. Secondary (Second Step)</span>
                <p className="text-xs text-slate-300">
                  Transforming raw materials into finished usable goods: manufacturing, construction, and processing.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40">
                <span className="font-bold text-blue-400 block mb-1">3. Tertiary (Third Step)</span>
                <p className="text-xs text-slate-300">
                  Providing intangible services: retail distribution, banking, healthcare, education, transport, and tourism.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Are those 3 the main ones in each country? */}
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-base text-white flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Are these 3 the main ones in every country in the world?
            </h3>
            <p>
              <strong>Yes.</strong> These three sectors represent the universal standard adopted by the{' '}
              <strong>United Nations (UN SNA)</strong>, <strong>World Bank</strong>, <strong>OECD</strong>, and the{' '}
              <strong>International Labour Organization (ILO)</strong> to measure national output and labor force distribution.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              While the taxonomy is universal, the proportion varies drastically:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-slate-300">
              <li><strong>Developing economies</strong> often rely on the Primary sector for 30% to 60%+ of employment.</li>
              <li><strong>Industrializing economies</strong> experience a massive surge in the Secondary sector (manufacturing).</li>
              <li><strong>Advanced post-industrial economies</strong> (like Switzerland, the US, UK, and Germany) are overwhelmingly dominated by the Tertiary sector (70% - 80%+ of GDP).</li>
            </ul>
          </div>

          {/* Section 3: Expanding to Quaternary & Quinary */}
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-base text-white flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              Modern Extension: Quaternary & Quinary Tiers
            </h3>
            <p>
              As services evolved into hyper-complex digital activities, modern economists introduced two sub-tiers within the tertiary classification:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40">
                <span className="font-bold text-purple-400 block mb-1">Quaternary Sector (Knowledge)</span>
                <p className="text-xs text-slate-300">
                  Pure intellectual and information-based activities: AI software, biotechnology R&D, data analytics, and patent law. Switzerland leads globally here with Basel Pharma R&D and Zurich's Google engineering center.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40">
                <span className="font-bold text-rose-400 block mb-1">Quinary Sector (Leadership)</span>
                <p className="text-xs text-slate-300">
                  Highest-level decision making: top corporate executives, university presidents, non-profit trustees, and international governance (Geneva UN, WEF Davos, Olympic Committee).
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: The Swiss Paradox: Why 0.6% Agriculture is heavily protected */}
          <div className="bg-red-950/20 p-4 rounded-2xl border border-red-800/40">
            <h3 className="font-bold text-base text-white flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              The Swiss Case: Why 0.6% Agriculture Receives Billions in Subsidies
            </h3>
            <p className="text-xs text-slate-300">
              Swiss agriculture accounts for only <strong>0.6% of nominal GDP ($5.6 billion)</strong>. Due to steep Alpine topography, small family farm sizes, and high Swiss labor wages, Swiss farmers cannot compete on price with flat industrial farms abroad.
            </p>
            <p className="mt-2 text-xs text-slate-300">
              Under <strong>Article 104 of the Swiss Federal Constitution</strong>, the Confederation pays over <strong>CHF 2.8 billion annually</strong> in direct payments (<em>Direktzahlungen</em>) for three strategic reasons:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-xs text-slate-300">
              <li><strong>Food Security:</strong> Maintaining a ~50% domestic calorific self-sufficiency buffer against geopolitical disruptions.</li>
              <li><strong>Alpine Landscape Stewardship:</strong> Keeping mountain pastures grazed prevents reforestation, landslides, and avalanche hazards, safeguarding Switzerland's multi-billion dollar tourism image.</li>
              <li><strong>Heritage & Decentralization:</strong> Preserving rural culture, artisanal cheesemaking traditions (AOP Gruyère/Emmentaler), and inhabited valleys.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  )
}
