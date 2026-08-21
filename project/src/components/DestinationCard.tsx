import { Star, MapPin, Heart, ArrowRight, Clock, IndianRupee } from 'lucide-react';
import type { Destination } from '@/data/destinations';

interface DestinationCardProps {
  destination: Destination;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onExplore: (destination: Destination) => void;
}

export default function DestinationCard({
  destination,
  isFavorite,
  onToggleFavorite,
  onExplore,
}: DestinationCardProps) {
  return (
    <div className="card card-hover group flex flex-col animate-fade-in-up">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-ink-900 text-xs font-bold">
          {destination.category}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(destination.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass-dark flex items-center justify-center transition-all hover:scale-110"
          aria-label="Toggle favourite"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-maroon-500 text-maroon-500' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
          <span className="text-sm font-bold text-ink-900">{destination.rating}</span>
          <span className="text-xs text-ink-700/40 ml-auto flex items-center gap-0.5">
            <MapPin className="w-3 h-3" />
            {destination.location}, {destination.state}
          </span>
        </div>

        <h3 className="font-bold text-lg text-ink-900 font-display">{destination.name}</h3>

        <p className="text-sm text-ink-700/60 mt-1.5 line-clamp-2 flex-1">{destination.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {destination.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-cream-100 text-ink-700/60 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-cream-200">
          <span className="flex items-center gap-1 text-xs text-ink-700/60">
            <Clock className="w-3.5 h-3.5" />
            {destination.visitDuration}
          </span>
          <span className="flex items-center gap-1 text-xs text-ink-700/60">
            <IndianRupee className="w-3.5 h-3.5" />
            {destination.entryFee === 'Check latest fee' ? 'Varies' : destination.entryFee}
          </span>
        </div>

        {/* Explore button */}
        <button
          onClick={() => onExplore(destination)}
          className="flex items-center justify-between w-full mt-4 px-4 py-2.5 rounded-xl bg-saffron-50 text-saffron-700 font-semibold text-sm transition-all hover:bg-saffron-100 group-hover:gap-3 gap-2"
        >
          Explore Destination
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
