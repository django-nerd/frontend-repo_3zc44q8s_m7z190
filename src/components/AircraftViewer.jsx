import React from 'react';
import Spline from '@splinetool/react-spline';
import { Plane, Sun, Unlock } from 'lucide-react';

const AIRCRAFTS = [
  {
    id: 'b777x',
    name: 'Boeing 777X',
    speedKts: 560,
    rangeKm: 13650,
    sceneUrl: 'https://prod.spline.design/1s8bI8n6HSpQX04Q/scene.splinecode',
    animations: ['Wing flex', 'Cabin lights', 'Door open'],
  },
  {
    id: 'a380',
    name: 'Airbus A380',
    speedKts: 545,
    rangeKm: 15200,
    sceneUrl: 'https://prod.spline.design/9h6vUuJm4bJxk0Qw/scene.splinecode',
    animations: ['Flaps move', 'Cabin lights', 'Door open'],
  },
  {
    id: 'a350',
    name: 'Airbus A350',
    speedKts: 575,
    rangeKm: 15000,
    sceneUrl: 'https://prod.spline.design/7gStH0CzE7zZ5ZyI/scene.splinecode',
    animations: ['Wing flex', 'Beacon lights', 'Door open'],
  },
];

export default function AircraftViewer({ selectedAircraftId, onSelect }) {
  const selected = AIRCRAFTS.find((a) => a.id === selectedAircraftId) || AIRCRAFTS[0];

  return (
    <section className="w-full grid lg:grid-cols-2 gap-6 items-stretch">
      <div className="relative h-[360px] sm:h-[420px] rounded-xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-b from-slate-800 to-slate-900">
        {/* 3D Aircraft Scene */}
        <Spline scene={selected.sceneUrl} style={{ width: '100%', height: '100%' }} />
        {/* Soft gradient overlay that does not block interactions */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        <div className="absolute left-4 bottom-4 text-white/90 space-y-1">
          <div className="flex items-center gap-2 font-medium">
            <Plane className="w-4 h-4" />
            <span>{selected.name}</span>
          </div>
          <p className="text-xs text-white/70">Rotate and zoom to explore. Animations: {selected.animations.join(', ')}.</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-xl bg-slate-900 ring-1 ring-white/10">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Plane className="w-5 h-5" /> Aircraft Selector
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {AIRCRAFTS.map((a) => (
            <button
              key={a.id}
              onClick={() => onSelect(a)}
              className={`text-left px-4 py-3 rounded-lg transition ring-1 focus:outline-none focus:ring-2 focus:ring-sky-400/50 ${
                selected.id === a.id
                  ? 'bg-sky-500/10 ring-sky-400/30'
                  : 'bg-slate-800/60 ring-white/10 hover:bg-slate-800'
              }`}
            >
              <div className="font-medium text-white">{a.name}</div>
              <div className="text-xs text-white/70">Cruise {a.speedKts} kts • Range {a.rangeKm.toLocaleString()} km</div>
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-white/80 text-xs">
          <span className="inline-flex items-center gap-1 bg-slate-800/60 rounded px-2 py-1"><Sun className="w-3 h-3" /> Cabin lights</span>
          <span className="inline-flex items-center gap-1 bg-slate-800/60 rounded px-2 py-1"><Plane className="w-3 h-3" /> Wing flex</span>
          <span className="inline-flex items-center gap-1 bg-slate-800/60 rounded px-2 py-1"><Unlock className="w-3 h-3" /> Doors</span>
        </div>
      </div>
    </section>
  );
}

export const AIRCRAFT_DATA = AIRCRAFTS;
