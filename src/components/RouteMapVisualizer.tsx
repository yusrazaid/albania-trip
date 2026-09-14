import React, { useState } from 'react';
import { 
  Navigation, 
  ExternalLink, 
  Mountain, 
  Clock, 
  Sun, 
  ShieldCheck, 
  MapPin, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { EXPEDITION_META, WAYPOINTS } from '../data/expeditionData';

export const RouteMapVisualizer: React.FC = () => {
  const [activeWaypointId, setActiveWaypointId] = useState<string>(WAYPOINTS[0].id);

  const activeWp = WAYPOINTS.find(w => w.id === activeWaypointId) || WAYPOINTS[0];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden" id="route-visualizer">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                570 km Scenic Circuit & Elevation Profile
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                100% Daylight Optimized
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Mountain Strongholds, UNESCO Stone Cities, Adriatic Coastlines & High Alpine Pass
            </p>
          </div>
        </div>

        <a
          href={EXPEDITION_META.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Daylight & Safety Pill Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Winter Daylight Window</span>
            <span className="text-xs font-bold text-white">07:05 AM Sunrise • 16:15 PM Sunset</span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Highest Summit Point</span>
            <span className="text-xs font-bold text-sky-300">Llogara Pass (1,043m Elevation)</span>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Driving Safety Protocol</span>
            <span className="text-xs font-bold text-emerald-400">All mountain highway legs in daylight</span>
          </div>
        </div>
      </div>

      {/* Elevation Curve SVG & Waypoint Node Strip */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 relative overflow-x-auto">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between min-w-[650px]">
          <span>Interactive Elevation Profile (Sea Level ➔ 1,043m Summit)</span>
          <span className="text-slate-500 font-normal">Select a stop to inspect itinerary details</span>
        </div>

        {/* SVG Profile Chart */}
        <div className="min-w-[650px] relative py-2">
          <svg viewBox="0 0 700 130" className="w-full h-32 overflow-visible">
            <defs>
              <linearGradient id="elevationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid line guidelines */}
            <line x1="0" y1="20" x2="700" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <text x="5" y="18" fill="#64748b" fontSize="8">1,000m</text>

            <line x1="0" y1="65" x2="700" y2="65" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <text x="5" y="63" fill="#64748b" fontSize="8">500m</text>

            <line x1="0" y1="110" x2="700" y2="110" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <text x="5" y="108" fill="#64748b" fontSize="8">0m</text>

            {/* Elevation Area Curve */}
            {/* Points: 
                TIA (38m -> y=106)
                Krujë (600m -> y=55)
                Berat (58m -> y=104)
                Apollonia (102m -> y=100)
                Vlorë (5m -> y=109)
                Llogara (1,043m -> y=16)
                Zvërnec (2m -> y=110)
                Durrës (15m -> y=108)
                Tirana (110m -> y=100)
                Bovilla (420m -> y=72)
                TIA (38m -> y=106)
            */}
            <path
              d="M 30 106 
                 L 100 55 
                 L 170 104 
                 L 240 100 
                 L 310 109 
                 L 380 16 
                 L 450 110 
                 L 520 108 
                 L 580 100 
                 L 640 72 
                 L 680 106 
                 L 680 120 
                 L 30 120 Z"
              fill="url(#elevationGrad)"
            />

            {/* Elevation Outline Line */}
            <path
              d="M 30 106 
                 L 100 55 
                 L 170 104 
                 L 240 100 
                 L 310 109 
                 L 380 16 
                 L 450 110 
                 L 520 108 
                 L 580 100 
                 L 640 72 
                 L 680 106"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />

            {/* Peak Callout for Llogara Pass */}
            <circle cx="380" cy="16" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="345" y="0" width="70" height="15" rx="3" fill="#ef4444" />
            <text x="380" y="11" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
              1,043m Peak
            </text>
          </svg>

          {/* Interactive Stop Buttons along the horizontal line */}
          <div className="flex justify-between items-center pt-2">
            {WAYPOINTS.map((wp) => {
              const isSelected = wp.id === activeWaypointId;
              return (
                <button
                  key={wp.id}
                  onClick={() => setActiveWaypointId(wp.id)}
                  className={`flex flex-col items-center group transition-all ${
                    isSelected ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full mb-1 transition-all ${
                      isSelected
                        ? 'bg-sky-400 ring-4 ring-sky-400/30'
                        : wp.elevation && parseInt(wp.elevation) > 900
                        ? 'bg-red-400'
                        : 'bg-slate-600 group-hover:bg-slate-400'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold max-w-[65px] text-center truncate ${
                      isSelected ? 'text-sky-300' : 'text-slate-400'
                    }`}
                  >
                    {wp.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {wp.elevation || '0m'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Waypoint Details Card */}
      <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Day {activeWp.day} • Leg {activeWp.leg} • {activeWp.time}
            </span>
            <span className="text-xs text-slate-400">
              Elevation: <strong>{activeWp.elevation}</strong>
            </span>
            {activeWp.driveTimeFromPrev && (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {activeWp.driveTimeFromPrev}
              </span>
            )}
          </div>

          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span>{activeWp.name}</span>
            {activeWp.albanianName && (
              <span className="text-xs font-normal text-slate-400 italic">
                ({activeWp.albanianName})
              </span>
            )}
          </h4>

          <ul className="space-y-1 pt-1">
            {activeWp.highlights.map((hl, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                <span className="text-sky-400 shrink-0">•</span>
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg sm:max-w-xs shrink-0 w-full sm:w-auto">
          <span className="text-[10px] uppercase font-bold text-sky-400 block mb-1">
            Operational Note
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeWp.tips}
          </p>
        </div>
      </div>
    </div>
  );
};
