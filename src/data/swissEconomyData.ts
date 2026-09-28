export interface EconomicSource {
  name: string
  organization: string
  url: string
  description: string
  yearOrEdition: string
}

export interface SectorNode {
  id: string
  name: string
  shortName?: string
  icon: string
  color: string
  textColor?: string
  valueUSD: number // in billions USD
  percentageOfParent?: number
  percentageOfTotal?: number
  description: string
  keyDrivers?: string[]
  notableEntities?: string[]
  source: EconomicSource
  additionalNotes?: string
  children?: SectorNode[]
}

export const OFFICIAL_SOURCES: Record<string, EconomicSource> = {
  BFS_GDP: {
    name: "National Accounts (ESVG 2010 / ESA 2010)",
    organization: "Swiss Federal Statistical Office (FSO / BFS / OFS)",
    url: "https://www.bfs.admin.ch/bfs/en/home/statistics/national-economy/national-accounts.html",
    description: "Official annual macroeconomic accounts, Gross Domestic Product (GDP), and Gross Value Added (GVA) by economic branch.",
    yearOrEdition: "2024 / 2025 Release"
  },
  BLW_AGRAR: {
    name: "Swiss Agricultural Report (Agrarbericht)",
    organization: "Federal Office for Agriculture (FOAG / BLW)",
    url: "https://www.agrarbericht.ch/",
    description: "Detailed granular statistics on Swiss farm output, dairy farming, livestock, crops, and agricultural subsidies.",
    yearOrEdition: "Agrarbericht 2024 & data.blw.admin.ch"
  },
  FOEN_FOREST: {
    name: "Swiss Forest Report & Fishery Statistics",
    organization: "Federal Office for the Environment (FOEN / BAFU)",
    url: "https://www.bafu.admin.ch/bafu/en/home/topics/forest.html",
    description: "National forest inventory, timber harvesting, forest economy, and freshwater fishery data.",
    yearOrEdition: "FOEN Annual Report"
  },
  OEC_SWISS: {
    name: "Switzerland Economic Complexity Profile",
    organization: "The Observatory of Economic Complexity (OEC)",
    url: "https://oec.world/en/profile/country/che",
    description: "High-resolution international trade, manufacturing subsectors, pharmaceutical exports, and precision instruments.",
    yearOrEdition: "OEC 2024 Trade Data"
  },
  WORLD_BANK: {
    name: "Switzerland National Accounts Data",
    organization: "World Bank Open Data",
    url: "https://data.worldbank.org/country/switzerland",
    description: "Global comparative nominal GDP, sector value added (% of GDP), and macroeconomic indicators.",
    yearOrEdition: "World Bank 2024 Database"
  },
  STAT_TAB: {
    name: "STAT-TAB Interactive Database",
    organization: "Swiss Federal Statistical Office (BFS)",
    url: "https://www.bfs.admin.ch/bfs/en/home/services/stat-tab.html",
    description: "Dynamic query database for employment, production accounts, and secondary/tertiary sub-branches.",
    yearOrEdition: "FSO STAT-TAB Online"
  },
  FH_WATCH: {
    name: "Swiss Watch Industry Annual Report",
    organization: "Federation of the Swiss Watch Industry (FH / FHS)",
    url: "https://www.fhs.swiss/",
    description: "Official export statistics, mechanical vs quartz timepieces, precious metal complications, and Jura Watch Valley production.",
    yearOrEdition: "FH Annual Review 2024"
  },
  SWISSMEM: {
    name: "MEM Industries Annual Review",
    organization: "Swissmem (Swiss Mechanical & Electrical Engineering)",
    url: "https://www.swissmem.ch/",
    description: "Machinery, precision tooling, robotics, sensor technology, photonics, and industrial automation accounts.",
    yearOrEdition: "Swissmem Annual Accounts"
  },
  SWISS_MEDTECH: {
    name: "Swiss Medical Technology Sector Study",
    organization: "Swiss Medtech & Federal Department of Economic Affairs",
    url: "https://www.swiss-medtech.ch/",
    description: "Dental implantology, hearing acoustics, orthopedic devices, cardiovascular implants, and lab automation.",
    yearOrEdition: "Swiss Medtech Sector Report"
  },
  CHOCOSUISSE: {
    name: "Swiss Confectionery & Cocoa Statistics",
    organization: "Chocosuisse & FOSPO",
    url: "https://www.chocosuisse.ch/",
    description: "Cocoa bean processing, chocolate confectionery manufacturing, export volumes, and industrial alpine dairy.",
    yearOrEdition: "Chocosuisse Statistical Bulletin"
  }
}

// Total nominal GDP of Switzerland in 2024 ~ $936.5 Billion USD (approx. CHF 825 Billion)
export const TOTAL_SWISS_GDP_USD = 936.5
export const USD_TO_CHF_RATE = 0.88 // 1 USD = ~0.88 CHF

