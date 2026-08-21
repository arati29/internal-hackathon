import type { NearbyFoodSpot } from '@/data/destinations';

export interface FoodPlaceResult {
  id: string;
  name: string;
  rating: number;
  cuisine: string;
  priceRange: string;
  distance: string;
  lat: number;
  lng: number;
  photoUrl?: string;
}

export async function fetchNearbyFood(
  lat: number,
  lng: number,
  radiusMeters: number = 3000
): Promise<FoodPlaceResult[]> {
  const response = await fetch(
    `/api/nearby-food?lat=${lat}&lng=${lng}&radius=${radiusMeters}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch nearby food places');
  }

  return response.json() as Promise<FoodPlaceResult[]>;
}

export function getNearbyFoodFallback(
  spots: NearbyFoodSpot[]
): FoodPlaceResult[] {
  return spots.map((spot, idx) => ({
    id: `fallback-${idx}`,
    name: spot.name,
    rating: spot.rating,
    cuisine: spot.cuisine,
    priceRange: spot.priceRange,
    distance: spot.distance,
    lat: spot.lat,
    lng: spot.lng,
  }));
}
