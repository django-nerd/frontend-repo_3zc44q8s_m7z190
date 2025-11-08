import React from 'react';
import AircraftViewer, { AIRCRAFT_DATA } from './components/AircraftViewer';
import RouteVisualizer, { ROUTE_OPTIONS } from './components/RouteVisualizer';
import AirlineCustomizer, { AIRLINES_DATA } from './components/AirlineCustomizer';
import Checkout from './components/Checkout';
import { Rocket } from 'lucide-react';

export default function App() {
  const [aircraft, setAircraft] = React.useState(AIRCRAFT_DATA[0]);
  const [airline, setAirline] = React.useState(AIRLINES_DATA[0]);
  const [route, setRoute] = React.useState(ROUTE_OPTIONS[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-white">
            <Rocket className="w-5 h-5 text-sky-400" /> HanzTravel
          </div>
          <div className="text-xs text-white/70">© 2025 HanzTravel — Visit the Whole World</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Explore, Customize, and Book Your Flight</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Interactive 3D aircraft, animated routes, and a streamlined checkout — crafted with precision and designed for unforgettable journeys.</p>
        </section>

        <AircraftViewer selectedAircraftId={aircraft.id} onSelect={setAircraft} />

        <RouteVisualizer selectedAircraft={aircraft} onChange={setRoute} />

        <AirlineCustomizer selected={airline} onChange={setAirline} />

        <Checkout aircraft={aircraft} route={route} airline={airline} />
      </main>

      <footer className="px-4 py-8 text-center text-white/70">
        <div>© 2025 HanzTravel — Visit the Whole World</div>
        <div className="text-xs">Crafted with precision and passion.</div>
      </footer>
    </div>
  );
}
