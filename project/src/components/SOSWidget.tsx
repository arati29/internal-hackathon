import { useState, useEffect, useRef } from 'react';
import {
  Siren, X, Phone, MapPin, Share2, Plus, Trash2,
  Shield, Truck, Flame, Heart, Baby, Navigation, Loader2,
  Check, AlertTriangle, UserPlus,
} from 'lucide-react';
import { emergencyHotlines, type EmergencyContact } from '@/data/emergencyContacts';

const CONTACTS_KEY = 'sahyadri-sos-contacts';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Truck,
  Flame,
  Heart,
  Phone,
  Baby,
};

export default function SOSWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONTACTS_KEY);
    if (stored) {
      try {
        setContacts(JSON.parse(stored) as EmergencyContact[]);
      } catch {
        setContacts([]);
      }
    }
  }, []);

  const saveContacts = (updated: EmergencyContact[]) => {
    setContacts(updated);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(updated));
  };

  const addContact = () => {
    if (!newName.trim() || !newPhone.trim()) return;
    const contact: EmergencyContact = {
      id: Date.now().toString(),
      name: newName.trim(),
      phone: newPhone.trim(),
      relationship: newRelation.trim() || 'Contact',
    };
    saveContacts([...contacts, contact]);
    setNewName('');
    setNewPhone('');
    setNewRelation('');
    setShowAddForm(false);
  };

  const removeContact = (id: string) => {
    saveContacts(contacts.filter((c) => c.id !== id));
  };

  const getLocation = () => {
    setLocationStatus('loading');
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationStatus('success');
      },
      () => {
        setLocationStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const shareLocation = async () => {
    if (!location) return;
    const url = `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=18/${location.lat}/${location.lng}`;
    const text = `Emergency - My current location: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\nOpen map: ${url}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Emergency Location', text, url });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled share - no action needed
    }
  };

  const callNumber = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const findNearbyHelp = () => {
    if (!location) return;
    window.open(
      `https://www.openstreetmap.org/search?query=hospital+near+${location.lat}%2C${location.lng}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <>
      {/* Floating SOS Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 flex flex-col items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/40 hover:scale-110 active:scale-95 transition-all"
          aria-label="SOS Emergency"
        >
          <Siren className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-0.5 tracking-wider">SOS</span>
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
        </button>
      )}

      {/* SOS Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center sm:left-auto sm:bottom-auto p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm animate-fade-in sm:static sm:bg-transparent sm:backdrop-blur-none" />

          <div
            ref={panelRef}
            className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up sm:max-h-[90vh]"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-red-600 to-maroon-700 px-5 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Siren className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Emergency SOS</h3>
                  <p className="text-xs text-white/70">Tap a number to call instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Emergency Hotlines */}
              <div>
                <h4 className="text-sm font-bold text-ink-900 mb-3 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-red-600" />
                  Emergency Hotlines
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {emergencyHotlines.map((hotline) => {
                    const Icon = iconMap[hotline.icon] || Phone;
                    return (
                      <button
                        key={hotline.id}
                        onClick={() => callNumber(hotline.number)}
                        className="flex items-center gap-2.5 p-3 rounded-xl border border-cream-200 bg-cream-50 hover:bg-red-50 hover:border-red-200 transition-all text-left group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                          <Icon className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-ink-900 truncate">{hotline.name}</div>
                          <div className="text-lg font-bold text-red-600 leading-tight">{hotline.number}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location Section */}
              <div>
                <h4 className="text-sm font-bold text-ink-900 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Share My Location
                </h4>
                <div className="p-4 rounded-xl border border-cream-200 bg-cream-50 space-y-3">
                  {locationStatus === 'idle' && (
                    <button
                      onClick={getLocation}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 active:scale-95 transition-all"
                    >
                      <Navigation className="w-4 h-4" />
                      Get My Location
                    </button>
                  )}

                  {locationStatus === 'loading' && (
                    <div className="flex items-center justify-center gap-2 py-3 text-ink-700/60">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm">Detecting your location...</span>
                    </div>
                  )}

                  {locationStatus === 'error' && (
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-1.5 text-maroon-600 text-sm font-medium">
                        <AlertTriangle className="w-4 h-4" />
                        Could not get location
                      </div>
                      <p className="text-xs text-ink-700/50">Please allow location access in your browser.</p>
                      <button
                        onClick={getLocation}
                        className="text-sm text-red-600 font-medium hover:text-red-700"
                      >
                        Try again
                      </button>
                    </div>
                  )}

                  {locationStatus === 'success' && location && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-teal-700 font-medium">
                        <Check className="w-4 h-4" />
                        Location detected
                      </div>
                      <div className="text-xs text-ink-700/60 font-mono bg-white rounded-lg p-2 border border-cream-200">
                        {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={shareLocation}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-red-600 text-white font-medium text-sm hover:bg-red-700 active:scale-95 transition-all"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                          {copied ? 'Copied!' : 'Share'}
                        </button>
                        <button
                          onClick={findNearbyHelp}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white border border-cream-300 text-ink-900 font-medium text-sm hover:border-red-300 active:scale-95 transition-all"
                        >
                          <MapPin className="w-4 h-4" />
                          Find Help
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Emergency Contacts */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-ink-900 flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4 text-red-600" />
                    My Contacts
                  </h4>
                  {!showAddForm && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  )}
                </div>

                {/* Add form */}
                {showAddForm && (
                  <div className="p-3 rounded-xl border border-cream-200 bg-cream-50 mb-3 space-y-2">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Name"
                      className="w-full px-3 py-2 rounded-lg border border-cream-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                    />
                    <input
                      type="tel"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full px-3 py-2 rounded-lg border border-cream-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                    />
                    <input
                      type="text"
                      value={newRelation}
                      onChange={(e) => setNewRelation(e.target.value)}
                      placeholder="Relationship (e.g. Family, Friend)"
                      className="w-full px-3 py-2 rounded-lg border border-cream-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addContact}
                        disabled={!newName.trim() || !newPhone.trim()}
                        className="flex-1 px-3 py-2 rounded-lg bg-red-600 text-white font-medium text-sm hover:bg-red-700 disabled:opacity-40 active:scale-95 transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="px-3 py-2 rounded-lg bg-white border border-cream-300 text-ink-700 font-medium text-sm hover:bg-cream-100 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Contacts list */}
                {contacts.length === 0 && !showAddForm ? (
                  <p className="text-xs text-ink-700/40 text-center py-3">
                    No personal contacts added yet. Add family or friends to reach quickly.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center gap-3 p-3 rounded-xl border border-cream-200 bg-white"
                      >
                        <div className="w-9 h-9 rounded-full bg-saffron-100 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-4 h-4 text-saffron-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-ink-900 truncate">{contact.name}</div>
                          <div className="text-xs text-ink-700/50">{contact.relationship} · {contact.phone}</div>
                        </div>
                        <button
                          onClick={() => callNumber(contact.phone)}
                          className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <Phone className="w-4 h-4 text-red-600" />
                        </button>
                        <button
                          onClick={() => removeContact(contact.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-ink-700/30 hover:text-maroon-600 hover:bg-maroon-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-xl bg-cream-100 border border-cream-200">
                <p className="text-xs text-ink-700/50 text-center leading-relaxed">
                  This SOS feature helps you quickly access emergency numbers and share your location. Always call the official emergency number for immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