export const SWISS_ECONOMY_TREE: SectorNode = {
  id: "switzerland",
  name: "Switzerland Total Economy",
  shortName: "Total GDP",
  icon: "🇨🇭",
  color: "#dc2626",
  valueUSD: 936.5,
  description: "Total Swiss Gross Domestic Product (GDP). Switzerland has one of the world's most prosperous, stable, and high-value modern knowledge economies, dominated by services and specialized precision industries.",
  source: OFFICIAL_SOURCES.BFS_GDP,
  children: [
    {
      id: "tertiary",
      name: "Tertiary Sector (Services)",
      shortName: "Services",
      icon: "🏢",
      color: "#3b82f6",
      valueUSD: 699.6,
      percentageOfTotal: 74.7,
      description: "The undisputed economic engine of Switzerland. High-value professional, financial, trading, scientific, health, and tourism activities dominating urban cantons such as Zurich, Geneva, Basel, and Zug.",
      keyDrivers: ["Private Wealth Management", "International Commodity Trading", "Corporate Headquarters", "High-End Tourism", "FinTech & IT"],
      notableEntities: ["UBS Group", "Zurich Insurance", "Swiss Re", "Glencore", "Trafigura", "Swisscom", "Kühne+Nagel", "SBB/CFF"],
      source: OFFICIAL_SOURCES.BFS_GDP,
      additionalNotes: "Represents 74.7% of GDP ($699.6B). Also includes knowledge-intensive Quaternary activities (IT/R&D) and Quinary governance.",
      children: [
        {
          id: "tertiary-real-estate-prof",
          name: "Real Estate, Professional & Scientific Services",
          shortName: "Real Estate & Professional",
          icon: "🔬",
          color: "#2563eb",
          valueUSD: 167.9,
          description: "High-end legal, architectural, scientific research, accounting, engineering, and commercial real estate management.",
          keyDrivers: ["Scientific R&D", "Engineering Consulting", "Legal & Auditing", "Commercial Real Estate"],
          notableEntities: ["SGS", "Adecco Group", "Swiss Prime Site", "PSP Swiss Property"],
          source: OFFICIAL_SOURCES.BFS_GDP,
          children: [
            {
              id: "tertiary-prof-scientific-rd",
              name: "Scientific R&D & Engineering Consulting",
              shortName: "R&D & Engineering",
              icon: "🧪",
              color: "#3b82f6",
              valueUSD: 62.1,
              description: "Applied research, biotechnology consulting, patent development, and precision engineering services.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Pharma research contractors", "Precision engineering patents"]
            },
            {
              id: "tertiary-prof-real-estate",
              name: "Real Estate Management & Development",
              shortName: "Real Estate",
              icon: "🏘️",
              color: "#60a5fa",
              valueUSD: 58.4,
              description: "Residential housing rentals, commercial building portfolios, and real estate funds.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Institutional pension real estate", "Urban development"]
            },
            {
              id: "tertiary-prof-legal-accounting",
              name: "Legal, Tax, Auditing & Management Consulting",
              shortName: "Legal & Consulting",
              icon: "⚖️",
              color: "#93c5fd",
              valueUSD: 47.4,
              description: "Corporate law, international tax consulting, fiduciary services, and strategy advisory.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Cross-border compliance", "Corporate reorganizations"]
            }
          ]
        },
        {
          id: "tertiary-transport-it-tourism",
          name: "Transport, IT, Education & Tourism",
          shortName: "Transport, IT & Tourism",
          icon: "💻",
          color: "#0284c7",
          valueUSD: 160.9,
          description: "A dynamic composite encompassing world-class public transportation, rapid tech hub expansion, prestigious universities, and iconic Alpine tourism.",
          keyDrivers: ["Alpine Hospitality", "Zurich Tech Hub", "Dense Rail Infrastructure", "Federal Institutes of Technology"],
          notableEntities: ["Google Zurich", "Swisscom", "SBB/CFF", "Swiss International Air Lines", "ETH Zurich", "EPFL"],
          source: OFFICIAL_SOURCES.BFS_GDP,
          children: [
            {
              id: "tertiary-tourism-hospitality",
              name: "Tourism, Hospitality & Gastronomy",
              shortName: "Tourism & Hotels",
              icon: "⛷️",
              color: "#0ea5e9",
              valueUSD: 51.5,
              description: "World-famous ski resorts (Zermatt, St. Moritz, Verbier), luxury Alpine hotels, and summer lake tourism.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Alpine ski tourism", "Luxury hotel gastronomy", "International congresses (WEF Davos)"]
            },
            {
              id: "tertiary-it-software",
              name: "IT, Software, Cloud & Telecom",
              shortName: "IT & Software",
              icon: "🌐",
              color: "#38bdf8",
              valueUSD: 45.1,
              description: "Global AI research centers in Zurich, financial software, cybersecurity, and telecommunication infrastructure.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Google largest engineering office outside US", "Crypto Valley Zug", "FinTech"]
            },
            {
              id: "tertiary-transport-logistics",
              name: "Transport, Aviation & Rail Logistics",
              shortName: "Transport & Logistics",
              icon: "🚆",
              color: "#7dd3fc",
              valueUSD: 40.2,
              description: "SBB rail network (busiest in Europe), Swiss Post, Zurich Airport, and international freight forwarding.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Gotthard Base Tunnel", "Freight forwarding (Kühne+Nagel)", "Zurich Airport hub"]
            },
            {
              id: "tertiary-education-academia",
              name: "Higher Education, Universities & Public Admin",
              shortName: "Education & Research",
              icon: "🎓",
              color: "#bae6fd",
              valueUSD: 24.1,
              description: "Federal institutes ETH Zurich and EPFL, cantonal universities, and federal administrative bodies.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Top-10 global academic institutions", "Applied research grants"]
            }
          ]
        },
        {
          id: "tertiary-trade-wholesale",
          name: "Wholesale, Retail & Global Commodity Trading",
          shortName: "Trade & Commodity",
          icon: "🚢",
          color: "#4f46e5",
          valueUSD: 153.9,
          description: "Massive international commodity merchant houses centered in Geneva, Zug, and Lugano, alongside powerful domestic retail cooperatives.",
          keyDrivers: ["Crude Oil & Energy Trading", "Metals & Minerals", "Agricultural Bulk Commodities", "Supermarket Duopoly"],
          notableEntities: ["Glencore", "Trafigura", "Vitol", "Gunvor", "Mercuria", "Migros", "Coop Switzerland"],
          source: OFFICIAL_SOURCES.BFS_GDP,
          children: [
            {
              id: "tertiary-commodity-trading",
              name: "Global Commodity Merchant Trading",
              shortName: "Commodity Trading",
              icon: "🛢️",
              color: "#6366f1",
              valueUSD: 84.6,
              description: "Switzerland trades approx. 20-25% of the world's physical oil, 60% of metals, and 50% of coffee/sugar via Geneva and Zug.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Geneva petroleum trade", "Zug mining trading desks", "Trade finance credit lines"]
            },
            {
              id: "tertiary-retail-trade",
              name: "Domestic Retail Trade & Department Stores",
              shortName: "Retail Trade",
              icon: "🛒",
              color: "#818cf8",
              valueUSD: 46.2,
              description: "Dominated by the consumer cooperatives Migros and Coop, alongside specialized electronics and luxury shopping.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Migros and Coop retail networks", "Luxury department stores (Manor, Globus)"]
            },
            {
              id: "tertiary-wholesale-b2b",
              name: "Wholesale Distribution & Capital Goods",
              shortName: "B2B Wholesale",
              icon: "📦",
              color: "#a5b4fc",
              valueUSD: 23.1,
              description: "Commercial distribution of industrial machinery, construction materials, and pharmaceutical supplies.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Industrial machinery supply", "Pharmacy logistics (Galenica)"]
            }
          ]
        },
        {
          id: "tertiary-financial-insurance",
          name: "Financial & Insurance Activities",
          shortName: "Finance & Insurance",
          icon: "🏦",
          color: "#1d4ed8",
          valueUSD: 129.4,
          description: "The historical cornerstone of Swiss international prestige: offshore wealth management, private banking, reinsurance, and pension funds.",
          keyDrivers: ["Private Wealth Management", "Global Reinsurance", "Cantonal Public Banks", "Financial Secrecy & Security"],
          notableEntities: ["UBS Group", "Zurich Insurance Group", "Swiss Re", "Swiss Life", "Pictet", "Lombard Odier", "Julius Bär"],
          source: OFFICIAL_SOURCES.BFS_GDP,
          children: [
            {
              id: "tertiary-wealth-private-banking",
              name: "Wealth Management & Private Banking",
              shortName: "Wealth Management",
              icon: "💼",
              color: "#2563eb",
              valueUSD: 62.1,
              description: "Switzerland manages over $2.4 Trillion in cross-border wealth, making it the #1 global destination for international assets.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Cross-border private banking", "Ultra-high-net-worth family offices", "UBS global wealth"]
            },
            {
              id: "tertiary-insurance-reinsurance",
              name: "Insurance & Global Reinsurance",
              shortName: "Insurance & Reinsurance",
              icon: "🛡️",
              color: "#3b82f6",
              valueUSD: 36.2,
              description: "Swiss Re is the world's second-largest reinsurer; Zurich Insurance and Swiss Life lead commercial and life underwriting.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Catastrophe reinsurance", "Corporate risk underwriting", "Life & pension policies"]
            },
            {
              id: "tertiary-cantonal-retail-banking",
              name: "Domestic & Cantonal Retail Banking",
              shortName: "Cantonal & Retail Banks",
              icon: "🏛️",
              color: "#60a5fa",
              valueUSD: 31.1,
              description: "24 Cantonal Banks (e.g., ZKB, BCV) and Raiffeisen cooperative banks providing mortgages and local business credit.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Swiss mortgage market", "Cantonal state guarantees", "SME business loans"]
            }
          ]
        },
        {
          id: "tertiary-health-social",
          name: "Health Care & Social Work",
          shortName: "Healthcare & Social",
          icon: "🏥",
          color: "#0891b2",
          valueUSD: 87.5,
          description: "One of the world's highest-spending healthcare systems per capita, combining universal health coverage, modern university clinics, and eldercare.",
          keyDrivers: ["Advanced University Hospitals", "Mandatory Health Insurance (KVG)", "Aging Demographics"],
          notableEntities: ["Hirslanden Group", "University Hospital Zurich (USZ)", "CHUV Lausanne", "Geneva University Hospitals (HUG)"],
          source: OFFICIAL_SOURCES.BFS_GDP,
          children: [
            {
              id: "tertiary-hospital-clinical",
              name: "Hospitals & Specialized Medical Centers",
              shortName: "Hospitals & Clinics",
              icon: "🩺",
              color: "#06b6d4",
              valueUSD: 49.9,
              description: "Five university hospitals, cantonal hospitals, and luxury private clinics offering cutting-edge surgical care.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["University medical research", "Private medical tourism"]
            },
            {
              id: "tertiary-eldercare-social",
              name: "Long-term Care, Eldercare & Social Services",
              shortName: "Eldercare & Social Services",
              icon: "🤝",
              color: "#22d3ee",
              valueUSD: 37.6,
              description: "Spitex home care, nursing homes (Altersheime), disability support, and social safety programs.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Swiss Spitex home care network", "Retirement community infrastructure"]
            }
          ]
        }
      ]
    },
    {
      id: "secondary",
      name: "Secondary Sector (Industry & Manufacturing)",
      shortName: "Industry & Mfg",
      icon: "⚙️",
      color: "#f59e0b",
      valueUSD: 231.3,
      percentageOfTotal: 24.7,
      description: "A global powerhouse of high-margin, specialized manufacturing. Rather than competing in low-cost mass production, Swiss industry leads in pharmaceuticals, precision robotics, MedTech, and luxury horology.",
      keyDrivers: ["Pharmaceutical Exports", "Precision Tooling", "Luxury Horology", "Alpine Tunneling & Construction", "Clean Hydropower"],
      notableEntities: ["Novartis", "Roche", "Lonza", "Rolex", "Swatch Group", "Richemont", "ABB", "Schindler", "Nestlé", "Axpo"],
      source: OFFICIAL_SOURCES.BFS_GDP,
      additionalNotes: "Represents 24.7% of GDP ($231.3B). Produces over 50% of all Swiss goods exports (specifically pharma and chemicals).",
      children: [
        {
          id: "secondary-manufacturing",
          name: "High-Tech & Precision Manufacturing",
          shortName: "Manufacturing",
          icon: "🏭",
          color: "#d97706",
          valueUSD: 168.8,
          description: "The core engine of Swiss goods production, heavily weighted toward chemical-pharmaceutical giants and micromechanical engineering.",
          keyDrivers: ["Biologics & Oncology drugs", "High-precision watch escapements", "Industrial robotics", "Gourmet chocolate processing"],
          notableEntities: ["Novartis", "Roche", "Rolex", "ABB", "Nestlé", "Lindt & Sprüngli", "Lonza"],
          source: OFFICIAL_SOURCES.OEC_SWISS,
          children: [
            {
              id: "secondary-pharma-chemicals",
              name: "Chemicals & Pharmaceuticals",
              shortName: "Pharma & Biotech",
              icon: "💊",
              color: "#b45309",
              valueUSD: 77.6,
              percentageOfParent: 46.0,
              description: "Switzerland's biggest goods export by far. Basel is Europe's life sciences capital, home to world leaders in oncology, immunology, custom biologics synthesis, and fine aromatic chemistry.",
              keyDrivers: ["Oncology therapeutics", "CDMO contract biologics (Lonza)", "Flavor & Fragrances (Givaudan, Firmenich)", "Clinical Diagnostics"],
              notableEntities: ["Novartis", "Roche", "Lonza Group", "Givaudan", "dsm-firmenich", "Bachem"],
              source: OFFICIAL_SOURCES.OEC_SWISS,
              children: [
                {
                  id: "pharma-therapeutics",
                  name: "Patented Therapeutics, Oncology & Biologics",
                  shortName: "Therapeutics & Biologics",
                  icon: "🧬",
                  color: "#92400e",
                  valueUSD: 49.7,
                  percentageOfParent: 64.0,
                  description: "Monoclonal antibodies, gene therapies, immunology treatments, targeted cancer therapies, and cardiovascular medicines developed by Roche and Novartis.",
                  keyDrivers: ["Oncology biologics", "Targeted gene therapies", "Immunology blockbuster patents"],
                  notableEntities: ["Roche", "Novartis"],
                  source: OFFICIAL_SOURCES.OEC_SWISS
                },
                {
                  id: "pharma-cdmo-synthesis",
                  name: "Contract Biopharma CDMO & Peptide Synthesis",
                  shortName: "CDMO & Synthesis",
                  icon: "⚗️",
                  color: "#b45309",
                  valueUSD: 17.1,
                  percentageOfParent: 22.0,
                  description: "Commercial biologics manufacturing, mammalian cell culturing, and peptide synthesis producing active pharmaceutical ingredients (APIs) for global pharma.",
                  keyDrivers: ["Lonza Ibex biomanufacturing", "Bachem peptide synthesis"],
                  notableEntities: ["Lonza Group", "Bachem", "Siegfried"],
                  source: OFFICIAL_SOURCES.OEC_SWISS
                },
                {
                  id: "pharma-fragrances-flavors",
                  name: "Flavors, Fragrances & Active Scent Chemistry",
                  shortName: "Flavors & Fragrances",
                  icon: "🧪",
                  color: "#d97706",
                  valueUSD: 6.2,
                  percentageOfParent: 8.0,
                  description: "Switzerland commands ~35% of the entire global market in perfumery scents, cosmetic molecules, and food flavoring compounds.",
                  keyDrivers: ["Givaudan scent innovation", "dsm-firmenich taste & wellness"],
                  notableEntities: ["Givaudan", "dsm-firmenich"],
                  source: OFFICIAL_SOURCES.OEC_SWISS
                },
                {
                  id: "pharma-otc-diagnostics",
                  name: "Diagnostics, In-Vitro Testing & OTC",
                  shortName: "Diagnostics & OTC",
                  icon: "🩸",
                  color: "#f59e0b",
                  valueUSD: 4.6,
                  percentageOfParent: 6.0,
                  description: "In-vitro automated blood analyzers, PCR molecular diagnostic systems (Roche Diagnostics), and consumer healthcare products.",
                  keyDrivers: ["Roche Diagnostics Rotkreuz center", "Automated clinical analyzers"],
                  notableEntities: ["Roche Diagnostics", "Galenica Consumer"],
                  source: OFFICIAL_SOURCES.OEC_SWISS
                }
              ]
            },
            {
              id: "secondary-precision-medtech",
              name: "Precision Instruments & MedTech",
              shortName: "Precision & MedTech",
              icon: "🔬",
              color: "#d97706",
              valueUSD: 32.1,
              percentageOfParent: 19.0,
              description: "High-precision micro-engineering applied to healthcare, photonics, and metrology. Switzerland has the world's highest concentration of medical technology density per capita.",
              keyDrivers: ["Dental Implantology", "Hearing Acoustic Systems", "Laser Optics & Geodesy", "Automated Pipetting Robots"],
              notableEntities: ["Straumann", "Sonova", "Leica Geosystems", "Tecan", "Ypsomed", "Medacta"],
              source: OFFICIAL_SOURCES.SWISS_MEDTECH,
              children: [
                {
                  id: "medtech-dental-implants",
                  name: "Dental Implants & Oral Prosthetics",
                  shortName: "Dental Implants",
                  icon: "🦷",
                  color: "#b45309",
                  valueUSD: 10.5,
                  percentageOfParent: 32.7,
                  description: "Switzerland is the world's #1 epicenter for titanium and ceramic dental implants, guided bone regeneration, and digital orthodontic scanning.",
                  keyDrivers: ["Straumann SLA dental surface patents", "Biocompatible zirconia implants"],
                  notableEntities: ["Straumann Group", "Thommen Medical", "Neoss"],
                  source: OFFICIAL_SOURCES.SWISS_MEDTECH
                },
                {
                  id: "medtech-hearing-neuro",
                  name: "Hearing Acoustic Systems & Neuro-Sensors",
                  shortName: "Hearing & Neuro",
                  icon: "🦻",
                  color: "#c2410c",
                  valueUSD: 9.8,
                  percentageOfParent: 30.5,
                  description: "Advanced digital hearing aids with embedded AI sound processing, cochlear implants, and automated diabetes insulin delivery pens.",
                  keyDrivers: ["Phonak Lumity sound processors", "Ypsomed UnoPen self-injection devices"],
                  notableEntities: ["Sonova Group (Phonak)", "Ypsomed", "Advanced Bionics"],
                  source: OFFICIAL_SOURCES.SWISS_MEDTECH
                },
                {
                  id: "medtech-optics-metrology",
                  name: "Laser Metrology, Geodesy & Micro-Optics",
                  shortName: "Laser Optics & Geodesy",
                  icon: "📐",
                  color: "#d97706",
                  valueUSD: 7.2,
                  percentageOfParent: 22.4,
                  description: "High-precision satellite surveying, 3D laser scanners for architecture/tunnels, and custom micro-optics for space exploration and semiconductor lithography.",
                  keyDrivers: ["Leica Geosystems total stations", "FISBA micro-laser modules"],
                  notableEntities: ["Leica Geosystems (Hexagon)", "FISBA", "Heptagon"],
                  source: OFFICIAL_SOURCES.SWISS_MEDTECH
                },
                {
                  id: "medtech-lab-robotics",
                  name: "Laboratory Robotics & Automated Liquid Handling",
                  shortName: "Lab Automation",
                  icon: "🤖",
                  color: "#ea580c",
                  valueUSD: 4.6,
                  percentageOfParent: 14.3,
                  description: "Precision robotic liquid handling workstations and automated plate readers powering biopharma drug discovery and genomic sequencing worldwide.",
                  keyDrivers: ["Tecan Fluent liquid handlers", "Hamilton automated robotics"],
                  notableEntities: ["Tecan Group", "Hamilton Bonaduz"],
                  source: OFFICIAL_SOURCES.SWISS_MEDTECH
                }
              ]
            },
            {
              id: "secondary-watchmaking",
              name: "Luxury Watchmaking & Horology",
              shortName: "Luxury Watches",
              icon: "⌚",
              color: "#f59e0b",
              valueUSD: 23.6,
              percentageOfParent: 14.0,
              description: "The crown of Swiss micromechanics. While Switzerland produces roughly 2% of the world's watches by quantity, it commands over 50% of the entire planet's watch value through prestigious mechanical timepieces.",
              keyDrivers: ["Swiss Made legal ordinance (60% value)", "Mechanical tourbillons & grand complications", "Watch Valley Arc (Geneva to Basel)", "Secondary market investment retention"],
              notableEntities: ["Rolex", "Patek Philippe", "Audemars Piguet", "Swatch Group", "Richemont", "Breitling"],
              source: OFFICIAL_SOURCES.FH_WATCH,
              children: [
                {
                  id: "watch-haute-horlogerie",
                  name: "Haute Horlogerie & Grand Mechanical Complications",
                  shortName: "Haute Horlogerie",
                  icon: "👑",
                  color: "#b45309",
                  valueUSD: 12.8,
                  percentageOfParent: 54.2,
                  description: "Independently owned pinnacle luxury houses hand-finishing mechanical masterpieces featuring tourbillons, perpetual calendars, and minute repeaters selling from $15,000 to over $1,000,000.",
                  keyDrivers: ["Rolex Daytona & Submariner demand", "Patek Philippe Nautilus & Grandmaster", "Audemars Piguet Royal Oak"],
                  notableEntities: ["Rolex", "Patek Philippe", "Audemars Piguet", "Vacheron Constantin"],
                  source: OFFICIAL_SOURCES.FH_WATCH
                },
                {
                  id: "watch-prestige-sports",
                  name: "Prestige Sports & Luxury Chronographs",
                  shortName: "Prestige Chronographs",
                  icon: "⏱️",
                  color: "#d97706",
                  valueUSD: 7.4,
                  percentageOfParent: 31.4,
                  description: "Globally iconic luxury chronographs, pilot watches, and ocean dive instruments produced by corporate luxury groups and historic manufactures.",
                  keyDrivers: ["Omega Speedmaster & Seamaster", "Cartier Santos", "IWC Pilot watches", "Breitling Navitimer"],
                  notableEntities: ["Omega (Swatch Group)", "Cartier (Richemont)", "IWC", "Breitling", "TAG Heuer"],
                  source: OFFICIAL_SOURCES.FH_WATCH
                },
                {
                  id: "watch-movements-components",
                  name: "Horological Movements, Escapements & Hairsprings",
                  shortName: "Movements & Escapements",
                  icon: "⚙️",
                  color: "#f59e0b",
                  valueUSD: 2.4,
                  percentageOfParent: 10.2,
                  description: "The mechanical heart of the global industry: Nivarox-FAR alloy balance springs, ETA & Sellita automatic calibers, synthetic sapphire crystals, and precision dials.",
                  keyDrivers: ["Nivarox-FAR silicon hairsprings", "Sellita caliber production"],
                  notableEntities: ["ETA SA", "Sellita Watch Co", "Nivarox-FAR"],
                  source: OFFICIAL_SOURCES.FH_WATCH
                },
                {
                  id: "watch-accessible-design",
                  name: "Accessible Swiss Design & Quartz Timepieces",
                  shortName: "Accessible & Quartz",
                  icon: "🎨",
                  color: "#fbbf24",
                  valueUSD: 1.0,
                  percentageOfParent: 4.2,
                  description: "Affordable Swiss Made timepieces, colorful quartz watches that saved the Swiss watch industry in the 1980s, and Swiss railway station design watches (Mondaine).",
                  keyDrivers: ["Swatch artistic collaborations", "Tissot PRX mechanical entry"],
                  notableEntities: ["Swatch", "Tissot", "Certina", "Mondaine"],
                  source: OFFICIAL_SOURCES.FH_WATCH
                }
              ]
            },
            {
              id: "secondary-machinery-electronics",
              name: "Machinery, Electrical Equipment & Robotics",
              shortName: "Machinery & Robotics",
              icon: "🤖",
              color: "#fbbf24",
              valueUSD: 21.9,
              percentageOfParent: 13.0,
              description: "High-value industrial capital goods, industrial automation robots, vertical urban mobility systems, and high-precision CNC multi-axis machining centers.",
              keyDrivers: ["Industrial Robotics", "Smart Elevators & Transit", "Global Food Grain Processing Plants", "Swiss-Type Lathes"],
              notableEntities: ["ABB", "Schindler Group", "Bühler Group", "Georg Fischer", "Stäubli", "Tornos"],
              source: OFFICIAL_SOURCES.SWISSMEM,
              children: [
                {
                  id: "machinery-industrial-robotics",
                  name: "Industrial Robotics, Power Automation & Switchgear",
                  shortName: "Robotics & Automation",
                  icon: "🦾",
                  color: "#b45309",
                  valueUSD: 8.5,
                  percentageOfParent: 38.8,
                  description: "High-speed articulated robots, electric vehicle high-power fast charging stations, variable frequency drives, and grid power transmission equipment.",
                  keyDrivers: ["ABB industrial robotics line", "Stäubli cleanroom fast robots", "High-voltage switchgear"],
                  notableEntities: ["ABB", "Stäubli", "Burckhardt Compression"],
                  source: OFFICIAL_SOURCES.SWISSMEM
                },
                {
                  id: "machinery-elevators-mobility",
                  name: "Elevators, Escalators & Vertical Mobility",
                  shortName: "Elevators & Transit",
                  icon: "🛗",
                  color: "#d97706",
                  valueUSD: 6.1,
                  percentageOfParent: 27.9,
                  description: "Schindler moves over 2 billion people every single day with cutting-edge destination-dispatch elevators, high-rise transit cabs, and moving walkways.",
                  keyDrivers: ["Schindler Ahead smart IoT elevators", "High-speed skyscraper hoist technology"],
                  notableEntities: ["Schindler Group"],
                  source: OFFICIAL_SOURCES.SWISSMEM
                },
                {
                  id: "machinery-food-processing-plants",
                  name: "Turnkey Grain, Food & Chocolate Industrial Plants",
                  shortName: "Food Processing Plants",
                  icon: "🌾",
                  color: "#f59e0b",
                  valueUSD: 4.3,
                  percentageOfParent: 19.6,
                  description: "Bühler turnkey manufacturing lines process approximately 65% of the world's grain harvest into flour, and 70% of the world's chocolate production.",
                  keyDrivers: ["Bühler industrial flour mills", "Chocolate conching & refining lines"],
                  notableEntities: ["Bühler Group", "SIG Group (aseptic carton packaging)"],
                  source: OFFICIAL_SOURCES.SWISSMEM
                },
                {
                  id: "machinery-precision-cnc",
                  name: "Ultra-Precision CNC Swiss Lathes & EDM Milling",
                  shortName: "CNC Swiss Lathes & EDM",
                  icon: "⚙️",
                  color: "#fbbf24",
                  valueUSD: 3.0,
                  percentageOfParent: 13.7,
                  description: "Micron-accurate electrical discharge machining (EDM), laser texturing, and sliding-headstock Swiss automatic screw lathes for watchmaking and aerospace.",
                  keyDrivers: ["GF Machining Solutions EDM wire cutting", "Tornos SwissNano micro-lathes"],
                  notableEntities: ["Georg Fischer (GF Machining)", "Tornos", "Mikron"],
                  source: OFFICIAL_SOURCES.SWISSMEM
                }
              ]
            },
            {
              id: "secondary-food-processing",
              name: "Food Processing & Confectionery",
              shortName: "Processed Food & Chocolate",
              icon: "🍫",
              color: "#fde68a",
              valueUSD: 13.6,
              percentageOfParent: 8.0,
              description: "The consumer goods pinnacle of Swiss industry: global coffee innovations, world-renowned alpine chocolate confectionery, specialized dairy derivatives, and herbal beverages.",
              keyDrivers: ["Nespresso Aluminum Capsule Innovation", "Conched Swiss Milk Chocolate", "Infant Clinical Nutrition", "Emmi Alpine Dairy Exports"],
              notableEntities: ["Nestlé", "Lindt & Sprüngli", "Barry Callebaut", "Emmi Group", "Läderach", "Ricola"],
              source: OFFICIAL_SOURCES.CHOCOSUISSE,
              children: [
                {
                  id: "food-packaged-coffee-nutrition",
                  name: "Global Packaged Coffee & Infant Clinical Nutrition",
                  shortName: "Coffee & Nutrition",
                  icon: "☕",
                  color: "#b45309",
                  valueUSD: 6.8,
                  percentageOfParent: 50.0,
                  description: "World headquarters of Nestlé in Vevey. Nespresso coffee capsule roasting and packaging in Romont/Avenches, clinical healthcare nutrition, and infant formulas.",
                  keyDrivers: ["Nespresso proprietary pod systems", "Nescafé soluble extraction", "Nestlé Health Science"],
                  notableEntities: ["Nestlé", "Nespresso"],
                  source: OFFICIAL_SOURCES.CHOCOSUISSE
                },
                {
                  id: "food-chocolate-cocoa",
                  name: "Premium Swiss Chocolate & Industrial Cocoa",
                  shortName: "Swiss Chocolate",
                  icon: "🍫",
                  color: "#d97706",
                  valueUSD: 3.9,
                  percentageOfParent: 28.7,
                  description: "Inventors of milk chocolate (Daniel Peter) and conching (Rodolphe Lindt). Zurich-based Barry Callebaut supplies cocoa to 1 out of every 4 chocolate products on earth.",
                  keyDrivers: ["Lindt Lindor truffles", "Barry Callebaut B2B couverture", "Läderach fresh chocolate"],
                  notableEntities: ["Lindt & Sprüngli", "Barry Callebaut", "Läderach", "Mondelez (Toblerone)"],
                  source: OFFICIAL_SOURCES.CHOCOSUISSE
                },
                {
                  id: "food-industrial-dairy-export",
                  name: "Industrial Alpine Dairy Processing & Whey Proteins",
                  shortName: "Industrial Dairy & Whey",
                  icon: "🥛",
                  color: "#f59e0b",
                  valueUSD: 2.2,
                  percentageOfParent: 16.2,
                  description: "Emmi's international export products (Caffè Latte, Swiss Fondue mixes, Kaltbach cave-aged cheese) and specialized infant milk powder synthesis.",
                  keyDrivers: ["Emmi Caffè Latte European expansion", "Hochdorf specialized milk powders"],
                  notableEntities: ["Emmi Group", "Hochdorf Holding"],
                  source: OFFICIAL_SOURCES.CHOCOSUISSE
                },
                {
                  id: "food-beverages-spirits",
                  name: "Specialized Herbal Beverages, Mineral Waters & Distillates",
                  shortName: "Herbal Drinks & Waters",
                  icon: "🥤",
                  color: "#fbbf24",
                  valueUSD: 0.7,
                  percentageOfParent: 5.1,
                  description: "Iconic Swiss domestic beverages such as Rivella (made with milk whey serum), Alpine spring mineral waters (Henniez, Valser), and Alpine herbal bitter distillates.",
                  keyDrivers: ["Rivella milk-serum soft drink", "Appenzeller Alpenbitter 42-herb secret recipe"],
                  notableEntities: ["Rivella AG", "Appenzeller Alpenbitter", "Valser (Coca-Cola HBC)"],
                  source: OFFICIAL_SOURCES.CHOCOSUISSE
                }
              ]
            }
          ]
        },
        {
          id: "secondary-construction",
          name: "Construction & Civil Infrastructure",
          shortName: "Construction",
          icon: "🏗️",
          color: "#ea580c",
          valueUSD: 40.5,
          description: "Driven by continuous infrastructure modernization, world-renowned Alpine tunnel engineering, and strict building standards.",
          keyDrivers: ["Alpine Tunneling", "High Energy-Efficiency Standards (Minergie)", "Commercial Office Expansions"],
          notableEntities: ["Implenia", "Holcim (LafargeHolcim)", "Sika Group", "Geberit"],
          source: OFFICIAL_SOURCES.BFS_GDP,
          children: [
            {
              id: "secondary-construction-building",
              name: "Residential & Commercial Building",
              shortName: "Building Construction",
              icon: "🏢",
              color: "#c2410c",
              valueUSD: 21.1,
              description: "Modern apartment buildings, low-energy Minergie homes, and commercial offices.",
              source: OFFICIAL_SOURCES.BFS_GDP
            },
            {
              id: "secondary-construction-specialized",
              name: "Specialized Trades (Plumbing, Electrical, Roofing)",
              shortName: "Specialized Trades",
              icon: "🪛",
              color: "#ea580c",
              valueUSD: 12.6,
              description: "Sanitary systems (Geberit), advanced building insulation (Sika), heat pump installations, and architectural carpentry.",
              source: OFFICIAL_SOURCES.BFS_GDP
            },
            {
              id: "secondary-construction-civil",
              name: "Civil Engineering & Alpine Infrastructure",
              shortName: "Civil Engineering",
              icon: "🌉",
              color: "#fb923c",
              valueUSD: 6.8,
              description: "Mountain bridges, avalanche protection barriers, rail tunnels, and highway maintenance.",
              source: OFFICIAL_SOURCES.BFS_GDP
            }
          ]
        },
        {
          id: "secondary-energy-utilities",
          name: "Energy, Water & Utilities",
          shortName: "Energy & Utilities",
          icon: "⚡",
          color: "#ca8a04",
          valueUSD: 22.0,
          description: "Switzerland produces nearly 100% low-carbon electricity, acting as the 'battery of Europe' with extensive Alpine pumped-storage hydropower.",
          keyDrivers: ["Alpine Hydropower Storage", "Nuclear Baseload", "European Grid Interconnection", "Water Quality"],
          notableEntities: ["Axpo Holding", "Alpiq", "BKW Energie", "Swissgrid"],
          source: OFFICIAL_SOURCES.BFS_GDP,
          children: [
            {
              id: "secondary-energy-hydro",
              name: "Hydroelectric Power Generation",
              shortName: "Hydropower",
              icon: "💧",
              color: "#a16207",
              valueUSD: 11.7,
              description: "Over 680 hydroelectric power stations, including massive gravity dams like Grande Dixence, producing ~58% of Swiss electricity.",
              source: OFFICIAL_SOURCES.BFS_GDP
            },
            {
              id: "secondary-energy-nuclear",
              name: "Nuclear Power Generation",
              shortName: "Nuclear Power",
              icon: "⚛️",
              color: "#ca8a04",
              valueUSD: 4.8,
              description: "Four commercial nuclear reactors (Beznau I & II, Gösgen, Leibstadt) providing ~32% of domestic electricity production.",
              source: OFFICIAL_SOURCES.BFS_GDP
            },
            {
              id: "secondary-energy-renewables",
              name: "Solar PV, Wind & Biomass",
              shortName: "Solar & Renewables",
              icon: "☀️",
              color: "#eab308",
              valueUSD: 2.6,
              description: "Fast-growing rooftop solar installations and district heating biomass plants supported by federal incentive programs.",
              source: OFFICIAL_SOURCES.BFS_GDP
            },
            {
              id: "secondary-energy-water-waste",
              name: "Water Supply, Sewage & Waste Management",
              shortName: "Water & Waste",
              icon: "🚰",
              color: "#facc15",
              valueUSD: 2.5,
              description: "World-class tap water filtration from Alpine springs and lakes, combined with advanced waste incineration plants.",
              source: OFFICIAL_SOURCES.BFS_GDP
            },
            {
              id: "secondary-energy-mining",
              name: "Quarrying, Salt & Aggregates",
              shortName: "Quarrying & Mining",
              icon: "⛏️",
              color: "#fef08a",
              valueUSD: 0.4,
              description: "Switzerland possesses no fossil fuels or metallic ores; mining is limited to Bex salt mines, gravel, limestone, and granite.",
              source: OFFICIAL_SOURCES.BFS_GDP
            }
          ]
        }
      ]
    },
    {
      id: "primary",
      name: "Primary Sector (Agriculture, Forestry & Fishing)",
      shortName: "Agriculture & Land",
      icon: "🌱",
      color: "#16a34a",
      valueUSD: 5.6,
      percentageOfTotal: 0.6,
      description: "A small fraction of total GDP, yet socially, culturally, and environmentally vital. Heavily protected and subsidized by the Swiss Confederation to guarantee food security, support family farms, and preserve iconic Alpine landscapes.",
      keyDrivers: ["Alpine Dairy Farming", "Direct Federal Farm Subsidies (Direktzahlungen)", "AOP/IGP Cheese Heritage", "Sustainable Forestry"],
      notableEntities: ["Swiss Milk Producers (SMP)", "IP-SUISSE", "Bio Suisse (Knospe)", "Forestry Switzerland (WaldSchweiz)"],
      source: OFFICIAL_SOURCES.BLW_AGRAR,
      additionalNotes: "Represents 0.6% of GDP ($5.6B). Over 50% of farm revenues derive from federal subsidies to keep Alpine terraces cultivated and prevent land abandonment.",
      children: [
        {
          id: "primary-agriculture",
          name: "Agriculture (Crop & Livestock)",
          shortName: "Crop & Livestock",
          icon: "🐄",
          color: "#15803d",
          valueUSD: 4.37,
          percentageOfParent: 78.0,
          description: "The core of the primary sector. Swiss agriculture focuses on premium grass-fed dairy cattle and livestock, with protected crop cultivation in valley floors.",
          keyDrivers: ["Grassland Feeding", "Bio Suisse Organic Certification", "Animal Welfare Standards", "Protected Denominations (AOP)"],
          notableEntities: ["Gruyère AOP Interprofession", "Emmentaler Switzerland", "Appenzeller Käse", "Fenaco Genossenschaft"],
          source: OFFICIAL_SOURCES.BLW_AGRAR,
          children: [
            {
              id: "agri-dairy",
              name: "Dairy Farming & Milk Production",
              shortName: "Dairy & Cheese",
              icon: "🧀",
              color: "#166534",
              valueUSD: 1.97,
              percentageOfParent: 45.1,
              description: "The crown jewel of Swiss agriculture. Over 500,000 dairy cows grazing Alpine meadows, producing ~3.4 million tons of milk annually, half of which is crafted into world-renowned cheeses.",
              keyDrivers: ["Gruyère AOP", "Emmentaler AOP", "Raclette du Valais", "Sbrinz", "Appenzeller", "Alpine grazing silage-free rules"],
              notableEntities: ["Emmi Group", "Fromarte", "Tilsiter Switzerland"],
              source: OFFICIAL_SOURCES.BLW_AGRAR,
              children: [
                {
                  id: "agri-dairy-cheese",
                  name: "AOP Artisanal Cheeses (Gruyère, Emmentaler)",
                  shortName: "AOP Cheeses",
                  icon: "🧀",
                  color: "#14532d",
                  valueUSD: 1.15,
                  percentageOfParent: 58.4,
                  description: "High-value export cheeses made according to strict artisanal AOP guidelines with unpasteurized raw mountain milk.",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                },
                {
                  id: "agri-dairy-fluid-milk",
                  name: "Fluid Milk & Pasture Drinking Milk",
                  shortName: "Drinking Milk",
                  icon: "🥛",
                  color: "#166534",
                  valueUSD: 0.52,
                  percentageOfParent: 26.4,
                  description: "Fresh pasteurized and UHT milk sold domestically through Migros, Coop, and local dairies.",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                },
                {
                  id: "agri-dairy-butter-cream",
                  name: "Butter, Cream & Yogurt Specialties",
                  shortName: "Butter & Yogurt",
                  icon: "🧈",
                  color: "#15803d",
                  valueUSD: 0.30,
                  percentageOfParent: 15.2,
                  description: "Swiss Alpine butter (Die Butter), double cream of Gruyère, and specialized yogurts.",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                }
              ]
            },
            {
              id: "agri-livestock-meat",
              name: "Cattle, Beef, Pork & Poultry",
              shortName: "Meat & Livestock",
              icon: "🥩",
              color: "#15803d",
              valueUSD: 1.22,
              percentageOfParent: 27.9,
              description: "High-welfare livestock production adhering to the world's strictest animal protection legislation. Domestic beef and pork supply over 80% of local consumption.",
              keyDrivers: ["Strict RAUS/BTS animal housing rules", "Pasture-raised Swiss beef", "Bündnerfleisch air-dried beef"],
              notableEntities: ["Micarna", "Bell Food Group", "ProViande"],
              source: OFFICIAL_SOURCES.BLW_AGRAR,
              children: [
                {
                  id: "agri-meat-beef",
                  name: "Swiss Beef & Veal (Natura-Beef)",
                  shortName: "Beef & Veal",
                  icon: "🐂",
                  color: "#166534",
                  valueUSD: 0.58,
                  percentageOfParent: 47.5,
                  description: "Suckler cow herds grazing on mountain pastures; high quality veal for Zürcher Geschnetzeltes.",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                },
                {
                  id: "agri-meat-pork",
                  name: "Pork & Charcuterie",
                  shortName: "Pork Production",
                  icon: "🐖",
                  color: "#15803d",
                  valueUSD: 0.41,
                  percentageOfParent: 33.6,
                  description: "High-welfare pig farming, air-dried hams, and traditional Swiss sausages.",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                },
                {
                  id: "agri-meat-poultry",
                  name: "Poultry & Organic Pasture Eggs",
                  shortName: "Poultry & Eggs",
                  icon: "🐔",
                  color: "#22c55e",
                  valueUSD: 0.23,
                  percentageOfParent: 18.9,
                  description: "Free-range chicken and egg production, with rapid growth in certified organic flocks.",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                }
              ]
            },
            {
              id: "agri-crops-cereals",
              name: "Cereal Crops, Sugar Beets & Potatoes",
              shortName: "Cereals & Crops",
              icon: "🌾",
              color: "#16a34a",
              valueUSD: 0.61,
              percentageOfParent: 14.0,
              description: "Arable farming concentrated on the Swiss Plateau (Mittelland). Main crops include bread wheat, malting barley, sugar beets, and potatoes.",
              keyDrivers: ["Swiss Sugar factories in Aarberg & Frauenfeld", "Bread grain self-sufficiency targets"],
              notableEntities: ["Swiss Granum", "Schweizer Zucker AG", "Fenaco"],
              source: OFFICIAL_SOURCES.BLW_AGRAR,
              children: [
                {
                  id: "agri-crops-wheat",
                  name: "Bread Wheat, Spelt & Fodder Grains",
                  shortName: "Wheat & Grains",
                  icon: "🌾",
                  color: "#15803d",
                  valueUSD: 0.28,
                  percentageOfParent: 45.9,
                  description: "High-protein Swiss baking wheat, traditional Dinkel (spelt), and animal feed grains.",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                },
                {
                  id: "agri-crops-sugar-beets",
                  name: "Sugar Beets & Industrial Crops",
                  shortName: "Sugar Beets & Oilseeds",
                  icon: "🌱",
                  color: "#16a34a",
                  valueUSD: 0.18,
                  percentageOfParent: 29.5,
                  description: "Supplying domestic sugar refining and Swiss rapeseed oil (Colza).",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                },
                {
                  id: "agri-crops-potatoes",
                  name: "Potatoes & Root Vegetables",
                  shortName: "Potatoes & Roots",
                  icon: "🥔",
                  color: "#4ade80",
                  valueUSD: 0.15,
                  percentageOfParent: 24.6,
                  description: "Specialized table potatoes and chipping potatoes for Swiss Rösti and snacks.",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                }
              ]
            },
            {
              id: "agri-viticulture-fruits",
              name: "Viticulture, Wine & Fruit Orchards",
              shortName: "Wine & Orchards",
              icon: "🍇",
              color: "#22c55e",
              valueUSD: 0.44,
              percentageOfParent: 10.1,
              description: "Steep terraced vineyards such as UNESCO Lavaux on Lake Geneva, Valais sun-drenched slopes, and Thurgau apple orchards. Less than 2% of Swiss wine is exported due to heavy domestic demand.",
              keyDrivers: ["Chasselas white wine", "Pinot Noir", "Lavaux UNESCO terraces", "Cider and Kirsch distilleries"],
              notableEntities: ["Swiss Wine Promotion", "Lavaux AOC Vintners", "Mosterei Möhl"],
              source: OFFICIAL_SOURCES.BLW_AGRAR,
              children: [
                {
                  id: "agri-wine-valais-vaud",
                  name: "Valais & Vaud Vineyard Terraces (Chasselas & Pinot)",
                  shortName: "Swiss Wine Regions",
                  icon: "🍷",
                  color: "#166534",
                  valueUSD: 0.29,
                  percentageOfParent: 65.9,
                  description: "High-end artisanal wines from Valais, Lavaux (Vaud), Geneva, and Ticino (Merlot).",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                },
                {
                  id: "agri-fruits-apples-cherries",
                  name: "Apples, Pears, Berries & Kirsch Cherries",
                  shortName: "Fruit Orchards",
                  icon: "🍎",
                  color: "#22c55e",
                  valueUSD: 0.15,
                  percentageOfParent: 34.1,
                  description: "Thurgau 'Mostindien' cider apples, Valais apricots, and Zuger Kirsch distillation cherries.",
                  source: OFFICIAL_SOURCES.BLW_AGRAR
                }
              ]
            },
            {
              id: "agri-horticulture-herbs",
              name: "Horticulture, Vegetables & Alpine Herbs",
              shortName: "Vegetables & Herbs",
              icon: "🌿",
              color: "#4ade80",
              valueUSD: 0.13,
              percentageOfParent: 2.9,
              description: "Greenhouse vegetables in the Seeland region, ornamental nurseries, and famous Alpine herbs grown for Ricola herbal lozenges.",
              keyDrivers: ["Ricola herbal blend cultivation in mountain valleys", "Seeland intensive vegetable farming"],
              notableEntities: ["Ricola AG", "Swiss Association of Vegetable Producers (VSGP)"],
              source: OFFICIAL_SOURCES.BLW_AGRAR
            }
          ]
        },
        {
          id: "primary-forestry",
          name: "Forestry & Timber Logging",
          shortName: "Forestry & Logging",
          icon: "🌲",
          color: "#059669",
          valueUSD: 1.15,
          percentageOfParent: 20.5,
          description: "Switzerland is approximately 32% covered in forest. Under the Swiss Federal Forest Act, forests must be managed sustainably to prevent soil erosion, absorb carbon, and shield Alpine valleys from avalanches.",
          keyDrivers: ["Avalanche Protection Forests (Schutzwald)", "Sustainable Harvest Limits", "Wood Pellet Heating", "Lumber Sawmills"],
          notableEntities: ["WaldSchweiz (Swiss Forest Owners)", "Federal Office for the Environment (FOEN)"],
          source: OFFICIAL_SOURCES.FOEN_FOREST,
          children: [
            {
              id: "forestry-sawn-timber",
              name: "Sawn Timber & Industrial Sawlogs (Spruce & Fir)",
              shortName: "Sawn Timber Logs",
              icon: "🪵",
              color: "#047857",
              valueUSD: 0.62,
              percentageOfParent: 53.9,
              description: "High-quality Norway spruce and silver fir logs harvested for building construction, roof trusses, and Swiss chalets.",
              source: OFFICIAL_SOURCES.FOEN_FOREST
            },
            {
              id: "forestry-energy-wood",
              name: "Energy Wood, Firewood & Wood Pellets",
              shortName: "Firewood & Pellets",
              icon: "🔥",
              color: "#059669",
              valueUSD: 0.41,
              percentageOfParent: 35.7,
              description: "Decentralized district heating chips and residential wood pellets replacing fossil heating oils in mountain communities.",
              source: OFFICIAL_SOURCES.FOEN_FOREST
            },
            {
              id: "forestry-protection-services",
              name: "Protective Forest Management & Biodiversity",
              shortName: "Protective Forest",
              icon: "🏔️",
              color: "#10b981",
              valueUSD: 0.12,
              percentageOfParent: 10.4,
              description: "Specialized forestry services to maintain mountain Schutzwald against rockfalls, landslides, and avalanches.",
              source: OFFICIAL_SOURCES.FOEN_FOREST
            }
          ]
        },
        {
          id: "primary-fishing",
          name: "Freshwater Fishing & Aquaculture",
          shortName: "Fishing & Aquaculture",
          icon: "🐟",
          color: "#0d9488",
          valueUSD: 0.08,
          percentageOfParent: 1.5,
          description: "Completely landlocked, Switzerland has no marine fisheries. Production is confined to commercial catch in deep perialpine lakes (Lake Geneva, Neuchâtel, Lucerne, Constance) and clean Alpine spring aquaculture.",
          keyDrivers: ["Lake Geneva Féra and Perch fillets", "Alpine spring trout aquaculture", "Ecological restocking programs"],
          notableEntities: ["Swiss Fish Breeders Association", "Cantonal Fishery Inspectorates"],
          source: OFFICIAL_SOURCES.FOEN_FOREST,
          children: [
            {
              id: "fishing-commercial-lakes",
              name: "Commercial Lake Catch (Perch, Féra, Char)",
              shortName: "Lake Commercial Catch",
              icon: "🎣",
              color: "#0f766e",
              valueUSD: 0.038,
              percentageOfParent: 47.5,
              description: "Artisanal gillnet fishing on Lake Geneva, Lake Neuchâtel, Lake Constance, producing prized filets de perche for lakeside restaurants.",
              source: OFFICIAL_SOURCES.FOEN_FOREST
            },
            {
              id: "fishing-aquaculture-trout",
              name: "Freshwater Aquaculture & Alpine Fish Farms",
              shortName: "Alpine Aquaculture",
              icon: "🐟",
              color: "#0d9488",
              valueUSD: 0.034,
              percentageOfParent: 42.5,
              description: "Modern recirculating aquaculture systems and raceways fed by pure Alpine spring water raising rainbow trout and Arctic char.",
              source: OFFICIAL_SOURCES.FOEN_FOREST
            },
            {
              id: "fishing-recreational-hatcheries",
              name: "River Restocking & Hatchery Management",
              shortName: "Hatcheries & Licenses",
              icon: "🚣",
              color: "#14b8a6",
              valueUSD: 0.008,
              percentageOfParent: 10.0,
              description: "Cantonal sportfishing permits and professional breeding stations for endangered lake trout and river grayling.",
              source: OFFICIAL_SOURCES.FOEN_FOREST
            }
          ]
        }
      ]
    }
  ]
}

