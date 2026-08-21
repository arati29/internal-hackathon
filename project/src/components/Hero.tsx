import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import { cities } from '@/data/tourism';

interface HeroProps {
  onCitySelect: (cityId: string) => void;
  onExplore: () => void;
}

export default function Hero({ onCitySelect, onExplore }: HeroProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? cities.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.state.toLowerCase().includes(query.toLowerCase()) ||
          c.tagline.toLowerCase().includes(query.toLowerCase())
      )
    : cities;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (cityId: string) => {
    onCitySelect(cityId);
    setShowResults(false);
    setQuery('');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/14564421/pexels-photo-14564421.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Taj Mahal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900/90 via-saffron-900/70 to-ink-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/40" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-saffron-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-maroon-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-saffron-200 text-sm font-medium mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse" />
          36 UNESCO World Heritage Sites & Beyond
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-shadow-lg animate-fade-in-up">
          Discover India's
          <span className="block mt-2 bg-gradient-to-r from-saffron-300 via-gold-400 to-saffron-300 bg-clip-text text-transparent">
            Living Heritage
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-cream-100/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          From the marble majesty of the Taj Mahal to the ancient ghats of Varanasi — plan, explore, and bring home a piece of India's timeless soul.
        </p>

        {/* Search Bar */}
        <div ref={containerRef} className="relative max-w-2xl mx-auto mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className={`relative flex items-center bg-white rounded-full shadow-2xl transition-all duration-300 ${focused ? 'ring-4 ring-saffron-400/30' : ''}`}>
            <Search className="absolute left-5 w-5 h-5 text-ink-700/50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                setFocused(true);
                setShowResults(true);
              }}
              onBlur={() => setFocused(false)}
              placeholder="Search for a city, monument, or experience..."
              className="w-full pl-14 pr-32 py-4 md:py-5 rounded-full text-ink-900 placeholder-ink-700/40 bg-transparent focus:outline-none text-base md:text-lg"
            />
            <button
              onClick={onExplore}
              className="absolute right-2 flex items-center gap-1.5 px-5 py-3 md:py-3.5 rounded-full bg-saffron-500 text-white font-semibold text-sm md:text-base transition-all hover:bg-saffron-600 hover:shadow-lg active:scale-95"
            >
              Explore
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-2xl border border-cream-200 overflow-hidden max-h-96 overflow-y-auto animate-slide-up z-20">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-ink-700/50">
                  No destinations found. Try "Agra", "Jaipur", or "Kerala".
                </div>
              ) : (
                filtered.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleSelect(city.id)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-cream-100 transition-colors text-left border-b border-cream-100 last:border-0"
                  >
                    <img src={city.image} alt={city.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-ink-900">{city.name}</span>
                        <span className="text-xs text-ink-700/50 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" />
                          {city.state}
                        </span>
                      </div>
                      <p className="text-sm text-ink-700/60 truncate">{city.tagline}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-ink-700/30 flex-shrink-0" />
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 animate-fade-in" style={{ animationDelay: '0.45s' }}>
          <span className="text-cream-100/50 text-sm">Popular:</span>
          {['Taj Mahal', 'Jaipur', 'Varanasi', 'Kerala', 'Hampi'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                setShowResults(true);
              }}
              className="px-3 py-1 rounded-full glass text-cream-100/80 text-sm hover:bg-white/20 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 glass-dark border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: 'Heritage Cities', value: '40+' },
            { label: 'UNESCO Sites', value: '36' },
            { label: 'Artisan Products', value: '2,000+' },
            { label: 'Languages Supported', value: '12' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-saffron-300 font-display">{stat.value}</div>
              <div className="text-xs md:text-sm text-cream-100/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
