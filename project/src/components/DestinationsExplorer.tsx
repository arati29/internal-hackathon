import { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, Heart, X, Compass } from 'lucide-react';
import { destinations, destinationCategories, type Destination, type DestinationCategory } from '@/data/destinations';
import DestinationCard from '@/components/DestinationCard';
import DestinationDetail from '@/components/DestinationDetail';

interface DestinationsExplorerProps {
  onAddToItinerary?: (destination: Destination) => void;
}

const FAVORITES_KEY = 'sahyadri-destination-favorites';

export default function DestinationsExplorer({ onAddToItinerary }: DestinationsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<DestinationCategory | 'All'>('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(new Set(JSON.parse(stored) as string[]));
      } catch {
        setFavorites(new Set());
      }
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = destinations;

    if (activeCategory !== 'All') {
      result = result.filter((d) => d.category === activeCategory);
    }

    if (showFavoritesOnly) {
      result = result.filter((d) => favorites.has(d.id));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)) ||
          d.famousFood.some((f) => f.toLowerCase().includes(q))
      );
    }

    return result;
  }, [searchQuery, activeCategory, showFavoritesOnly, favorites]);

  const handleAddToItinerary = (destination: Destination) => {
    setSelectedDestination(null);
    onAddToItinerary?.(destination);
  };

  return (
    <section id="destinations-explorer" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4">
            <Compass className="w-4 h-4" />
            Explore Destinations
          </div>
          <h2 className="section-title">Pune & Maharashtra Heritage</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Discover historic forts, ancient caves, hill stations, and cultural landmarks across Pune and its surroundings.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-700/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, location, category, tags, or food..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-cream-300 bg-cream-50 text-ink-900 placeholder-ink-700/40 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cream-200 flex items-center justify-center text-ink-700/50 hover:bg-cream-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'All'
                  ? 'bg-saffron-500 text-white shadow-md shadow-saffron-500/20'
                  : 'bg-cream-100 text-ink-700 hover:bg-cream-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              All
            </button>
            {destinationCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-saffron-500 text-white shadow-md shadow-saffron-500/20'
                    : 'bg-cream-100 text-ink-700 hover:bg-cream-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
              showFavoritesOnly
                ? 'bg-maroon-50 text-maroon-600 border-2 border-maroon-200'
                : 'bg-white text-ink-700 border-2 border-cream-200 hover:border-maroon-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-maroon-500' : ''}`} />
            Favorites ({favorites.size})
          </button>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-ink-700/50">
          {filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'} found
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-ink-700/30" />
            </div>
            <h3 className="text-lg font-semibold text-ink-900 mb-1">No destinations found</h3>
            <p className="text-sm text-ink-700/50">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest, idx) => (
              <div key={dest.id} style={{ animationDelay: `${idx * 0.06}s` }}>
                <DestinationCard
                  destination={dest}
                  isFavorite={favorites.has(dest.id)}
                  onToggleFavorite={toggleFavorite}
                  onExplore={setSelectedDestination}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedDestination && (
        <DestinationDetail
          destination={selectedDestination}
          isFavorite={favorites.has(selectedDestination.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedDestination(null)}
          onAddToItinerary={onAddToItinerary ? handleAddToItinerary : undefined}
        />
      )}
    </section>
  );
}
