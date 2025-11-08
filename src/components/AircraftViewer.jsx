import React from 'react';
import Spline from '@splinetool/react-spline';
import { Plane, Users } from 'lucide-react';

export const AIRCRAFT_DATA = [
  {
    id: 'g650',
    name: 'Gulfstream G650',
    speedKnots: 516, // typical cruise
    rangeKm: 12964,
    seats: 14,
    sceneUrl: 'https://prod.spline.design/3FzjHq1Xz5sG0i8x/scene.splinecode',
  },
  {
    id: 'global7500',
    name: 'Bombardier Global 7500',
    speedKnots: 513,
    rangeKm: 14260,
    seats: 16,
    sceneUrl: 'https://prod.spline.design/iQ6Y4m8jz2bS7W7g/scene.splinecode',
  },
  {
    id: 'falcon8x',
    name: 'Dassault Falcon 8X',
    speedKnots: 488,
    rangeKm: 11945,
    seats: 14,
    sceneUrl: 'https://prod.spline.design/Tz8cKz2m1r6h2iNn/scene.splinecode',
  },
];

function AircraftCard({ aircraft, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full rounded-xl border px-4 py-3 transition-colors ${
        active ? 'border-blue-600 bg-blue-50' : 'border-neutral-200 hover:bg-neutral-50'
      }`}
      aria-pressed={active}
    >
      <div className="flex items-center gap-3 text-left">
        <div className={`p-2 rounded-lg ${active ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700'}`}>
          <Plane size={18} />
        </div>
        <div>
          <div className="font-medium text-neutral-900">{aircraft.name}</div>
          <div className="text-xs text-neutral-500 flex items-center gap-3">
            <span>{Math.round(aircraft.rangeKm / 1000)}k km range</span>
            <span className="inline-flex items-center gap-1"><Users size={14} /> {aircraft.seats}</span>
          </div>
        </div>
      </div>
      <div className="text-xs text-neutral-500">{Math.round(aircraft.speedKnots)} kt</div>
    </button>
  );
}

export default function AircraftViewer({ selected, onSelect }) {
  const active = selected || AIRCRAFT_DATA[0];

  return (
    <section className="relative h-[420px] sm:h-[520px] rounded-2xl overflow-hidden bg-black">
      {/* 3D Spline only for the aircraft */}
      <Spline scene={active.sceneUrl} style={{ width: '100%', height: '100%' }} />

      {/* Non-blocking gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Aircraft selector (2D UI) */}
      <div className="absolute left-4 right-4 bottom-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {AIRCRAFT_DATA.map((ac) => (
          <AircraftCard
            key={ac.id}
            aircraft={ac}
            active={ac.id === active.id}
            onClick={() => onSelect(ac)}
          />
        ))}
      </div>
    </section>
  );
}
