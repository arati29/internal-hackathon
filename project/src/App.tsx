import { useState, useEffect } from 'react';
import { Compass, Map, ShoppingBag, Sparkles, Menu, X } from 'lucide-react';
import Hero from '@/components/Hero';
import DestinationsExplorer from '@/components/DestinationsExplorer';
import RoutePlanner from '@/components/RoutePlanner';
import Marketplace from '@/components/Marketplace';
import Chatbot from '@/components/Chatbot';
import SOSWidget from '@/components/SOSWidget';
import type { Destination } from '@/data/destinations';

type Tab = 'home' | 'planner' | 'marketplace';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
    setActiveTab('planner');
    setTimeout(() => {
      document.getElementById('route-planner')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddDestinationToItinerary = (_destination: Destination) => {
    setActiveTab('planner');
    setTimeout(() => {
      document.getElementById('route-planner')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleExplore = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'planner') {
      setTimeout(() => {
        document.getElementById('route-planner')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (tab === 'marketplace') {
      setTimeout(() => {
        document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navItems = [
    { id: 'home' as Tab, label: 'Home', icon: Compass },
    { id: 'planner' as Tab, label: 'Route Planner', icon: Map },
    { id: 'marketplace' as Tab, label: 'Marketplace', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || activeTab !== 'home'
          ? 'bg-ink-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleTabChange('home')} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-maroon-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-white text-lg leading-none">Sahyadri</div>
              <div className="text-xs text-cream-100/60 leading-none mt-0.5">Heritage Tourism</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-saffron-500 text-white'
                    : 'text-cream-100/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-ink-900/95 backdrop-blur-md border-t border-white/10 animate-fade-in">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-saffron-500 text-white'
                      : 'text-cream-100/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <main>
        <Hero onCitySelect={handleCitySelect} onExplore={handleExplore} />

        <div id="destinations">
          <DestinationsExplorer onAddToItinerary={handleAddDestinationToItinerary} />
        </div>

        <RoutePlanner selectedCityId={selectedCityId} />

        <Marketplace />

        {/* Footer */}
        <footer className="bg-ink-900 text-cream-100/60 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-maroon-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-lg">Sahyadri</div>
                    <div className="text-xs text-cream-100/50">Heritage Tourism</div>
                  </div>
                </div>
                <p className="text-sm">Discover, plan, and experience the living heritage of India — from ancient monuments to artisan crafts.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm">Explore</h4>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => handleTabChange('home')} className="hover:text-saffron-400 transition-colors">Home</button></li>
                  <li><button onClick={() => handleTabChange('planner')} className="hover:text-saffron-400 transition-colors">Route Planner</button></li>
                  <li><button onClick={() => handleTabChange('marketplace')} className="hover:text-saffron-400 transition-colors">Marketplace</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm">Destinations</h4>
                <ul className="space-y-2 text-sm">
                  <li>Agra · Taj Mahal</li>
                  <li>Jaipur · Pink City</li>
                  <li>Varanasi · Ghats</li>
                  <li>Kerala · Backwaters</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3 text-sm">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>Travel Guide</li>
                  <li>Artisan Stories</li>
                  <li>Contact Us</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs">© 2026 Sahyadri Heritage Tourism. Preserving India's living heritage, one journey at a time.</p>
              <p className="text-xs">Made with care for India's artisans and travelers.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating AI Chatbot */}
      <Chatbot />

      {/* Floating SOS Emergency Widget */}
      <SOSWidget />
    </div>
  );
}
