import React from 'react';
import { Badge, Users, Star } from 'lucide-react';

const AIRLINES = [
  { id: 'hanz', name: 'HanzTravel Charter', logo: '🟦', livery: 'Midnight Sky', crew: 8, rating: 4.8, perks: ['Private lounge', 'Signature dining', 'Wi‑Fi'] },
  { id: 'sky', name: 'SkyJet', logo: '✈️', livery: 'Aurora Wave', crew: 12, rating: 4.6, perks: ['Priority boarding', 'Chef onboard', 'Wi‑Fi'] },
  { id: 'ocean', name: 'OceanAir', logo: '🌊', livery: 'Pearl Blue', crew: 10, rating: 4.7, perks: ['Spa kit', 'Fine dining', 'Wi‑Fi'] },
];

export default function AirlineCustomizer({ selected, onChange }) {
  const airline = selected || AIRLINES[0];

  return (
    <section className="w-full p-4 sm:p-6 rounded-xl bg-slate-900 ring-1 ring-white/10">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Badge className="w-5 h-5" /> Airline / Operator
      </h3>

      <div className="grid sm:grid-cols-3 gap-3">
        {AIRLINES.map((a) => (
          <button
            key={a.id}
            onClick={() => onChange(a)}
            className={`text-left px-4 py-3 rounded-lg transition ring-1 focus:outline-none focus:ring-2 focus:ring-sky-400/50 ${
              airline.id === a.id
                ? 'bg-violet-500/10 ring-violet-400/30'
                : 'bg-slate-800/60 ring-white/10 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{a.logo}</span>
              <div>
                <div className="font-medium text-white">{a.name}</div>
                <div className="text-xs text-white/70">Livery: {a.livery}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 grid sm:grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-800/60 ring-1 ring-white/10 p-3 text-white/80">
          <div className="text-xs uppercase tracking-wide text-white/60">Crew</div>
          <div className="flex items-center gap-2 mt-1 text-white"><Users className="w-4 h-4" /> {airline.crew} members</div>
        </div>
        <div className="rounded-lg bg-slate-800/60 ring-1 ring-white/10 p-3 text-white/80">
          <div className="text-xs uppercase tracking-wide text-white/60">Rating</div>
          <div className="flex items-center gap-2 mt-1 text-white"><Star className="w-4 h-4 text-yellow-400" /> {airline.rating}</div>
        </div>
        <div className="rounded-lg bg-slate-800/60 ring-1 ring-white/10 p-3 text-white/80">
          <div className="text-xs uppercase tracking-wide text-white/60">Perks</div>
          <div className="mt-1 text-sm">{airline.perks.join(' • ')}</div>
        </div>
      </div>
    </section>
  );
}

export const AIRLINES_DATA = AIRLINES;
