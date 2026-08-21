import { useState } from 'react';
import { Map, Plus, Trash2, Clock, IndianRupee, Calendar, Route, Navigation, Star, X, Check } from 'lucide-react';
import { cities, allHeritageSites, type HeritageSite } from '@/data/tourism';

interface RoutePlannerProps {
  selectedCityId: string | null;
}

interface ItineraryItem {
  site: HeritageSite;
  day: number;
  time: string;
}

export default function RoutePlanner({ selectedCityId }: RoutePlannerProps) {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showSitePicker, setShowSitePicker] = useState(false);
  const [tripDays, setTripDays] = useState(3);

  const selectedCity = cities.find((c) => c.id === selectedCityId);
  const availableSites = selectedCity
    ? selectedCity.heritageSites
    : allHeritageSites;

  const addToItinerary = (site: HeritageSite) => {
    if (itinerary.some((item) => item.site.id === site.id)) return;
    setItinerary([...itinerary, { site, day: selectedDay, time: site.openTime }]);
    setShowSitePicker(false);
  };

  const removeFromItinerary = (siteId: string) => {
    setItinerary(itinerary.filter((item) => item.site.id !== siteId));
  };

  const moveDay = (siteId: string, direction: number) => {
    setItinerary(
      itinerary.map((item) =>
        item.site.id === siteId
          ? { ...item, day: Math.max(1, Math.min(tripDays, item.day + direction)) }
          : item
      )
    );
  };

  const totalCost = itinerary.reduce((sum, item) => sum + item.site.entryFee, 0);
  const dayGroups = Array.from({ length: tripDays }, (_, i) => i + 1);

  const itineraryByDay = (day: number) => itinerary.filter((item) => item.day === day);

  return (
    <section id="route-planner" className="py-16 md:py-24 bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-100 text-saffron-700 text-sm font-medium mb-4">
            <Route className="w-4 h-4" />
            Plan Your Journey
          </div>
          <h2 className="section-title">Interactive Route Planner</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Build a personalized itinerary across India's heritage sites. Add monuments, organize by day, and get a cost estimate instantly.
          </p>
        </div>

        {/* Trip controls */}
        <div className="card p-5 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-saffron-600" />
                <span className="font-semibold text-ink-900">Trip Length:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTripDays(Math.max(1, tripDays - 1))}
                    className="w-8 h-8 rounded-lg bg-cream-100 hover:bg-cream-200 text-ink-900 font-bold flex items-center justify-center transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-saffron-600">{tripDays}</span>
                  <button
                    onClick={() => setTripDays(Math.min(7, tripDays + 1))}
                    className="w-8 h-8 rounded-lg bg-cream-100 hover:bg-cream-200 text-ink-900 font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                  <span className="text-ink-700 text-sm">{tripDays === 1 ? 'Day' : 'Days'}</span>
                </div>
              </div>
              {selectedCity && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-medium">
                  <Map className="w-4 h-4" />
                  {selectedCity.name}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-ink-700/50">Estimated Entry Cost</div>
                <div className="text-2xl font-bold text-saffron-600 font-display flex items-center">
                  <IndianRupee className="w-5 h-5" />
                  {totalCost.toLocaleString('en-IN')}
                </div>
              </div>
              <button
                onClick={() => setShowSitePicker(true)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4" />
                Add Site
              </button>
            </div>
          </div>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {dayGroups.map((day) => {
            const count = itineraryByDay(day).length;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all border-2 ${
                  selectedDay === day
                    ? 'bg-saffron-500 text-white border-saffron-500 shadow-md shadow-saffron-500/20'
                    : 'bg-white text-ink-700 border-cream-200 hover:border-saffron-300'
                }`}
              >
                Day {day}
                {count > 0 && (
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${selectedDay === day ? 'bg-white/20' : 'bg-saffron-100 text-saffron-700'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Itinerary for selected day */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-4">
            {itineraryByDay(selectedDay).length === 0 ? (
              <div className="card p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4">
                  <Map className="w-8 h-8 text-ink-700/30" />
                </div>
                <h3 className="text-lg font-semibold text-ink-900 mb-2">No sites planned for Day {selectedDay}</h3>
                <p className="text-ink-700/50 mb-4">Add heritage sites to your itinerary to start planning.</p>
                <button onClick={() => setShowSitePicker(true)} className="btn-primary">
                  <Plus className="w-4 h-4" />
                  Browse Heritage Sites
                </button>
              </div>
            ) : (
              itineraryByDay(selectedDay).map((item, idx) => (
                <div
                  key={item.site.id}
                  className="card card-hover p-4 flex gap-4 animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <img src={item.site.image} alt={item.site.name} className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-ink-900 text-lg">{item.site.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-ink-700/60 flex items-center gap-1">
                            <Map className="w-3.5 h-3.5" />
                            {item.site.city}
                          </span>
                          <span className="text-sm text-ink-700/60 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                            {item.site.rating}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromItinerary(item.site.id)}
                        className="p-2 rounded-lg text-ink-700/40 hover:text-maroon-600 hover:bg-maroon-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-ink-700/60 mt-2 line-clamp-2">{item.site.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-700 font-medium">
                        <Clock className="w-3 h-3" />
                        {item.site.openTime} – {item.site.closeTime}
                      </span>
                      <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-saffron-50 text-saffron-700 font-medium">
                        <IndianRupee className="w-3 h-3" />
                        {item.site.entryFee === 0 ? 'Free Entry' : item.site.entryFee.toLocaleString('en-IN')}
                      </span>
                      <div className="flex items-center gap-1 ml-auto">
                        <button
                          onClick={() => moveDay(item.site.id, -1)}
                          disabled={item.day === 1}
                          className="px-2 py-1 rounded-md text-xs font-medium text-ink-700/60 hover:bg-cream-100 disabled:opacity-30 transition-colors"
                        >
                          ← Move
                        </button>
                        <span className="text-xs text-ink-700/40">Day {item.day}</span>
                        <button
                          onClick={() => moveDay(item.site.id, 1)}
                          disabled={item.day === tripDays}
                          className="px-2 py-1 rounded-md text-xs font-medium text-ink-700/60 hover:bg-cream-100 disabled:opacity-30 transition-colors"
                        >
                          Move →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary sidebar */}
          <div className="space-y-4">
            <div className="card p-5">
              <h4 className="font-bold text-ink-900 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-saffron-600" />
                Trip Summary
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink-700/60">Total Sites</span>
                  <span className="font-bold text-ink-900">{itinerary.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink-700/60">Trip Duration</span>
                  <span className="font-bold text-ink-900">{tripDays} {tripDays === 1 ? 'Day' : 'Days'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink-700/60">Entry Fees</span>
                  <span className="font-bold text-saffron-600 flex items-center">
                    <IndianRupee className="w-4 h-4" />
                    {totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="border-t border-cream-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-ink-700/60">Avg / Day</span>
                    <span className="font-bold text-ink-900">
                      {(itinerary.length / tripDays).toFixed(1)} sites
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Per-day overview */}
            <div className="card p-5">
              <h4 className="font-bold text-ink-900 mb-3">Daily Overview</h4>
              <div className="space-y-2">
                {dayGroups.map((day) => {
                  const count = itineraryByDay(day).length;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-colors ${
                        selectedDay === day ? 'bg-saffron-50' : 'hover:bg-cream-100'
                      }`}
                    >
                      <span className="text-sm font-medium text-ink-900">Day {day}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
                            <div key={i} className="w-1.5 h-4 rounded-full bg-saffron-400" />
                          ))}
                          {count === 0 && <span className="text-xs text-ink-700/30">Empty</span>}
                        </div>
                        <span className="text-xs font-bold text-saffron-600 w-5 text-right">{count}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Site Picker Modal */}
      {showSitePicker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowSitePicker(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-cream-200">
              <h3 className="font-bold text-xl text-ink-900">Choose Heritage Sites to Add</h3>
              <button
                onClick={() => setShowSitePicker(false)}
                className="p-2 rounded-lg text-ink-700/40 hover:bg-cream-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto max-h-[60vh] grid sm:grid-cols-2 gap-4">
              {availableSites.map((site) => {
                const added = itinerary.some((item) => item.site.id === site.id);
                return (
                  <div
                    key={site.id}
                    className={`card p-4 flex gap-3 ${added ? 'opacity-50' : 'card-hover cursor-pointer'}`}
                    onClick={() => !added && addToItinerary(site)}
                  >
                    <img src={site.image} alt={site.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-ink-900">{site.name}</h4>
                      <p className="text-xs text-ink-700/50 flex items-center gap-1 mt-0.5">
                        <Map className="w-3 h-3" />
                        {site.city} · {site.era}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs flex items-center gap-0.5 text-gold-600 font-medium">
                          <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                          {site.rating}
                        </span>
                        <span className="text-xs text-ink-700/50 flex items-center">
                          <IndianRupee className="w-3 h-3" />
                          {site.entryFee === 0 ? 'Free' : site.entryFee}
                        </span>
                      </div>
                      {added ? (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-teal-600">
                          <Check className="w-3 h-3" />
                          Added to itinerary
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-saffron-600">
                          <Plus className="w-3 h-3" />
                          Add to Day {selectedDay}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
