import React from 'react';
import { MapPin, Clock, CloudRain } from 'lucide-react';

const ROUTES = [
  { id: 'cgk-dps', from: 'Jakarta (CGK)', to: 'Bali (DPS)', distanceKm: 984 },
  { id: 'sin-hnd', from: 'Singapore (SIN)', to: 'Tokyo (HND)', distanceKm: 5335 },
  { id: 'auh-lhr', from: 'Abu Dhabi (AUH)', to: 'London (LHR)', distanceKm: 5488 },
];

function estimateTime(distanceKm, speedKts = 560) {
  const kmPerHr = speedKts * 1.852; // convert kts to km/h
  const hours = distanceKm / kmPerHr;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

export default function RouteVisualizer({ selectedAircraft, onChange }) {
  const [routeId, setRouteId] = React.useState(ROUTES[0].id);
  const route = ROUTES.find((r) => r.id === routeId) || ROUTES[0];
  const eta = estimateTime(route.distanceKm, selectedAircraft?.speedKts || 560);

  React.useEffect(() => {
    if (onChange) onChange(route);
  }, [routeId]);

  return (
    <section className="w-full grid lg:grid-cols-2 gap-6 items-stretch">
      <div className="p-4 sm:p-6 rounded-xl bg-slate-900 ring-1 ring-white/10">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Route Visualizer
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {ROUTES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRouteId(r.id)}
              className={`text-left px-4 py-3 rounded-lg transition ring-1 focus:outline-none focus:ring-2 focus:ring-sky-400/50 ${
                route.id === r.id
                  ? 'bg-emerald-500/10 ring-emerald-400/30'
                  : 'bg-slate-800/60 ring-white/10 hover:bg-slate-800'
              }`}
            >
              <div className="font-medium text-white">{r.from} → {r.to}</div>
              <div className="text-xs text-white/70">{r.distanceKm.toLocaleString()} km</div>
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-slate-800/60 ring-1 ring-white/10 text-sm text-white/80 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="font-medium text-white/90">Flight time</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {eta}</div>
          </div>
          <div className="space-y-1">
            <div className="font-medium text-white/90">Weather</div>
            <div className="flex items-center gap-2"><CloudRain className="w-4 h-4" /> Scattered clouds</div>
          </div>
        </div>
      </div>

      <div className="relative h-[360px] sm:h-[420px] rounded-xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-sky-900 to-slate-900">
        {/* Simple animated flight path visualization */}
        <div className="absolute inset-0 p-6">
          <svg viewBox="0 0 400 240" className="w-full h-full">
            <defs>
              <linearGradient id="grad" x1="0" x2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            <path
              d="M20,200 C140,80 260,160 380,40"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="3"
              strokeLinecap="round"
              className="opacity-60"
            />
            <circle cx="20" cy="200" r="5" fill="#22d3ee" />
            <circle cx="380" cy="40" r="5" fill="#14b8a6" />
            <g>
              <circle id="dot" r="4" fill="#fff">
                <animateMotion dur="6s" repeatCount="indefinite" path="M20,200 C140,80 260,160 380,40" />
              </circle>
            </g>
          </svg>
        </div>
        <div className="absolute left-4 bottom-4 text-white/90 space-y-1">
          <div className="font-medium">{route.from} → {route.to}</div>
          <p className="text-xs text-white/70">Animated path. Distance {route.distanceKm.toLocaleString()} km.</p>
        </div>
      </div>
    </section>
  );
}

export const ROUTE_OPTIONS = ROUTES;
