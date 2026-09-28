export type DataSourceTier = 'official_direct' | 'modeled_estimate'

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
  sourceTier?: DataSourceTier
  estimateMethodology?: string
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
              percentageOfParent: 37.0,
              description: "Applied research, biotechnology consulting, patent development, and precision engineering services.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Pharma research contractors", "Precision engineering patents"],
              children: [
                {
                  id: "rd-biotech-contract",
                  name: "Contract Preclinical R&D & Biotech Discovery",
                  shortName: "Biotech Discovery R&D",
                  icon: "🔬",
                  color: "#2563eb",
                  valueUSD: 33.4,
                  percentageOfParent: 53.8,
                  description: "Specialized clinical trials, molecular modeling, and genomics contract laboratories working alongside Basel and Zurich biotech clusters.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "rd-industrial-testing",
                  name: "Testing, Inspection & Certification (SGS Group)",
                  shortName: "Inspection & Testing",
                  icon: "📋",
                  color: "#3b82f6",
                  valueUSD: 16.2,
                  percentageOfParent: 26.1,
                  description: "Geneva-based SGS is the world's leading inspection, verification, and testing company for trade and manufacturing compliance.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "rd-engineering-patents",
                  name: "High-Tech Engineering & Intellectual Property",
                  shortName: "Engineering & Patents",
                  icon: "💡",
                  color: "#60a5fa",
                  valueUSD: 12.5,
                  percentageOfParent: 20.1,
                  description: "Switzerland files more European patent applications per capita than any other nation in the world.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-prof-real-estate",
              name: "Real Estate Management & Development",
              shortName: "Real Estate",
              icon: "🏘️",
              color: "#60a5fa",
              valueUSD: 58.4,
              percentageOfParent: 34.8,
              description: "Residential housing rentals, commercial building portfolios, and real estate funds.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Institutional pension real estate", "Urban development"],
              children: [
                {
                  id: "re-residential-portfolios",
                  name: "Institutional Pension Residential Portfolios",
                  shortName: "Pension Residential Funds",
                  icon: "🏢",
                  color: "#2563eb",
                  valueUSD: 34.2,
                  percentageOfParent: 58.6,
                  description: "Swiss pension funds and Swiss Prime Site managing apartment blocks across Zurich, Geneva, Lausanne, and Basel.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "re-commercial-parks",
                  name: "Prime Commercial Offices & Business Parks",
                  shortName: "Commercial Parks",
                  icon: "🏙️",
                  color: "#60a5fa",
                  valueUSD: 24.2,
                  percentageOfParent: 41.4,
                  description: "High-spec corporate offices, data center landleases, and logistics distribution hubs (PSP Swiss Property).",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-prof-legal-accounting",
              name: "Legal, Tax, Auditing & Management Consulting",
              shortName: "Legal & Consulting",
              icon: "⚖️",
              color: "#93c5fd",
              valueUSD: 47.4,
              percentageOfParent: 28.2,
              description: "Corporate law, international tax consulting, fiduciary services, and strategy advisory.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Cross-border compliance", "Corporate reorganizations"],
              children: [
                {
                  id: "prof-legal-fiduciary",
                  name: "Cross-Border Corporate Law & Swiss Fiduciary",
                  shortName: "Corporate Law & Fiduciary",
                  icon: "⚖️",
                  color: "#3b82f6",
                  valueUSD: 26.5,
                  percentageOfParent: 55.9,
                  description: "International corporate restructuring, commercial arbitration, and private fiduciary family governance.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "prof-big4-auditing",
                  name: "Big-4 Auditing, Tax Compliance & Advisory",
                  shortName: "Auditing & Tax",
                  icon: "📊",
                  color: "#93c5fd",
                  valueUSD: 20.9,
                  percentageOfParent: 44.1,
                  description: "Statutory audits, transfer pricing, and ESG compliance for Switzerland's multinational headquarters.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
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
              percentageOfParent: 32.0,
              description: "World-famous ski resorts (Zermatt, St. Moritz, Verbier), luxury Alpine hotels, and summer lake tourism.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Alpine ski tourism", "Luxury hotel gastronomy", "International congresses (WEF Davos)"],
              children: [
                {
                  id: "tour-alpine-skiing",
                  name: "Alpine Ski Resorts & Mountain Cableways",
                  shortName: "Alpine Ski Resorts",
                  icon: "⛷️",
                  color: "#0284c7",
                  valueUSD: 22.4,
                  percentageOfParent: 43.5,
                  description: "Iconic ski domains: Zermatt Matterhorn Glacier, St. Moritz Corviglia, Verbier 4 Valleys, and Jungfrau Top of Europe.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "tour-luxury-palace-hotels",
                  name: "5-Star Luxury Palace Hotels & Michelin Dining",
                  shortName: "Luxury Palace Hotels",
                  icon: "🏰",
                  color: "#0ea5e9",
                  valueUSD: 16.8,
                  percentageOfParent: 32.6,
                  description: "Legendary Swiss hospitality heritage: Badrutt's Palace, Gstaad Palace, Baur au Lac, and Beau-Rivage Palace Lausanne.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "tour-lakes-cultural",
                  name: "Lake Navigation, Summer Tourism & Art Basel",
                  shortName: "Lake & Cultural Tourism",
                  icon: "⛵",
                  color: "#38bdf8",
                  valueUSD: 12.3,
                  percentageOfParent: 23.9,
                  description: "Historic paddle steamers on Lake Geneva and Lake Lucerne, Art Basel, Montreux Jazz, and the Locarno Film Festival.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-it-software",
              name: "IT, Software, Cloud & Telecom",
              shortName: "IT & Software",
              icon: "🌐",
              color: "#38bdf8",
              valueUSD: 45.1,
              percentageOfParent: 28.0,
              description: "Global AI research centers in Zurich, financial software, cybersecurity, and telecommunication infrastructure.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Google largest engineering office outside US", "Crypto Valley Zug", "FinTech"],
              children: [
                {
                  id: "it-global-ai-campuses",
                  name: "Global Tech Hubs & AI R&D Campuses (Google Zurich)",
                  shortName: "Global AI & Tech Hubs",
                  icon: "🤖",
                  color: "#0284c7",
                  valueUSD: 18.2,
                  percentageOfParent: 40.4,
                  description: "Google's 5,000+ engineer Europaallee campus in Zurich, IBM Research Zurich (5 Nobel Prizes), and Microsoft Swiss Cloud.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "it-crypto-valley-fintech",
                  name: "Crypto Valley Zug & Core Banking Software",
                  shortName: "Crypto Valley & FinTech",
                  icon: "🪙",
                  color: "#0ea5e9",
                  valueUSD: 14.5,
                  percentageOfParent: 32.1,
                  description: "Zug's blockchain ecosystem (Ethereum Foundation, Solana, Cardano), alongside global banking software providers Temenos and Avaloq.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "it-swisscom-telecom-cloud",
                  name: "Swisscom Enterprise Cloud & Telecom Infrastructure",
                  shortName: "Swisscom & Sovereign Cloud",
                  icon: "📡",
                  color: "#7dd3fc",
                  valueUSD: 12.4,
                  percentageOfParent: 27.5,
                  description: "Fiber-optic 5G networks, data sovereign Swiss cloud storage, and secure enterprise defense systems.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-transport-logistics",
              name: "Transport, Aviation & Rail Logistics",
              shortName: "Transport & Logistics",
              icon: "🚆",
              color: "#7dd3fc",
              valueUSD: 40.2,
              percentageOfParent: 25.0,
              description: "SBB rail network (busiest in Europe), Swiss Post, Zurich Airport, and international freight forwarding.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Gotthard Base Tunnel", "Freight forwarding (Kühne+Nagel)", "Zurich Airport hub"],
              children: [
                {
                  id: "trans-sbb-railways",
                  name: "SBB/CFF/FFS Federal Railway Network",
                  shortName: "SBB Federal Rail",
                  icon: "🚆",
                  color: "#0284c7",
                  valueUSD: 19.2,
                  percentageOfParent: 47.8,
                  description: "Clock-face timetable (Taktfahrplan), 57km Gotthard Base Tunnel transit, and punctual urban S-Bahn rail networks.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "trans-aviation-airports",
                  name: "Swiss International Air Lines & Zurich Airport (ZRH)",
                  shortName: "Aviation & Airports",
                  icon: "✈️",
                  color: "#38bdf8",
                  valueUSD: 12.5,
                  percentageOfParent: 31.1,
                  description: "Switzerland's flagship air carrier SWISS (Lufthansa Group), Zurich Airport intercontinental hub, and Geneva Cointrin.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "trans-kuehne-nagel-freight",
                  name: "Global Freight Forwarding (Kühne+Nagel Schindellegi)",
                  shortName: "Global Freight Logistics",
                  icon: "🚢",
                  color: "#7dd3fc",
                  valueUSD: 8.5,
                  percentageOfParent: 21.1,
                  description: "Headquartered in Schindellegi/Schwyz, Kühne+Nagel is the world's #1 ocean freight and #1 air logistics forwarder.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-education-academia",
              name: "Higher Education, Universities & Public Admin",
              shortName: "Education & Research",
              icon: "🎓",
              color: "#bae6fd",
              valueUSD: 24.1,
              percentageOfParent: 15.0,
              description: "Federal institutes ETH Zurich and EPFL, cantonal universities, and federal administrative bodies.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Top-10 global academic institutions", "Applied research grants"],
              children: [
                {
                  id: "edu-eth-epfl-institutes",
                  name: "Federal Institutes of Technology (ETH Zurich & EPFL)",
                  shortName: "ETH Zurich & EPFL",
                  icon: "🏛️",
                  color: "#0284c7",
                  valueUSD: 14.8,
                  percentageOfParent: 61.4,
                  description: "Consistently ranked top-10 in the world for engineering and computer science; spinning off hundreds of deep-tech patents annually.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "edu-cantonal-cern",
                  name: "Cantonal Universities & CERN Collaborative Research",
                  shortName: "Universities & CERN",
                  icon: "🔬",
                  color: "#7dd3fc",
                  valueUSD: 9.3,
                  percentageOfParent: 38.6,
                  description: "Universities of Zurich, Geneva, Basel, Bern, and international particle physics research at CERN in Meyrin.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
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
              percentageOfParent: 55.0,
              description: "Switzerland trades approx. 20-25% of the world's physical oil, 60% of metals, and 50% of coffee/sugar via Geneva and Zug.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Geneva petroleum trade", "Zug mining trading desks", "Trade finance credit lines"],
              notableEntities: ["Glencore", "Trafigura", "Vitol", "Gunvor", "Mercuria"],
              children: [
                {
                  id: "comm-oil-energy",
                  name: "Physical Crude Oil & Refined Products Desks",
                  shortName: "Oil & Energy Trading",
                  icon: "🛢️",
                  color: "#4338ca",
                  valueUSD: 38.5,
                  percentageOfParent: 45.5,
                  description: "Geneva is the world's largest physical oil trading hub; Vitol, Trafigura, and Gunvor charter supertankers and trade millions of barrels daily.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "comm-metals-minerals",
                  name: "Copper, Cobalt, Zinc & Critical Battery Minerals",
                  shortName: "Metals & Minerals",
                  icon: "⛏️",
                  color: "#6366f1",
                  valueUSD: 31.2,
                  percentageOfParent: 36.9,
                  description: "Baar/Zug is the global headquarters of Glencore, leading global physical trading in copper cathode, zinc, cobalt, and nickel for the energy transition.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "comm-agri-softs",
                  name: "Agricultural Bulk Grains, Coffee & Cocoa Desks",
                  shortName: "Agri Soft Commodities",
                  icon: "☕",
                  color: "#818cf8",
                  valueUSD: 14.9,
                  percentageOfParent: 17.6,
                  description: "Global merchant desks for raw sugar, green coffee beans, and wheat bulk logistics centered in Geneva (Cargill, Louis Dreyfus, Sucafina).",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-retail-trade",
              name: "Domestic Retail Trade & Department Stores",
              shortName: "Retail Trade",
              icon: "🛒",
              color: "#818cf8",
              valueUSD: 46.2,
              percentageOfParent: 30.0,
              description: "Dominated by the consumer cooperatives Migros and Coop, alongside specialized electronics and luxury shopping.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Migros and Coop retail networks", "Luxury department stores (Manor, Globus)"],
              children: [
                {
                  id: "retail-migros-network",
                  name: "Migros Cooperative Supermarkets & Denner",
                  shortName: "Migros Federation",
                  icon: "🍊",
                  color: "#4f46e5",
                  valueUSD: 24.8,
                  percentageOfParent: 53.7,
                  description: "Switzerland's largest employer and retail cooperative, including Migros supermarkets, Denner discounters, and Migros Industrie production.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "retail-coop-network",
                  name: "Coop Group Supermarkets & Wholesale",
                  shortName: "Coop Group",
                  icon: "🛒",
                  color: "#6366f1",
                  valueUSD: 16.4,
                  percentageOfParent: 35.5,
                  description: "Coop Switzerland supermarkets, Coop Vitality pharmacies, Interdiscount electronics, and Transgourmet food service wholesale.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "retail-luxury-dept",
                  name: "Luxury Department Stores & High-Street Boutiques",
                  shortName: "Luxury Department Stores",
                  icon: "🛍️",
                  color: "#a5b4fc",
                  valueUSD: 5.0,
                  percentageOfParent: 10.8,
                  description: "High-end retail on Zurich Bahnhofstrasse, Geneva Rue du Rhône, Manor department stores, and Globus luxury food halls.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-wholesale-b2b",
              name: "Wholesale Distribution & Capital Goods",
              shortName: "B2B Wholesale",
              icon: "📦",
              color: "#a5b4fc",
              valueUSD: 23.1,
              percentageOfParent: 15.0,
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
              percentageOfParent: 48.0,
              description: "Switzerland manages over $2.4 Trillion in cross-border wealth, making it the #1 global destination for international assets.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Cross-border private banking", "Ultra-high-net-worth family offices", "UBS global wealth"],
              children: [
                {
                  id: "wealth-ubs-global",
                  name: "UBS Global Wealth Management",
                  shortName: "UBS Global Wealth",
                  icon: "🏦",
                  color: "#1e40af",
                  valueUSD: 38.2,
                  percentageOfParent: 61.5,
                  description: "Following the integration of Credit Suisse, UBS is the undisputed titan of global wealth management, overseeing trillions in client assets across Switzerland, Europe, Asia, and the Americas.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "wealth-geneva-private",
                  name: "Geneva Private Banking Dynasties (Pictet, Lombard Odier)",
                  shortName: "Geneva Private Banks",
                  icon: "🏛️",
                  color: "#2563eb",
                  valueUSD: 14.5,
                  percentageOfParent: 23.3,
                  description: "Century-old private banking partnerships founded in the 18th and 19th centuries, specializing in institutional asset management and multi-generational family estates.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "wealth-boutique-zurich",
                  name: "Zurich Boutique Wealth Managers (Julius Bär, Vontobel)",
                  shortName: "Zurich Private Boutiques",
                  icon: "💼",
                  color: "#3b82f6",
                  valueUSD: 9.4,
                  percentageOfParent: 15.2,
                  description: "Pure-play private banks offering bespoke discretionary mandates, structured investment solutions, and Swiss trust structuring.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-insurance-reinsurance",
              name: "Insurance & Global Reinsurance",
              shortName: "Insurance & Reinsurance",
              icon: "🛡️",
              color: "#3b82f6",
              valueUSD: 36.2,
              percentageOfParent: 28.0,
              description: "Swiss Re is the world's second-largest reinsurer; Zurich Insurance and Swiss Life lead commercial and life underwriting.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Catastrophe reinsurance", "Corporate risk underwriting", "Life & pension policies"],
              children: [
                {
                  id: "ins-swiss-re-cat",
                  name: "Swiss Re Catastrophe & Life Reinsurance",
                  shortName: "Swiss Re Global",
                  icon: "🌪️",
                  color: "#1e3a8a",
                  valueUSD: 18.5,
                  percentageOfParent: 51.1,
                  description: "Global risk capital underwriting hurricanes, earthquakes, cyber threats, and life reinsurance policies from its Zurich headquarters.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "ins-zurich-commercial",
                  name: "Zurich Insurance Corporate & Commercial Risk",
                  shortName: "Zurich Commercial",
                  icon: "🏢",
                  color: "#1d4ed8",
                  valueUSD: 11.8,
                  percentageOfParent: 32.6,
                  description: "Multi-line insurance giant protecting Fortune 500 corporations, maritime freight, and international commercial liability.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "ins-swiss-life-pensions",
                  name: "Swiss Life Comprehensive Pension Solutions",
                  shortName: "Swiss Life Pensions",
                  icon: "📜",
                  color: "#3b82f6",
                  valueUSD: 5.9,
                  percentageOfParent: 16.3,
                  description: "The leading provider of Swiss second-pillar corporate pension (BVG) plans, life insurance policies, and institutional real estate assets.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-cantonal-retail-banking",
              name: "Domestic & Cantonal Retail Banking",
              shortName: "Cantonal & Retail Banks",
              icon: "🏛️",
              color: "#60a5fa",
              valueUSD: 31.1,
              percentageOfParent: 24.0,
              description: "24 Cantonal Banks (e.g., ZKB, BCV) and Raiffeisen cooperative banks providing mortgages and local business credit.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Swiss mortgage market", "Cantonal state guarantees", "SME business loans"],
              children: [
                {
                  id: "bank-cantonal-zkb",
                  name: "Cantonal Banks with State Guarantees (ZKB, BCV)",
                  shortName: "Cantonal Banks",
                  icon: "🏛️",
                  color: "#2563eb",
                  valueUSD: 17.5,
                  percentageOfParent: 56.3,
                  description: "Semi-public institutions like Zürcher Kantonalbank (ZKB) backed by cantonal government guarantees, financing Swiss residential homeownership.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "bank-raiffeisen-coop",
                  name: "Raiffeisen Switzerland Cooperative Banks",
                  shortName: "Raiffeisen Switzerland",
                  icon: "🤝",
                  color: "#3b82f6",
                  valueUSD: 9.8,
                  percentageOfParent: 31.5,
                  description: "The third-largest banking group in Switzerland, formed of independent local cooperative banks deeply rooted in Swiss municipalities.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "bank-postfinance-retail",
                  name: "PostFinance & Consumer Payment Accounts",
                  shortName: "PostFinance",
                  icon: "💳",
                  color: "#60a5fa",
                  valueUSD: 3.8,
                  percentageOfParent: 12.2,
                  description: "Financial arm of Swiss Post handling universal everyday transactional payments and Twint digital peer-to-peer transfers.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
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
              percentageOfParent: 57.0,
              description: "Five university hospitals, cantonal hospitals, and luxury private clinics offering cutting-edge surgical care.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["University medical research", "Private medical tourism"],
              children: [
                {
                  id: "hosp-university-centers",
                  name: "University Hospitals (USZ, CHUV, HUG, Inselspital)",
                  shortName: "University Hospitals",
                  icon: "🏥",
                  color: "#0891b2",
                  valueUSD: 29.5,
                  percentageOfParent: 59.1,
                  description: "Switzerland's five academic medical centers in Zurich, Lausanne, Geneva, Bern, and Basel conducting clinical trials and tertiary care.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "hosp-private-clinics",
                  name: "Private Specialty Clinics (Hirslanden, Swiss Medical)",
                  shortName: "Private Surgical Clinics",
                  icon: "🏨",
                  color: "#06b6d4",
                  valueUSD: 20.4,
                  percentageOfParent: 40.9,
                  description: "High-end private medical networks attracting international medical tourism for neurosurgery, orthopedics, and cardiovascular surgery.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "tertiary-eldercare-social",
              name: "Long-term Care, Eldercare & Social Services",
              shortName: "Eldercare & Social Services",
              icon: "🤝",
              color: "#22d3ee",
              valueUSD: 37.6,
              percentageOfParent: 43.0,
              description: "Spitex home care, nursing homes (Altersheime), disability support, and social safety programs.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              keyDrivers: ["Swiss Spitex home care network", "Retirement community infrastructure"],
              children: [
                {
                  id: "elder-spitex-home",
                  name: "Spitex Non-Profit Home Nursing Network",
                  shortName: "Spitex Home Nursing",
                  icon: "🏠",
                  color: "#0891b2",
                  valueUSD: 19.8,
                  percentageOfParent: 52.7,
                  description: "Public mandate home nursing, outpatient medical treatments, and daily living assistance enabling elderly citizens to remain at home.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "elder-care-homes",
                  name: "Altersheime & Specialized Nursing Residences",
                  shortName: "Altersheime Nursing Homes",
                  icon: "🧓",
                  color: "#22d3ee",
                  valueUSD: 17.8,
                  percentageOfParent: 47.3,
                  description: "Cantonal residential retirement communities providing full-time geriatric memory care, palliative care, and assisted living.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
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
                  notableEntities: ["ABB", "Stäubli", "Hitachi Energy (former ABB Power Grids)"],
                  source: OFFICIAL_SOURCES.SWISSMEM,
                  children: [
                    {
                      id: "robotics-articulated-arms",
                      name: "Articulated Industrial Robots & Cleanroom Manipulators",
                      shortName: "Articulated & Cleanroom Robots",
                      icon: "🦾",
                      color: "#92400e",
                      valueUSD: 3.6,
                      percentageOfParent: 42.4,
                      description: "High-precision 6-axis SCARA and delta pick-and-place robots engineered by ABB Robotics and Stäubli International for sterile pharma and semiconductor cleanrooms.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    },
                    {
                      id: "robotics-hvdc-switchgear",
                      name: "Power Grid Automation, HVDC & Gas-Insulated Switchgear",
                      shortName: "Grid Automation & HVDC",
                      icon: "⚡",
                      color: "#b45309",
                      valueUSD: 3.1,
                      percentageOfParent: 36.5,
                      description: "Pioneered in Baden by ABB and Hitachi Energy: HVDC transmission converters enabling cross-border renewable electricity interconnects and compact GIS substations.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    },
                    {
                      id: "robotics-variable-drives",
                      name: "Industrial Variable Frequency Drives & Traction Converters",
                      shortName: "Drives & Traction Power",
                      icon: "🔌",
                      color: "#d97706",
                      valueUSD: 1.8,
                      percentageOfParent: 21.1,
                      description: "Heavy-duty electric traction power converters powering high-speed trainsets (Stadler Rail) and energy-saving industrial motor controllers.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    }
                  ]
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
                  source: OFFICIAL_SOURCES.SWISSMEM,
                  children: [
                    {
                      id: "elev-skyscraper-destination",
                      name: "High-Rise Skyscraper Hoists & PORT Destination Dispatch",
                      shortName: "Skyscraper Hoists & PORT AI",
                      icon: "🏙️",
                      color: "#b45309",
                      valueUSD: 2.8,
                      percentageOfParent: 45.9,
                      description: "Schindler PORT technology uses AI traffic prediction to group passengers and route double-deck high-speed elevator cabs in the world's tallest towers.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    },
                    {
                      id: "elev-commercial-mrl",
                      name: "Mid-Rise Commercial & Residential Eco-Traction Elevators",
                      shortName: "Commercial Eco-Elevators",
                      icon: "🛗",
                      color: "#d97706",
                      valueUSD: 2.2,
                      percentageOfParent: 36.1,
                      description: "Gearless machine-room-less (MRL) passenger elevators (Schindler 3000/5000) equipped with regenerative drives feeding electricity back into building circuits.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    },
                    {
                      id: "elev-airport-walkways",
                      name: "Heavy-Duty Airport Transit Escalators & Moving Walkways",
                      shortName: "Heavy-Transit Escalators",
                      icon: "🚶",
                      color: "#f59e0b",
                      valueUSD: 1.1,
                      percentageOfParent: 18.0,
                      description: "Extreme heavy-duty public transit moving walkways and escalators designed for 24/7 continuous operation in international rail and airport hubs.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    }
                  ]
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
                  source: OFFICIAL_SOURCES.SWISSMEM,
                  children: [
                    {
                      id: "foodplant-buhler-grain",
                      name: "Turnkey Industrial Flour Mills & Optical Grain Sorters",
                      shortName: "Flour Mills & Grain Sorters",
                      icon: "🌾",
                      color: "#b45309",
                      valueUSD: 2.1,
                      percentageOfParent: 48.8,
                      description: "Uzwil-based Bühler Group's industrial roller mills and SORTEX optical camera sorting systems processing wheat, rice, corn, and pulses worldwide.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    },
                    {
                      id: "foodplant-chocolate-refining",
                      name: "Industrial Cocoa Roasting, Five-Roll Refiners & Conches",
                      shortName: "Chocolate Refiners & Conches",
                      icon: "🍫",
                      color: "#d97706",
                      valueUSD: 1.4,
                      percentageOfParent: 32.6,
                      description: "Bühler continuous conching machines and micro-grinding five-roll refiners producing over 70% of the planet's industrial chocolate couverture.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    },
                    {
                      id: "foodplant-sig-aseptic-filling",
                      name: "Aseptic Carton Packaging & High-Speed Liquid Filling",
                      shortName: "SIG Aseptic Packaging",
                      icon: "🧃",
                      color: "#f59e0b",
                      valueUSD: 0.8,
                      percentageOfParent: 18.6,
                      description: "SIG Group (Neuhausen am Rheinfall) automated aseptic filling lines packaging shelf-stable milks, juices, and liquid foods at up to 24,000 packs/hour.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    }
                  ]
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
                  source: OFFICIAL_SOURCES.SWISSMEM,
                  children: [
                    {
                      id: "cnc-tornos-swiss-lathes",
                      name: "Sliding-Headstock Swiss-Type Automatic Micro-Lathes",
                      shortName: "Tornos Swiss-Type Lathes",
                      icon: "⚙️",
                      color: "#b45309",
                      valueUSD: 1.3,
                      percentageOfParent: 43.3,
                      description: "Moutier-based Tornos invented the sliding-headstock lathe, turning miniature watch pinion gears, bone screws, and dental implant abutments with micron precision.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    },
                    {
                      id: "cnc-gf-wire-edm",
                      name: "Electrical Discharge Machining (EDM Wire & Die-Sinking)",
                      shortName: "GF Wire & Die-Sinking EDM",
                      icon: "⚡",
                      color: "#d97706",
                      valueUSD: 1.1,
                      percentageOfParent: 36.7,
                      description: "GF Machining Solutions (AgieCharmilles) spark erosion machines capable of cutting hardened aerospace alloys, turbine blades, and watch molds with 0.1 µm finish.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    },
                    {
                      id: "cnc-mikron-rotary-transfer",
                      name: "Multi-Spindle Rotary Transfer & 5-Axis Milling Centers",
                      shortName: "Mikron Rotary Transfer",
                      icon: "🔄",
                      color: "#fbbf24",
                      valueUSD: 0.6,
                      percentageOfParent: 20.0,
                      description: "Mikron Group (Ticino) ultra-fast rotary transfer machining systems delivering millions of precision parts for automotive ballpoint pens and injector nozzles.",
                      source: OFFICIAL_SOURCES.SWISSMEM
                    }
                  ]
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
              percentageOfParent: 52.1,
              description: "Modern apartment buildings, low-energy Minergie homes, and commercial offices.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              children: [
                {
                  id: "bldg-minergie-residential",
                  name: "Minergie Ultra-Low Energy Residential Housing",
                  shortName: "Minergie Eco-Housing",
                  icon: "🏡",
                  color: "#ea580c",
                  valueUSD: 11.8,
                  percentageOfParent: 55.9,
                  description: "High-insulation certified Minergie-P/A residential homes with integrated photovoltaic roofs and geothermal heat pumps.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "bldg-commercial-hqs",
                  name: "Life Science Campuses & Corporate Headquarters",
                  shortName: "Corporate Campuses",
                  icon: "🏙️",
                  color: "#c2410c",
                  valueUSD: 6.4,
                  percentageOfParent: 30.3,
                  description: "Modern high-rise commercial structures such as Roche Building 1 & 2 in Basel and the Novartis Pharma Campus.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "bldg-alpine-chalets",
                  name: "Alpine Timber Chalets & Mountain Architecture",
                  shortName: "Alpine Timber Chalets",
                  icon: "🪵",
                  color: "#fb923c",
                  valueUSD: 2.9,
                  percentageOfParent: 13.8,
                  description: "Custom Swiss larch and pine architectural chalets in luxury resorts like Zermatt, Verbier, and Crans-Montana.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "secondary-construction-specialized",
              name: "Specialized Trades (Plumbing, Electrical, Roofing)",
              shortName: "Specialized Trades",
              icon: "🪛",
              color: "#ea580c",
              valueUSD: 12.6,
              percentageOfParent: 31.1,
              description: "Sanitary systems (Geberit), advanced building insulation (Sika), heat pump installations, and architectural carpentry.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              children: [
                {
                  id: "spec-geberit-sanitary",
                  name: "Sanitary Engineering & Concealed Cisterns (Geberit)",
                  shortName: "Geberit Sanitary",
                  icon: "🚾",
                  color: "#c2410c",
                  valueUSD: 5.6,
                  percentageOfParent: 44.4,
                  description: "Rapperswil-Jona based Geberit is Europe's market leader in sanitary technology, acoustic drainpipes, and automated washlet systems.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "spec-sika-chemicals",
                  name: "Specialty Sealants, Waterproofing & Adhesives (Sika)",
                  shortName: "Sika Construction Chemicals",
                  icon: "🧪",
                  color: "#ea580c",
                  valueUSD: 4.8,
                  percentageOfParent: 38.1,
                  description: "Baar-based Sika Group engineers concrete admixtures, tunnel waterproofing membranes, and acoustic damping polymers.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "spec-heatpumps-electrical",
                  name: "Geothermal Heat Pumps & Smart Grid Wiring",
                  shortName: "Heat Pumps & Smart Wiring",
                  icon: "⚡",
                  color: "#fb923c",
                  valueUSD: 2.2,
                  percentageOfParent: 17.5,
                  description: "Energy renovation trades phasing out oil boilers for ground-source geothermal probes and smart home battery banks.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "secondary-construction-civil",
              name: "Civil Engineering & Alpine Infrastructure",
              shortName: "Civil Engineering",
              icon: "🌉",
              color: "#fb923c",
              valueUSD: 6.8,
              percentageOfParent: 16.8,
              description: "Mountain bridges, avalanche protection barriers, rail tunnels, and highway maintenance.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              children: [
                {
                  id: "civil-alpine-tunnels",
                  name: "Alpine Transversal Rail & Road Tunnels (Gotthard)",
                  shortName: "Gotthard & Rail Tunnels",
                  icon: "🚇",
                  color: "#c2410c",
                  valueUSD: 3.6,
                  percentageOfParent: 52.9,
                  description: "Continuous tunnel engineering including the 57km Gotthard Base Tunnel, Ceneri Base Tunnel, and second Gotthard road tube excavation.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "civil-alpine-bridges",
                  name: "Mountain Viaducts, Bridges & Pass Highways",
                  shortName: "Alpine Bridges & Passes",
                  icon: "🌉",
                  color: "#ea580c",
                  valueUSD: 1.9,
                  percentageOfParent: 27.9,
                  description: "Prestressed concrete viaducts and curved mountain railway bridges for the Rhaetian Railway and federal motorways (A2/A13).",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "civil-avalanche-defenses",
                  name: "Avalanche Galleries, Snow Sheds & Rockfall Barriers",
                  shortName: "Avalanche Protection",
                  icon: "🏔️",
                  color: "#fb923c",
                  valueUSD: 1.3,
                  percentageOfParent: 19.2,
                  description: "Reinforced concrete snowshed galleries and high-tensile steel rockfall catch nets shielding Alpine transit corridors.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
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
              percentageOfParent: 53.2,
              description: "Over 680 hydroelectric power stations, including massive gravity dams like Grande Dixence, producing ~58% of Swiss electricity.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              children: [
                {
                  id: "hydro-gravity-dams",
                  name: "Alpine Storage Gravity Dams (Grande Dixence, Mauvoisin)",
                  shortName: "Alpine Gravity Dams",
                  icon: "🏔️",
                  color: "#854d0e",
                  valueUSD: 6.8,
                  percentageOfParent: 58.1,
                  description: "Grande Dixence in Valais is the world's highest gravity dam (285m), storing summer glacial runoff for winter power.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "hydro-pumped-storage",
                  name: "Giant Pumped-Storage Battery Plants (Nant de Drance)",
                  shortName: "Pumped Storage Battery",
                  icon: "🔄",
                  color: "#a16207",
                  valueUSD: 3.2,
                  percentageOfParent: 27.4,
                  description: "Underground cavern pumped-storage stations (Nant de Drance, Linth-Limmern) acting as Europe's green grid stabilizer.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "hydro-run-river",
                  name: "Run-of-River Hydroelectric Stations on Rhine & Aare",
                  shortName: "Run-of-River Plants",
                  icon: "🌊",
                  color: "#ca8a04",
                  valueUSD: 1.7,
                  percentageOfParent: 14.5,
                  description: "Continuous low-head turbine generation along major Swiss river flows supplying base industrial electricity.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "secondary-energy-nuclear",
              name: "Nuclear Power Generation",
              shortName: "Nuclear Power",
              icon: "⚛️",
              color: "#ca8a04",
              valueUSD: 4.8,
              percentageOfParent: 21.8,
              description: "Four commercial nuclear reactors (Beznau I & II, Gösgen, Leibstadt) providing ~32% of domestic electricity production.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              children: [
                {
                  id: "nuc-goesgen",
                  name: "Gösgen Pressurized Water Reactor (KKG)",
                  shortName: "Gösgen Reactor",
                  icon: "⚛️",
                  color: "#a16207",
                  valueUSD: 2.1,
                  percentageOfParent: 43.8,
                  description: "High-capacity 1060 MW PWR generating over 8 billion kWh of low-carbon electricity annually with district heat export.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "nuc-leibstadt",
                  name: "Leibstadt Boiling Water Reactor (KKL)",
                  shortName: "Leibstadt Reactor",
                  icon: "⚛️",
                  color: "#ca8a04",
                  valueUSD: 1.8,
                  percentageOfParent: 37.5,
                  description: "Switzerland's largest nuclear generator (1275 MW) situated on the Rhine, delivering continuous baseload power.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "nuc-beznau",
                  name: "Beznau I & II Baseload Reactors (Axpo)",
                  shortName: "Beznau I & II",
                  icon: "⚛️",
                  color: "#eab308",
                  valueUSD: 0.9,
                  percentageOfParent: 18.7,
                  description: "Two twin units in Aargau operating under stringent Swiss Federal Nuclear Safety Inspectorate (ENSI) supervision.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "secondary-energy-renewables",
              name: "Solar PV, Wind & Biomass",
              shortName: "Solar & Renewables",
              icon: "☀️",
              color: "#eab308",
              valueUSD: 2.6,
              percentageOfParent: 11.8,
              description: "Fast-growing rooftop solar installations and district heating biomass plants supported by federal incentive programs.",
              source: OFFICIAL_SOURCES.BFS_GDP,
              children: [
                {
                  id: "renew-solar-pv",
                  name: "Alpine & Rooftop Solar Photovoltaic Installations",
                  shortName: "Solar Photovoltaics",
                  icon: "☀️",
                  color: "#ca8a04",
                  valueUSD: 1.8,
                  percentageOfParent: 69.2,
                  description: "High-altitude solar installations on mountain dams (e.g. Muttsee) producing 50% more winter solar energy than lowland panels.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                },
                {
                  id: "renew-district-biomass",
                  name: "Wood-Chip Biomass & District Thermal Networks",
                  shortName: "Biomass & District Heat",
                  icon: "🪵",
                  color: "#eab308",
                  valueUSD: 0.8,
                  percentageOfParent: 30.8,
                  description: "Regional heating grids fueled by Swiss forest residuals replacing imported fossil heating fuel.",
                  source: OFFICIAL_SOURCES.BFS_GDP
                }
              ]
            },
            {
              id: "secondary-energy-water-waste",
              name: "Water Supply, Sewage & Waste Management",
              shortName: "Water & Waste",
              icon: "🚰",
              color: "#facc15",
              valueUSD: 2.5,
              percentageOfParent: 11.4,
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
              percentageOfParent: 1.8,
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
                  source: OFFICIAL_SOURCES.BLW_AGRAR,
                  children: [
                    {
                      id: "cheese-gruyere-aop",
                      name: "Le Gruyère AOP (Fribourg & Vaud)",
                      shortName: "Le Gruyère AOP",
                      icon: "🧀",
                      color: "#14532d",
                      valueUSD: 0.58,
                      percentageOfParent: 50.4,
                      description: "Switzerland's #1 cheese by volume and export value; aged 6 to 24 months in humid cellars, central to Swiss fondue.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    },
                    {
                      id: "cheese-emmentaler-aop",
                      name: "Emmentaler AOP (Valley of the Emme)",
                      shortName: "Emmentaler AOP",
                      icon: "🧀",
                      color: "#166534",
                      valueUSD: 0.28,
                      percentageOfParent: 24.3,
                      description: "The classic Swiss cheese with walnut-sized natural gas holes, produced in giant 90kg wheels using pasture grass milk.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    },
                    {
                      id: "cheese-appenzeller-raclette",
                      name: "Appenzeller & Raclette du Valais AOP",
                      shortName: "Appenzeller & Raclette",
                      icon: "🫕",
                      color: "#15803d",
                      valueUSD: 0.19,
                      percentageOfParent: 16.5,
                      description: "Appenzeller washed with a secret herbal brine, and raw mountain milk Raclette du Valais melted over potatoes.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    },
                    {
                      id: "cheese-sbrinz-tete",
                      name: "Sbrinz AOP, Tête de Moine & Vacherin Mont-d'Or",
                      shortName: "Sbrinz & Specialties",
                      icon: "🧀",
                      color: "#22c55e",
                      valueUSD: 0.10,
                      percentageOfParent: 8.8,
                      description: "Super-hard grating cheese Sbrinz, rosetted Tête de Moine shaved with a Girolle, and spruce-wrapped winter Vacherin.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    }
                  ]
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
                  source: OFFICIAL_SOURCES.BLW_AGRAR,
                  children: [
                    {
                      id: "beef-natura-herds",
                      name: "Natura-Beef Pasture Suckler Cow Herds",
                      shortName: "Natura-Beef Pasture",
                      icon: "🐂",
                      color: "#14532d",
                      valueUSD: 0.31,
                      percentageOfParent: 53.4,
                      description: "Calves raised alongside mother cows on outdoor pasture and mountain alpine summer meadows under Mutterkuh Schweiz standards.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    },
                    {
                      id: "beef-veal-alpine",
                      name: "Premium Swiss Veal for Zürcher Geschnetzeltes",
                      shortName: "Swiss Veal",
                      icon: "🥩",
                      color: "#166534",
                      valueUSD: 0.18,
                      percentageOfParent: 31.0,
                      description: "Tender milk-fed veal, the quintessential culinary centerpiece of classic Swiss gastronomy and cantonal butchery.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    },
                    {
                      id: "beef-buendnerfleisch-cured",
                      name: "Bündnerfleisch Cured Air-Dried Mountain Beef",
                      shortName: "Bündnerfleisch Beef",
                      icon: "🥩",
                      color: "#15803d",
                      valueUSD: 0.09,
                      percentageOfParent: 15.6,
                      description: "Graubünden cured beef rubbed with Alpine herbs and dried by clean mountain winds for several months.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    }
                  ]
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
                  source: OFFICIAL_SOURCES.BLW_AGRAR,
                  children: [
                    {
                      id: "wine-valais-terraces",
                      name: "Valais Sun Terraces (Petite Arvine, Fendant, Cornalin)",
                      shortName: "Valais Terraces",
                      icon: "☀️",
                      color: "#14532d",
                      valueUSD: 0.12,
                      percentageOfParent: 41.4,
                      description: "Switzerland's largest wine canton, bathed in over 2,000 sunshine hours producing mineral Petite Arvine and indigenous Cornalin.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    },
                    {
                      id: "wine-lavaux-unesco",
                      name: "Lavaux UNESCO Terraced Vineyards (Chasselas)",
                      shortName: "Lavaux UNESCO Chasselas",
                      icon: "🍇",
                      color: "#166534",
                      valueUSD: 0.09,
                      percentageOfParent: 31.0,
                      description: "Medieval terraced vineyards rising above Lake Geneva, famed for subtle mineral Chasselas nurtured by 'three suns' (sky, lake, stone walls).",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    },
                    {
                      id: "wine-ticino-merlot",
                      name: "Ticino Merlot & Merlot Bianco",
                      shortName: "Ticino Merlot",
                      icon: "🍷",
                      color: "#15803d",
                      valueUSD: 0.05,
                      percentageOfParent: 17.2,
                      description: "South of the Alps, Ticino produces world-class barrel-aged red Merlots and delicate white Merlots.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    },
                    {
                      id: "wine-pinot-eastern",
                      name: "Bündner Herrschaft Pinot Noir & Geneva AOC",
                      shortName: "Bündner Herrschaft & Geneva",
                      icon: "🍇",
                      color: "#22c55e",
                      valueUSD: 0.03,
                      percentageOfParent: 10.4,
                      description: "Burgundian-style Grand Cru Pinot Noir in the Rhine Valley (Graubünden) warmed by Föhn winds.",
                      source: OFFICIAL_SOURCES.BLW_AGRAR
                    }
                  ]
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
              source: OFFICIAL_SOURCES.FOEN_FOREST,
              children: [
                {
                  id: "timber-norway-spruce",
                  name: "Norway Spruce (Fichte / Épicéa) Sawlogs",
                  shortName: "Norway Spruce Sawlogs",
                  icon: "🌲",
                  color: "#065f46",
                  valueUSD: 0.38,
                  percentageOfParent: 61.3,
                  description: "The 'bread and butter' tree of Swiss forestry, prized for high load-bearing capacity in chalet carpentry and structural glulam beams.",
                  source: OFFICIAL_SOURCES.FOEN_FOREST
                },
                {
                  id: "timber-silver-fir",
                  name: "Silver Fir (Tanne / Sapin) Framing Timber",
                  shortName: "Silver Fir Framing",
                  icon: "🌲",
                  color: "#047857",
                  valueUSD: 0.16,
                  percentageOfParent: 25.8,
                  description: "Resin-free, rot-resistant Alpine white wood used for interior woodwork, acoustic ceiling panels, and facade cladding.",
                  source: OFFICIAL_SOURCES.FOEN_FOREST
                },
                {
                  id: "timber-hardwood-larch",
                  name: "Swiss Stone Pine (Arve), Larch & Hardwood",
                  shortName: "Arve, Larch & Hardwood",
                  icon: "🪵",
                  color: "#059669",
                  valueUSD: 0.08,
                  percentageOfParent: 12.9,
                  description: "High-altitude Engadin stone pine (Arvenholz) renowned for soothing aromatherapeutic scents, alongside durable mountain larch.",
                  source: OFFICIAL_SOURCES.FOEN_FOREST
                }
              ]
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
              source: OFFICIAL_SOURCES.FOEN_FOREST,
              children: [
                {
                  id: "fish-perch-filets",
                  name: "Fresh Filets de Perche du Léman (Lake Perch)",
                  shortName: "Filets de Perche",
                  icon: "🐟",
                  color: "#115e59",
                  valueUSD: 0.021,
                  percentageOfParent: 55.3,
                  description: "The most iconic lakeside culinary dish in Switzerland, pan-fried meunière in butter and served across Lake Geneva restaurants.",
                  source: OFFICIAL_SOURCES.FOEN_FOREST
                },
                {
                  id: "fish-fera-coregonus",
                  name: "Lake Geneva Féra (Coregonus Whitefish)",
                  shortName: "Féra Whitefish",
                  icon: "🐟",
                  color: "#0f766e",
                  valueUSD: 0.012,
                  percentageOfParent: 31.6,
                  description: "Wild deep-water coregonid harvested by licensed artisanal fishermen with set gillnets in Lake Geneva and Lake Neuchâtel.",
                  source: OFFICIAL_SOURCES.FOEN_FOREST
                },
                {
                  id: "fish-arctic-char",
                  name: "Alpine Arctic Char & Wild Lake Trout",
                  shortName: "Arctic Char & Trout",
                  icon: "🎣",
                  color: "#0d9488",
                  valueUSD: 0.005,
                  percentageOfParent: 13.1,
                  description: "Prized high-altitude salmonids thriving in cold, oxygen-rich glacial waters.",
                  source: OFFICIAL_SOURCES.FOEN_FOREST
                }
              ]
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

// Nodes that are directly sourced from official national accounts and federal publications
export const OFFICIAL_DIRECT_NODE_IDS = new Set<string>([
  'switzerland',
  'primary',
  'secondary',
  'tertiary',
  // Primary Level 2
  'primary-agriculture',
  'primary-forestry',
  'primary-fishing',
  // Primary Level 3 (Aggregates directly tracked in Agrarbericht & FOEN accounts)
  'agri-dairy',
  'agri-livestock-meat',
  'agri-crops-cereals',
  'agri-viticulture-fruits',
  'agri-horticulture-herbs',
  'forestry-sawn-timber',
  'forestry-energy-wood',
  'forestry-protection-services',
  'fishing-commercial-lakes',
  'fishing-aquaculture-trout',
  'fishing-recreational-hatcheries',
  // Secondary Level 2
  'secondary-manufacturing',
  'secondary-construction',
  'secondary-energy-utilities',
  // Secondary Manufacturing Level 3 (Broad industry accounts from trade bodies)
  'secondary-pharma-chemicals',
  'secondary-watchmaking',
  'secondary-machinery-electronics',
  'secondary-precision-medtech',
  'secondary-food-processing',
  // Tertiary Level 2
  'tertiary-trade-wholesale',
  'tertiary-financial-insurance',
  'tertiary-realestate-professional',
  'tertiary-health-social',
  'tertiary-transport-it-tourism',
])

export function isNodeModeledEstimate(node: SectorNode): boolean {
  if (node.sourceTier === 'modeled_estimate') return true
  if (node.sourceTier === 'official_direct') return false
  return !OFFICIAL_DIRECT_NODE_IDS.has(node.id)
}

export function getNodeEstimateMethodology(node: SectorNode): string {
  if (node.estimateMethodology) return node.estimateMethodology

  const id = node.id

  if (
    id.startsWith('machinery-') ||
    id.startsWith('elev-') ||
    id.startsWith('foodplant-') ||
    id.startsWith('cnc-') ||
    id.startsWith('robotics-') ||
    id.startsWith('grid-') ||
    id.startsWith('drives-')
  ) {
    return 'Calibrated from corporate annual reports (ABB, Schindler, Bühler, Georg Fischer, Tornos, Mikron, SIG) and Swissmem industry turnover data. Official national accounts group all machinery under NOGA 28 and do not publish individual product lines.'
  }
  if (id.startsWith('watch-')) {
    return 'Modeled from the Morgan Stanley / LuxeConsult Swiss Watch Industry annual study and FH export reports by price tier. Official FH statistics record aggregate export volumes and precious metals, while segment and brand splits are industry analyst estimates.'
  }
  if (id.startsWith('pharma-')) {
    return 'Modeled from annual financial filings of Roche, Novartis, Lonza, and Givaudan, calibrated against scienceindustries aggregate chemical-pharmaceutical export statistics.'
  }
  if (id.startsWith('medtech-')) {
    return 'Modeled from Swiss Medtech industry studies and financial filings of Straumann, Sonova, Alcon, and Tecan, calibrated against total Swiss medical technology value added.'
  }
  if (id.startsWith('food-')) {
    return 'Modeled from Nestlé, Lindt & Sprüngli, and Emmi segment disclosures, anchored into Chocosuisse and BFS food manufacturing accounts.'
  }
  if (id.startsWith('secondary-energy-') || id.startsWith('hydro-') || id.startsWith('nuc-') || id.startsWith('renew-')) {
    return 'Energy physical generation (TWh) is directly tracked by the Swiss Federal Office of Energy (SFOE / BFE); monetary GDP value-added splits are economic estimates modeled on wholesale baseload power prices.'
  }
  if (id.startsWith('secondary-construction-') || id.startsWith('bldg-') || id.startsWith('spec-') || id.startsWith('civil-')) {
    return 'Modeled from Schweizerischer Baumeisterverband (SBV) contract data and materials filings (Sika, Holcim, Geberit), calibrated to BFS NOGA Section F construction totals.'
  }
  if (id.startsWith('comm-') || id.startsWith('retail-') || id.startsWith('tertiary-commodity-') || id.startsWith('tertiary-retail-') || id.startsWith('tertiary-wholesale-b2b')) {
    return 'Modeled from corporate revenue disclosures of Geneva/Zug trading houses (Glencore, Trafigura, Vitol, Gunvor) and Migros/Coop retail accounts, calibrated to BFS wholesale trade totals.'
  }
  if (id.startsWith('wealth-') || id.startsWith('ins-') || id.startsWith('bank-') || id.startsWith('tertiary-wealth-') || id.startsWith('tertiary-insurance-') || id.startsWith('tertiary-cantonal-')) {
    return 'Modeled from Swiss National Bank (SNB) banking statistics and annual reports of UBS, Swiss Re, Zurich Insurance, and Swiss Life, calibrated to BFS financial sector GDP.'
  }
  if (id.startsWith('it-') || id.startsWith('trans-') || id.startsWith('edu-') || id.startsWith('tour-') || id.startsWith('tertiary-it-') || id.startsWith('tertiary-transport-') || id.startsWith('tertiary-education-') || id.startsWith('tertiary-tourism-')) {
    return 'Modeled from corporate disclosures (SBB, Swisscom, Google Switzerland) and Switzerland Tourism overnight stay revenue models, calibrated to BFS services accounts.'
  }
  if (id.startsWith('cheese-') || id.startsWith('beef-') || id.startsWith('wine-') || id.startsWith('fish-') || id.startsWith('timber-')) {
    return 'Physical production volumes (tons/hectoliters) are tracked by FOAG/FOEN and Interprofession registries (AOP Gruyère/Emmentaler); economic GDP value-added shares are modeled estimates based on wholesale price realization.'
  }
  return 'Economic estimate modeled from corporate disclosures, market share data, and industry reports, calibrated to match the official parent sector total from the Swiss Federal Statistical Office.'
}

