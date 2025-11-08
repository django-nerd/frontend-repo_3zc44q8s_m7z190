import React from 'react';
import { Badge, Star, Users, CreditCard } from 'lucide-react';

export const OPERATORS = [
  {
    id: 'aurora',
    name: 'Aurora Jets',
    rating: 4.9,
    crew: '2 pilots + 1 attendant',
    perks: ['Wi‑Fi', 'Private lounge', 'Priority handling'],
    baseFactor: 0.92,
    logo: '🟡',
  },
  {
    id: 'zenith',
    name: 'Zenith Air Charter',
    rating: 4.8,
    crew: '2 pilots',
    perks: ['Wi‑Fi', 'Premium catering'],
    baseFactor: 0.9,
    logo: '🟣',
  },
  {
    id: 'atlas',
    name: 'Atlas Executive',
    rating: 4.7,
    crew: '2 pilots + 1 attendant',
    perks: ['Wi‑Fi'],
    baseFactor: 0.88,
    logo: '🔵',
  },
];

function OperatorCard({ op, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition-colors ${
        active ? 'border-blue-600 bg-blue-50' : 'border-neutral-200 hover:bg-neutral-50'
      }`}
      aria-pressed={active}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-xl">{op.logo}</div>
          <div>
            <div className="font-medium text-neutral-900 flex items-center gap-2">
              {op.name}
              <span className="inline-flex items-center gap-1 text-amber-600 text-xs"><Star size={14} /> {op.rating}</span>
            </div>
            <div className="text-xs text-neutral-500 flex items-center gap-3">
              <span className="inline-flex items-center gap-1"><Users size={14} /> {op.crew}</span>
              <span className="inline-flex items-center gap-1"><Badge size={14} /> {op.perks.join(' • ')}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function OperatorPicker({ selected, onSelect }) {
  return (
    <section className="rounded-2xl border border-neutral-200 p-4 sm:p-6 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700"><CreditCard size={18} /></div>
        <h2 className="text-lg font-semibold text-neutral-900">Operator</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {OPERATORS.map((op) => (
          <OperatorCard
            key={op.id}
            op={op}
            active={selected?.id === op.id}
            onClick={() => onSelect(op)}
          />
        ))}
      </div>
    </section>
  );
}
