import { Star, Navigation, Utensils } from 'lucide-react';
import type { FoodPlaceResult } from '@/data/nearbyFood';

interface NearbyFoodCardProps {
  food: FoodPlaceResult;
}

export default function NearbyFoodCard({ food }: NearbyFoodCardProps) {
  const directionsUrl = `https://www.openstreetmap.org/directions?from=&to=${food.lat}%2C${food.lng}`;

  return (
    <div className="card card-hover p-4 flex items-start gap-3">
      <div className="w-11 h-11 rounded-xl bg-saffron-50 flex items-center justify-center flex-shrink-0">
        <Utensils className="w-5 h-5 text-saffron-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-sm text-ink-900 truncate">{food.name}</h4>
          <span className="flex items-center gap-0.5 text-xs font-bold text-ink-900 flex-shrink-0">
            <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
            {food.rating}
          </span>
        </div>
        <p className="text-xs text-ink-700/50 mt-0.5">{food.cuisine}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-ink-700/60 font-medium">{food.priceRange}</span>
          <span className="text-xs text-ink-700/40">·</span>
          <span className="text-xs text-ink-700/60">{food.distance}</span>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-saffron-600 hover:text-saffron-700 transition-colors"
        >
          <Navigation className="w-3 h-3" />
          Get Directions
        </a>
      </div>
    </div>
  );
}
