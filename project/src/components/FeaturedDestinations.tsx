import { MapPin, Star, ArrowRight } from 'lucide-react';
import { cities } from '@/data/tourism';

interface FeaturedDestinationsProps {
  onCitySelect: (cityId: string) => void;
}

export default function FeaturedDestinations({ onCitySelect }: FeaturedDestinationsProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Curated Destinations
          </div>
          <h2 className="section-title">Heritage Cities of India</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Explore India's most iconic heritage destinations, each with its own unique story, architecture, and living traditions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, idx) => (
            <button
              key={city.id}
              onClick={() => onCitySelect(city.id)}
              className="card card-hover group text-left animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-saffron-500/90 text-white text-xs font-bold mb-2">
                    {city.tagline}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-display">{city.name}</h3>
                  <p className="text-sm text-cream-100/70 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {city.state}
                  </p>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full glass-dark">
                  <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                  <span className="text-white text-xs font-bold">
                    {city.heritageSites.reduce((sum, s) => sum + s.rating, 0) / city.heritageSites.length}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-ink-700/60 line-clamp-2">{city.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-ink-700/50">
                    {city.heritageSites.length} heritage {city.heritageSites.length === 1 ? 'site' : 'sites'} · Best: {city.bestSeason}
                  </span>
                  <span className="flex items-center gap-1 text-saffron-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
