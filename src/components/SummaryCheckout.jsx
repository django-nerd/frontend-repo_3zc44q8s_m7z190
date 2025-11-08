import React, { useMemo } from 'react';
import { ArrowRight, CreditCard, Plane, MapPin } from 'lucide-react';

function computePrice(hours, baseFactor = 0.9) {
  const hourly = 6500;
  const raw = hours * hourly * baseFactor;
  return Math.round(raw).toLocaleString();
}

function computeHours(distanceKm, speedKnots) {
  const kmh = speedKnots * 1.852;
  return distanceKm / kmh;
}

export default function SummaryCheckout({ aircraft, route, operator }) {
  const hours = useMemo(() => {
    if (!aircraft || !route) return 0;
    return computeHours(route.distanceKm, aircraft.speedKnots);
  }, [aircraft, route]);

  const price = useMemo(() => {
    if (!operator) return '—';
    return `$${computePrice(hours, operator.baseFactor)}`;
  }, [hours, operator]);

  return (
    <section className="rounded-2xl border border-neutral-200 p-4 sm:p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-900">Summary</h2>
        <div className="text-xs text-neutral-500">Est. flight time {hours ? `${Math.floor(hours)}h ${Math.round((hours - Math.floor(hours)) * 60)}m` : '—'}</div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-neutral-700">
          <Plane size={16} />
          <span>{aircraft ? aircraft.name : 'Select aircraft'}</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-700">
          <MapPin size={16} />
          <span>{route ? `${route.from} → ${route.to} (${route.distanceKm.toLocaleString()} km)` : 'Select route'}</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-700">
          <CreditCard size={16} />
          <span>{operator ? operator.name : 'Select operator'}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-2xl font-semibold text-neutral-900">{price}</div>
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
          disabled={!aircraft || !route || !operator}
        >
          Continue
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
