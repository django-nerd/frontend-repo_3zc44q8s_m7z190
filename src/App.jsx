import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import AircraftViewer, { AIRCRAFT_DATA } from './components/AircraftViewer';
import RoutePlanner, { ROUTE_OPTIONS } from './components/RoutePlanner';
import OperatorPicker, { OPERATORS } from './components/OperatorPicker';
import SummaryCheckout from './components/SummaryCheckout';

export default function App() {
  const [aircraft, setAircraft] = useState(AIRCRAFT_DATA[0]);
  const [route, setRoute] = useState(ROUTE_OPTIONS[0]);
  const [operator, setOperator] = useState(OPERATORS[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Rocket className="text-blue-600" size={20} />
            Air Charter
          </div>
          <div className="text-sm text-neutral-600">3D plane, 2D everything else</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* 3D aircraft only; the rest is 2D UI */}
        <AircraftViewer selected={aircraft} onSelect={setAircraft} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RoutePlanner aircraft={aircraft} selected={route} onSelect={setRoute} />
            <OperatorPicker selected={operator} onSelect={setOperator} />
          </div>
          <div className="lg:col-span-1">
            <SummaryCheckout aircraft={aircraft} route={route} operator={operator} />
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-neutral-500">© {new Date().getFullYear()} Air Charter</footer>
    </div>
  );
}
