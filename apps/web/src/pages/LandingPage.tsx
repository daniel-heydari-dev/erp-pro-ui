import { useNavigate } from 'react-router-dom';
import {
  Button,
  SplashCursor,
  ASCIIText,
  SpotlightCard,
  AnimatedContent,
  NeonLineChart,
  StackedBarChart,
  ThinBreakdownBar,
} from 'erp-pro-ui';

const neonData = [
  { name: '5/3', value: 7 },
  { name: '5/6', value: 11 },
  { name: '5/9', value: 8 },
  { name: '5/12', value: 9.5 },
  { name: '5/15', value: 6 },
  { name: '5/18', value: 10 },
  { name: '5/21', value: 12 },
];

const stackedBarData = [
  {
    name: '1/31',
    Construction: 700,
    Business: 600,
    Leisure: 400,
    Manufacturing: 600,
    Wholesale: 300,
  },
  {
    name: '2/1',
    Construction: 600,
    Business: 750,
    Leisure: 500,
    Manufacturing: 300,
    Wholesale: 200,
  },
  {
    name: '2/2',
    Construction: 900,
    Business: 800,
    Leisure: 600,
    Manufacturing: 400,
    Wholesale: 500,
  },
  {
    name: '2/3',
    Construction: 1000,
    Business: 900,
    Leisure: 700,
    Manufacturing: 500,
    Wholesale: 400,
  },
];

const stackedCategories = [
  { key: 'Construction', color: '#e81cff', label: 'Construction' },
  { key: 'Business', color: '#7a31ff', label: 'Business' },
  { key: 'Leisure', color: '#2b5bf4', label: 'Leisure' },
  { key: 'Manufacturing', color: '#00a3ff', label: 'Manufacturing' },
  { key: 'Wholesale', color: '#ff8c00', label: 'Wholesale' },
];

