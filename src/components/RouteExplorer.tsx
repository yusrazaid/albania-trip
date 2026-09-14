import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Clock, 
  Mountain, 
  Sun, 
  Car, 
  ShieldAlert, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { EXPEDITION_META, WAYPOINTS } from '../data/expeditionData';
import { Waypoint } from '../types';

interface RouteExplorerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RouteExplorer: React.FC<RouteExplorerProps> = ({ isOpen, onClose }) => {
  const [selectedLeg, setSelectedLeg] = useState<number | 'all'>('all');
  const [activeWaypoint, setActiveWaypoint] = useState<Waypoint | null>(WAYPOINTS[0]);

  if (!isOpen) return null;

  const filteredWaypoints = selectedLeg === 'all' 
    ? WAYPOINTS 
    : WAYPOINTS.filter(w => w.leg === selectedLeg);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">The Grand Southern & Coastal Loop</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {EXPEDITION_META.totalKm} km Circuit
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mountains, UNESCO Citadels, Adriatic Coast & 1,043m High Mountain Pass
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={EXPEDITION_META.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Daylight Advisory Banner */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border-b border-amber-500/20 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Daylight Window Locked:</strong> In early December, Albanian sunrise is ~06:50 and sunset is at <strong>16:15</strong>. All mountain drives are scheduled between 10:00 AM and 4:15 PM.
            </span>
          </div>
          <span className="font-mono text-[11px] text-amber-400/80 hidden sm:inline">Winter Twilight Safe</span>
        </div>

        {/* Content Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Waypoints List & Leg Filter */}
          <div className="md:col-span-6 lg:col-span-5 border-r border-slate-800 overflow-y-auto p-4 flex flex-col gap-3">
            {/* Leg Filter Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setSelectedLeg('all')}
                className={`py-1.5 rounded text-center transition-colors ${
                  selectedLeg === 'all' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All 10 Stops
              </button>
              <button
                onClick={() => setSelectedLeg(1)}
                className={`py-1.5 rounded text-center transition-colors ${
                  selectedLeg === 1 ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Leg 1 (Dec 3)
              </button>
              <button
                onClick={() => setSelectedLeg(2)}
                className={`py-1.5 rounded text-center transition-colors ${
                  selectedLeg === 2 ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Leg 2 (Dec 4)
              </button>
              <button
                onClick={() => setSelectedLeg(3)}
                className={`py-1.5 rounded text-center transition-colors ${
                  selectedLeg === 3 ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Leg 3 (Dec 5-6)
              </button>
            </div>

            {/* Waypoint Cards */}
            <div className="flex flex-col gap-2 mt-1">
              {filteredWaypoints.map((wp, idx) => {
                const isSelected = activeWaypoint?.id === wp.id;
                return (
                  <div
                    key={wp.id}
                    onClick={() => setActiveWaypoint(wp)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-left flex items-start justify-between ${
                      isSelected
                        ? 'bg-sky-950/50 border-sky-500/80 shadow-md shadow-sky-950/40'
                        : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected 
                          ? 'bg-sky-500 text-white' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          {wp.name}
                        </h4>
                        {wp.albanianName && (
                          <div className="text-[11px] text-slate-400 italic">
                            {wp.albanianName}
                          </div>
                        )}
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sky-400" />
                            {wp.time}
                          </span>
                          {wp.elevation && (
                            <span className="flex items-center gap-1">
                              <Mountain className="w-3 h-3 text-amber-400" />
                              {wp.elevation}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                      isSelected ? 'text-sky-400 translate-x-0.5' : 'text-slate-600'
                    }`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Waypoint Details Panel */}
          <div className="md:col-span-6 lg:col-span-7 bg-slate-950/30 p-5 overflow-y-auto flex flex-col justify-between">
            {activeWaypoint ? (
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/60">
                      Day {activeWaypoint.day} • Leg {activeWaypoint.leg}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Car className="w-3 h-3 text-slate-400" />
                      Drive: {activeWaypoint.driveTimeFromPrev}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white">{activeWaypoint.name}</h3>
                  {activeWaypoint.albanianName && (
                    <p className="text-xs text-slate-400 italic mt-0.5">
                      Local name: {activeWaypoint.albanianName}
                    </p>
                  )}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Arrival Target</span>
                    <span className="text-sm font-bold text-white">{activeWaypoint.time}</span>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Terrain Elevation</span>
                    <span className="text-sm font-bold text-amber-300">{activeWaypoint.elevation || 'Sea Level'}</span>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Expedition Leg</span>
                    <span className="text-sm font-bold text-sky-400">Leg {activeWaypoint.leg}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5">
                  <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Key Expedition Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {activeWaypoint.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5"></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Logistics Tip */}
                <div className="bg-sky-950/40 border border-sky-500/30 rounded-xl p-3.5 text-xs text-sky-100 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sky-300 block mb-0.5">Navigator Advisory</strong>
                    <p className="text-slate-300 leading-relaxed">{activeWaypoint.tips}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 py-12">
                Select a stop along the circuit to view logistics and highlights.
              </div>
            )}

            {/* Circuit String footer */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Grand Route: 563 km Total Circuit</span>
              <span className="text-sky-400 font-mono">Hyundai H1 Minivan Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
