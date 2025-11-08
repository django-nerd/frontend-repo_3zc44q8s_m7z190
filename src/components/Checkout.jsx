import React from 'react';
import { CreditCard, ArrowRight } from 'lucide-react';

export default function Checkout({ aircraft, route, airline }) {
  const base = 0.9; // price factor for demo
  const distance = route?.distanceKm || 1000;
  const hourlyRate = 6500; // demo rate USD/hour
  const speedKts = aircraft?.speedKts || 560;
  const kmph = speedKts * 1.852;
  const hours = Math.max(1, distance / kmph);
  const price = Math.round(hours * hourlyRate * base);

  return (
    <section className="w-full p-4 sm:p-6 rounded-xl bg-slate-900 ring-1 ring-white/10">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <CreditCard className="w-5 h-5" /> Order & Payment
      </h3>

      <div className="grid sm:grid-cols-3 gap-4 text-sm">
        <div className="rounded-lg bg-slate-800/60 ring-1 ring-white/10 p-3 text-white/80">
          <div className="text-xs uppercase tracking-wide text-white/60">Aircraft</div>
          <div className="mt-1 text-white font-medium">{aircraft?.name || '—'}</div>
        </div>
        <div className="rounded-lg bg-slate-800/60 ring-1 ring-white/10 p-3 text-white/80">
          <div className="text-xs uppercase tracking-wide text-white/60">Route</div>
          <div className="mt-1 text-white font-medium">{route ? `${route.from} → ${route.to}` : '—'}</div>
        </div>
        <div className="rounded-lg bg-slate-800/60 ring-1 ring-white/10 p-3 text-white/80">
          <div className="text-xs uppercase tracking-wide text-white/60">Operator</div>
          <div className="mt-1 text-white font-medium">{airline?.name || '—'}</div>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="text-white/80">
          <div className="text-xs uppercase tracking-wide text-white/60">Estimated Price</div>
          <div className="text-2xl font-semibold text-white">${price.toLocaleString()}</div>
          <div className="text-xs text-white/60">Includes taxes and fees. Simulated checkout.</div>
        </div>
        <button className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold px-4 py-2 rounded-lg transition">
          Continue to checkout <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