const breakdownData = [
  { id: 'tech', label: 'Tech', value: 25, color: '#e81cff' },
  { id: 'util', label: 'Utilities', value: 15, color: '#7a31ff' },
  { id: 'energy', label: 'Energy', value: 20, color: '#2b5bf4' },
  { id: 'cycle', label: 'Cyclicals', value: 30, color: '#00a3ff' },
  { id: 'fuel', label: 'Fuel', value: 10, color: '#ff8c00' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const openDocs = (path: string) => () => navigate(path);

  return (
    <div className="relative min-h-screen bg-[#050510] text-zinc-100 selection:bg-purple-500/30 overflow-x-hidden">
      {/* Interactive Background */}
      <SplashCursor
        variant="splash"
        size="md"
        color="#7367f0"
        secondaryColor="#9b87f5"
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
      />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-linear-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight">erp-pro-ui</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <button
            type="button"
            onClick={openDocs('/ui-basics/spotlight-card')}
            className="hover:text-white transition-colors"
          >
            Features
          </button>
          <button
            type="button"
            onClick={openDocs('/ui-basics/button')}
            className="hover:text-white transition-colors"
          >
            Components
          </button>
          <button
            type="button"
            onClick={openDocs('/get-started/introduction')}
            className="hover:text-white transition-colors"
          >
            Documentation
          </button>
          <button
            type="button"
            onClick={openDocs('/ui-basics/data-table')}
            className="hover:text-white transition-colors"
          >
            Examples
          </button>
          <Button
            onClick={() => navigate('/get-started/introduction')}
            className="px-5 py-2 border border-zinc-800 hover:border-zinc-600 rounded-md transition-all"
          >
            Get Started
          </Button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24">
        {/* Hero Section */}
        <header className="flex flex-col items-center text-center space-y-8 mb-32">
          <AnimatedContent preset="slideUp" duration={0.8}>
            <div className="relative w-full max-w-5xl h-50 md:h-100">
              <ASCIIText
                text="erp-pro-ui"
                asciiFontSize={10}
                textFontSize={300}
                textColor="#7367f0"
                enableWaves={true}
              />
            </div>
          </AnimatedContent>

          <AnimatedContent
            preset="fade"
            delay={0.4}
            duration={0.8}
            className="space-y-6"
          >
            <p className="text-xl md:text-2xl text-zinc-300 font-medium">
              The Premier React Component Library for{' '}
              <br className="hidden md:block" />
              Intelligent Tool Store Management.
            </p>
            <Button
              onClick={() => navigate('/get-started/introduction')}
              primary
              className="px-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-bold shadow-lg shadow-indigo-500/20"
            >
              View Docs
            </Button>
          </AnimatedContent>
        </header>

        {/* Featured Solutions Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-32">
          {/* Card 1: Inventory */}
          <SpotlightCard variant="glass" className="group h-80">
            <div className="flex flex-col h-full justify-between">
              <div className="p-2">
                <h3 className="text-lg font-semibold mb-1">
                  Inventory Overview
                </h3>
                <div className="h-48 mt-4 relative -ml-4">
                  <NeonLineChart data={neonData} height="100%" />
                </div>
              </div>
              <div className="flex items-center text-sm font-medium text-zinc-500 mt-2">
                <span>SpotlightCard →</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: POS */}
          <SpotlightCard variant="glass" className="group h-80">
            <div className="flex flex-col h-full justify-between">
              <div className="p-2">
                <div className="mt-8 px-2 flex flex-col justify-center h-40 bg-zinc-900/50 rounded-lg border border-white/5">
                  <ThinBreakdownBar data={breakdownData} />
                </div>
              </div>
              <div className="flex items-center text-sm font-medium text-zinc-500 mt-2">
                <span>SpotlightCard →</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3: Supplier */}
          <SpotlightCard variant="glass" className="group h-80">
            <div className="flex flex-col h-full justify-between">
              <div className="p-2">
                <h3 className="text-lg font-semibold mb-1">
                  Supplier Management
                </h3>
                <div className="h-40 mt-4 bg-zinc-900/50 rounded-lg border border-white/5 p-4 overflow-hidden">
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800" />
                        <div className="flex-1 space-y-2">
                          <div className="w-1/2 h-2 bg-zinc-700 rounded" />
                          <div className="w-1/3 h-1.5 bg-zinc-800 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center text-sm font-medium text-zinc-500 mt-2">
                <span>SpotlightCard →</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 4: Analytics */}
          <SpotlightCard variant="glass" className="group h-80">
            <div className="flex flex-col h-full justify-between">
              <div className="p-2">
                <h3 className="text-lg font-semibold mb-1">Sales Analytics</h3>
                <div className="h-48 mt-4 relative -ml-4">
                  <StackedBarChart
                    data={stackedBarData}
                    categories={stackedCategories}
                    height="100%"
                  />
                </div>
              </div>
              <div className="flex items-center text-sm font-medium text-zinc-500 mt-2">
                <span>SpotlightCard →</span>
              </div>
            </div>
          </SpotlightCard>
        </section>

        {/* Big Showcase */}
        <section className="relative py-24 flex flex-col items-center">
          <div className="absolute inset-0 bg-indigo-600/10 blur-[120px] rounded-full scale-75 pointer-events-none" />
          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-900/40 bg-zinc-900/80 backdrop-blur-xl">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent" />
            <div className="p-6 md:p-10 h-full flex flex-col">
              {/* Mock dashboard content */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="w-32 h-6 bg-zinc-800 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-6 flex-1">
                <div className="col-span-2 bg-white/5 rounded-xl p-6 border border-white/5">
                  <div className="w-40 h-6 bg-zinc-800 rounded-md mb-8" />
                  <div className="h-32 flex items-end gap-3">
                    {[60, 40, 80, 50, 90, 70, 85, 45, 65, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-indigo-500/30 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-4">
                  <div className="w-full h-20 bg-zinc-800/50 rounded-lg" />
                  <div className="w-full h-20 bg-zinc-800/50 rounded-lg" />
                  <div className="w-full h-4 bg-indigo-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-24 pb-12 grid md:grid-cols-4 gap-12 border-t border-zinc-900">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-linear-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-xs">
                ERP
              </div>
              <span className="font-semibold text-lg tracking-tight">
                erp-pro-ui
              </span>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Design systems and premium components optimized for
              industrial-grade store management and ERP software.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Quick links</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <button
                  type="button"
                  onClick={openDocs('/ui-basics/spotlight-card')}
                  className="hover:text-white"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openDocs('/ui-basics/button')}
                  className="hover:text-white"
                >
                  Components
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openDocs('/ui-basics/dialog')}
                  className="hover:text-white"
                >
                  Examples
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Social</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>
                <button
                  type="button"
                  onClick={openDocs('/get-started/introduction')}
                  className="hover:text-white"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openDocs('/ui-basics/data-table')}
                  className="hover:text-white"
                >
                  Tables
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openDocs('/ui-basics/typography')}
                  className="hover:text-white"
                >
                  Typography
                </button>
              </li>
            </ul>
          </div>
        </footer>
        <div className="py-8 flex justify-between items-center text-[10px] text-zinc-700 uppercase tracking-[0.2em]">
          <span>© 2026 erp-pro-ui</span>
          <div className="flex gap-4">
            <span>Twitter</span>
            <span>Github</span>
            <span>Discord</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
