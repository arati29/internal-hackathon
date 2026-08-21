import { useEffect, useRef, useState } from 'react';
import {
  X, Star, MapPin, Clock, IndianRupee, Calendar, Navigation, Heart,
  Train, Bus, Car, Utensils, Check, Sparkles, Route as RouteIcon,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Destination } from '@/data/destinations';
import { getNearbyFoodFallback, type FoodPlaceResult } from '@/data/nearbyFood';
import NearbyFoodCard from '@/components/NearbyFoodCard';

interface DestinationDetailProps {
  destination: Destination;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onAddToItinerary?: (destination: Destination) => void;
}

const categoryColors: Record<string, string> = {
  'Heritage': 'bg-saffron-100 text-saffron-700',
  'Forts': 'bg-maroon-100 text-maroon-700',
  'Palaces': 'bg-gold-100 text-gold-700',
  'Temples': 'bg-teal-100 text-teal-700',
  'Museums': 'bg-cream-300 text-ink-800',
  'Hill Stations': 'bg-teal-50 text-teal-700',
  'Caves': 'bg-ink-800 text-cream-100',
  'Nature': 'bg-teal-100 text-teal-800',
  'Culture': 'bg-saffron-50 text-saffron-700',
};

export default function DestinationDetail({
  destination,
  isFavorite,
  onToggleFavorite,
  onClose,
  onAddToItinerary,
}: DestinationDetailProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [foodPlaces, setFoodPlaces] = useState<FoodPlaceResult[]>([]);
  const [foodLoading, setFoodLoading] = useState(true);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapRef.current, {
      center: [destination.lat, destination.lng],
      zoom: 14,
      scrollWheelZoom: false,
    });
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    const customIcon = L.divIcon({
      html: `<div style="width:32px;height:32px;background:#ff7a0f;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 10px rgba(0,0,0,0.3);"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    L.marker([destination.lat, destination.lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`<b>${destination.name}</b><br/>${destination.location}, ${destination.state}`);

    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [destination]);

  // Load nearby food (fallback to static data)
  useEffect(() => {
    setFoodLoading(true);
    const timer = setTimeout(() => {
      setFoodPlaces(getNearbyFoodFallback(destination.nearbyFood));
      setFoodLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [destination]);

  const directionsUrl = `https://www.openstreetmap.org/directions?from=&to=${destination.lat}%2C${destination.lng}`;
  const catColor = categoryColors[destination.category] || 'bg-saffron-100 text-saffron-700';

  return (
    <div
      className="fixed inset-0 z-50 bg-ink-900/70 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="max-w-4xl mx-auto my-0 md:my-8 bg-cream-50 rounded-none md:rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-72 md:h-80">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass-dark flex items-center justify-center transition-all hover:scale-110"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${catColor}`}>
              {destination.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display text-shadow-lg">
              {destination.name}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-white">
                <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                <span className="font-bold">{destination.rating}</span>
              </span>
              <span className="flex items-center gap-1 text-cream-100/70 text-sm">
                <MapPin className="w-4 h-4" />
                {destination.location}, {destination.state}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Quick info bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-3 text-center">
              <IndianRupee className="w-5 h-5 text-saffron-600 mx-auto mb-1" />
              <div className="text-xs text-ink-700/50">Entry Fee</div>
              <div className="text-sm font-semibold text-ink-900">{destination.entryFee === 'Check latest fee' ? 'Varies' : destination.entryFee}</div>
            </div>
            <div className="card p-3 text-center">
              <Clock className="w-5 h-5 text-saffron-600 mx-auto mb-1" />
              <div className="text-xs text-ink-700/50">Visit Duration</div>
              <div className="text-sm font-semibold text-ink-900">{destination.visitDuration}</div>
            </div>
            <div className="card p-3 text-center">
              <Clock className="w-5 h-5 text-saffron-600 mx-auto mb-1" />
              <div className="text-xs text-ink-700/50">Timings</div>
              <div className="text-sm font-semibold text-ink-900">{destination.openTime}–{destination.closeTime}</div>
            </div>
            <div className="card p-3 text-center">
              <Calendar className="w-5 h-5 text-saffron-600 mx-auto mb-1" />
              <div className="text-xs text-ink-700/50">Best Time</div>
              <div className="text-sm font-semibold text-ink-900">{destination.bestTimeToVisit}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
            <button
              onClick={() => onToggleFavorite(destination.id)}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all active:scale-95 ${
                isFavorite
                  ? 'bg-maroon-50 text-maroon-600 border-2 border-maroon-200'
                  : 'bg-white text-ink-900 border-2 border-cream-300 hover:border-saffron-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-maroon-500' : ''}`} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
            {onAddToItinerary && (
              <button
                onClick={() => onAddToItinerary(destination)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white font-semibold transition-all hover:bg-teal-700 active:scale-95"
              >
                <RouteIcon className="w-4 h-4" />
                Add to Itinerary
              </button>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3">About</h3>
            <p className="text-ink-700 leading-relaxed">{destination.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saffron-600" />
              Highlights
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {destination.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2 p-3 rounded-xl bg-white border border-cream-200">
                  <Check className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal for */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3">Ideal For</h3>
            <div className="flex flex-wrap gap-2">
              {destination.idealFor.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {destination.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-cream-200 text-ink-800 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-saffron-600" />
              Location Map
            </h3>
            <div ref={mapRef} className="w-full h-72 rounded-2xl overflow-hidden border border-cream-200 shadow-sm" />
          </div>

          {/* How to Reach */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3">How to Reach</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-cream-200">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <Bus className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-ink-900">Public Transport</div>
                  <p className="text-sm text-ink-700/60 mt-0.5">{destination.transport.publicTransport}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-cream-200">
                <div className="w-10 h-10 rounded-lg bg-saffron-50 flex items-center justify-center flex-shrink-0">
                  <Train className="w-5 h-5 text-saffron-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-ink-900">Railway</div>
                  <p className="text-sm text-ink-700/60 mt-0.5">{destination.transport.railway}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-cream-200">
                <div className="w-10 h-10 rounded-lg bg-maroon-50 flex items-center justify-center flex-shrink-0">
                  <Car className="w-5 h-5 text-maroon-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-ink-900">Road / Cab</div>
                  <p className="text-sm text-ink-700/60 mt-0.5">{destination.transport.road}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Famous local food */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-saffron-600" />
              Famous Local Food
            </h3>
            <div className="flex flex-wrap gap-2">
              {destination.famousFood.map((food) => (
                <span key={food} className="px-3 py-1.5 rounded-full bg-saffron-50 text-saffron-700 text-sm font-medium">
                  {food}
                </span>
              ))}
            </div>
          </div>

          {/* Nearby food spots */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-saffron-600" />
              Nearby Restaurants & Food Stops
            </h3>
            {foodLoading ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="card p-4 animate-pulse">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-cream-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-cream-200 rounded w-3/4" />
                        <div className="h-3 bg-cream-100 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {foodPlaces.map((food) => (
                  <NearbyFoodCard key={food.id} food={food} />
                ))}
              </div>
            )}
          </div>

          {/* Nearby attractions */}
          <div>
            <h3 className="text-lg font-bold text-ink-900 mb-3">Nearby Attractions</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {destination.nearbyAttractions.map((attr) => (
                <div key={attr.name} className="card p-4">
                  <div className="text-xs text-ink-700/50 font-medium">{attr.category}</div>
                  <div className="font-semibold text-sm text-ink-900 mt-1">{attr.name}</div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-saffron-600">
                    <MapPin className="w-3 h-3" />
                    {attr.distance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-xl bg-cream-100 border border-cream-200">
            <p className="text-xs text-ink-700/50 text-center">
              Entry fees, timings, and other details may change. Please check the latest fee/timings before visiting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
