import React, { useState } from 'react';
import { 
  X, 
  CalendarDays, 
  Clock, 
  MapPin, 
  Hotel, 
  Utensils, 
  Car, 
  Sparkles, 
  Sunset,
  Camera,
  Coffee,
  Plane,
  Building2
} from 'lucide-react';
import { ITINERARY, EXPEDITION_META } from '../data/expeditionData';

interface DayScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DayScheduleModal: React.FC<DayScheduleModalProps> = ({ isOpen, onClose }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentDay = ITINERARY[selectedDayIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Day-by-Day Epic Schedule</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  4 Days / 3 Nights
                </span>
              </div>
              <p className="text-xs text-slate-400">
                10:00 AM – 10:00 PM Winter Daylight Optimized Itinerary
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Day Selector Pills */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          {ITINERARY.map((day, idx) => (
            <button
              key={day.day}
              onClick={() => setSelectedDayIndex(idx)}
              className={`flex-1 min-w-[140px] p-2.5 rounded-xl border text-left transition-all ${
                selectedDayIndex === idx
                  ? 'bg-sky-950/80 border-sky-400 shadow-sm text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                Day {day.day} • {day.weekday}
              </div>
              <div className="text-xs font-bold truncate mt-0.5 text-slate-200">{day.title}</div>
              <div className="text-[10px] text-slate-400">{day.date}</div>
            </button>
          ))}
        </div>

        {/* Selected Day Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Day Overview Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-slate-900 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                {currentDay.date} ({currentDay.weekday})
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">{currentDay.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{currentDay.subtitle}</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-200 shrink-0">
              <div className="flex items-center gap-1.5 text-sky-300 font-semibold mb-1">
                <Hotel className="w-3.5 h-3.5 text-sky-400" />
                Overnight Base
              </div>
              <div className="font-bold text-white text-[11px]">{currentDay.hotel}</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                {currentDay.breakfastIncluded ? '✓ Breakfast Included' : 'Self-catered / Market breakfast'}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Schedule Timeblocks
            </h4>

            <div className="relative pl-6 border-l-2 border-slate-800 space-y-4 ml-3">
              {currentDay.schedule.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-sky-400 group-hover:bg-sky-400 transition-colors"></div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-extrabold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/50">
                        {item.time}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {item.location}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-white">{item.activity}</h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-300/90">
            <Sunset className="w-4 h-4 text-amber-400" />
            <span>Winter sunset: ~16:15. Mountain crossings scheduled for peak daylight.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
