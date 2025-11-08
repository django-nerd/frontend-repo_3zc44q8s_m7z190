import React from 'react';
import { MapPin, Clock } from 'lucide-react';

export const ROUTE_OPTIONS = [
  { id: 'lax-nyc', from: 'KLAX', to: 'KJFK', distanceKm: 3983 },
  { id: 'lhr-dxb', from: 'EGLL', to: 'OMDB', distanceKm: 5490 },
  { id: 'sfo-hnd', from: 'KSFO', to: 'RJTT', distanceKm: 8275 },
];

function fmtETA(distanceKm, speedKnots) {
  const kmh = speedKnots * 1.852; // knots -> km/h
  const hours = distanceKm / kmh;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

export default function RoutePlanner({ aircraft, selected, onSelect }) {
  return (
    <section className="rounded-2xl border border-neutral-200 p-4 sm:p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700"><MapPin size={18} /></div>
          <h2 className="text-lg font-semibold text-neutral-900">Route</h2>
        </div>
        {aircraft && (
          <div className="text-xs text-neutral-500">ETA with {aircraft.name}</div>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {ROUTE_OPTIONS.map((r) => {
          const active = selected?.id === r.id;
          const eta = aircraft ? fmtETA(r.distanceKm, aircraft.speedKnots) : '—';
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r)}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                active ? 'border-blue-600 bg-blue-50' : 'border-neutral-200 hover:bg-neutral-50'
              }`}
              aria-pressed={active}
            >
              <div className="font-medium text-neutral-900">{r.from} → {r.to}</div>
              <div className="text-xs text-neutral-500 flex items-center gap-3">
                <span>{r.distanceKm.toLocaleString()} km</span>
                <span className="flex items-center gap-1 text-blue-600"><Clock size={14} /> {eta}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