// Helper functions for easy searching and tree traversal
export function findSectorById(id: string, node: SectorNode = SWISS_ECONOMY_TREE): SectorNode | null {
  if (node.id === id) return node
  if (node.children) {
    for (const child of node.children) {
      const found = findSectorById(id, child)
      if (found) return found
    }
  }
  return null
}

export function getAncestors(id: string, node: SectorNode = SWISS_ECONOMY_TREE, path: SectorNode[] = []): SectorNode[] | null {
  const currentPath = [...path, node]
  if (node.id === id) return currentPath
  if (node.children) {
    for (const child of node.children) {
      const found = getAncestors(id, child, currentPath)
      if (found) return found
    }
  }
  return null
}

export function searchSectors(query: string, node: SectorNode = SWISS_ECONOMY_TREE, results: SectorNode[] = []): SectorNode[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  
  const matches = (
    node.name.toLowerCase().includes(q) ||
    node.description.toLowerCase().includes(q) ||
    (node.keyDrivers && node.keyDrivers.some(k => k.toLowerCase().includes(q))) ||
    (node.notableEntities && node.notableEntities.some(e => e.toLowerCase().includes(q)))
  )
  
  if (matches && node.id !== "switzerland") {
    results.push(node)
  }
  
  if (node.children) {
    for (const child of node.children) {
      searchSectors(query, child, results)
    }
  }
  
  return results
}
