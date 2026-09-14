import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Car, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  PlusCircle, 
  Sparkles, 
  Briefcase, 
  Luggage,
  X,
  Edit2,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { TravelerSeat } from '../types';
import { INITIAL_TRAVELER_SEATS, EXPEDITION_META } from '../data/expeditionData';

const STORAGE_KEY = 'albania_expedition_seats_v2';

const ROLES_LIST = [
  'Chief Co-Pilot & Offline GPS Navigator',
  'Master DJ & Balkan Soundtracks',
  'Byrek & Roadside Snack Logistics Specialist',
  'Head of Photography & Drone Operations',
  'Albanian Language & Local Bargainer',
  'Evening Raki Ambassador & Hype Commander',
  'Treasurer & Receipt Scribe',
];

export const VanSeatingRoster: React.FC = () => {
  const [seats, setSeats] = useState<TravelerSeat[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved seats', e);
      }
    }
    return INITIAL_TRAVELER_SEATS;
  });

  const [activeModalSeat, setActiveModalSeat] = useState<TravelerSeat | null>(null);
  const [nameInput, setNameInput] = useState<string>('');
  const [roleInput, setRoleInput] = useState<string>(ROLES_LIST[0]);
  const [checklistState, setChecklistState] = useState({
    passport: true,
    warmLayers: true,
    hikingFootwear: true,
    appetite: true,
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seats));
  }, [seats]);

  const claimedCount = seats.filter(s => s.isClaimed).length;
  const remainingCount = seats.length - claimedCount;

  const handleOpenClaimModal = (seat: TravelerSeat) => {
    if (seat.isLocked) return;
    setActiveModalSeat(seat);
    setNameInput(seat.travelerName || '');
    setRoleInput(seat.role || ROLES_LIST[0]);
    setChecklistState(seat.checklist || {
      passport: true,
      warmLayers: true,
      hikingFootwear: true,
      appetite: true,
    });
  };

  const handleSaveSeat = () => {
    if (!activeModalSeat) return;
    const trimmedName = nameInput.trim();
    if (!trimmedName) return;

    setSeats(prev => prev.map(s => {
      if (s.seatId === activeModalSeat.seatId) {
        return {
          ...s,
          travelerName: trimmedName,
          role: roleInput,
          isClaimed: true,
          checklist: checklistState,
        };
      }
      return s;
    }));

    setActiveModalSeat(null);
  };

  const handleVacateSeat = (seatId: string) => {
    setSeats(prev => prev.map(s => {
      if (s.seatId === seatId && !s.isLocked) {
        return {
          ...s,
          travelerName: '',
          isClaimed: false,
          checklist: { passport: false, warmLayers: false, hikingFootwear: false, appetite: true },
        };
      }
      return s;
    }));
    setActiveModalSeat(null);
  };

  const handleResetSeats = () => {
    if (window.confirm('Reset seating roster back to default?')) {
      setSeats(INITIAL_TRAVELER_SEATS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden" id="van-seating">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Hyundai H1 Automatic (8-Seater) Seating & Roster
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {claimedCount} of {seats.length} Seats Claimed
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ref: {EXPEDITION_META.vehicleBookingRef} • Radius Car Rental • 3 Full Adult Rows + 850L Luggage Hold
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleResetSeats}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-colors"
            title="Reset roster"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Pill Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-5">
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-3 text-center">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-1">Lead Driver</span>
          <span className="text-xs font-bold text-sky-400">Zaid Abbasi</span>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-3 text-center">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-1">Open Spots</span>
          <span className="text-xs font-bold text-emerald-400">{remainingCount} Available</span>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-3 text-center">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-1">Luggage Capacity</span>
          <span className="text-xs font-bold text-indigo-300">850 Litres (7 Bags)</span>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-3 text-center">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-1">Fixed Cost Share</span>
          <span className="text-xs font-bold text-amber-400">£35.57 / person</span>
        </div>
      </div>

      {/* Van Visual Cabin Layout */}
      <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 sm:p-5 relative">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            Interior Cabin Seating Plan (Front Windshield ➔ Rear Cargo)
          </span>
          <span className="text-[11px] text-slate-500 font-normal">Click any seat to claim or edit your spot</span>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {/* Row 1: Cockpit (Driver & Co-Pilot) */}
          <div className="border border-slate-800/80 bg-slate-900/50 rounded-xl p-3">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Row 1: Cockpit & Navigation</span>
              <span className="text-slate-400 text-[10px]">Dual Front Console</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {seats.slice(0, 2).map((seat) => renderSeatCard(seat, handleOpenClaimModal))}
            </div>
          </div>

          {/* Row 2: Mid-Cabin (3 Adult Seats) */}
          <div className="border border-slate-800/80 bg-slate-900/50 rounded-xl p-3">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Row 2: Mid-Cabin Executive Bench</span>
              <span className="text-slate-400 text-[10px]">3 Adult Seats • Full Legroom</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {seats.slice(2, 5).map((seat) => renderSeatCard(seat, handleOpenClaimModal))}
            </div>
          </div>

          {/* Row 3: Rear-Cabin (3 Adult Seats) */}
          <div className="border border-slate-800/80 bg-slate-900/50 rounded-xl p-3">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Row 3: Panoramic Rear Bench</span>
              <span className="text-slate-400 text-[10px]">3 Adult Seats • Elevated Glass</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {seats.slice(5, 7).map((seat) => renderSeatCard(seat, handleOpenClaimModal))}
            </div>
          </div>

          {/* Rear Cargo Bay: 850L Trunk */}
          <div className="border border-dashed border-sky-500/30 bg-sky-950/20 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                <Luggage className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">850-Litre Dedicated Rear Cargo Hold</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Pre-audited for 7 cabin backpacks + Zaid's 10kg checked case. Zero luggage piled on laps!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ✓ 100% Fit Confirmed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Claim / Edit Modal */}
      {activeModalSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {activeModalSeat.isClaimed ? 'Edit Seat Details' : 'Claim Your Van Seat'}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Row {activeModalSeat.row} • {activeModalSeat.position.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalSeat(null)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Your Name / Nickname
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Talat, Alex, Omar..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Roadtrip Role & Superpower
                </label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-400"
                >
                  {ROLES_LIST.map((r, idx) => (
                    <option key={idx} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Ready Checklist */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Pre-Flight Readiness Check
                </label>
                <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklistState.passport}
                      onChange={(e) => setChecklistState(prev => ({ ...prev, passport: e.target.checked }))}
                      className="rounded border-slate-700 text-sky-500 focus:ring-0"
                    />
                    <span>Passport valid 6+ months from Dec 2026</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklistState.warmLayers}
                      onChange={(e) => setChecklistState(prev => ({ ...prev, warmLayers: e.target.checked }))}
                      className="rounded border-slate-700 text-sky-500 focus:ring-0"
                    />
                    <span>Warm fleece/jacket for Llogara Pass (1,043m)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklistState.hikingFootwear}
                      onChange={(e) => setChecklistState(prev => ({ ...prev, hikingFootwear: e.target.checked }))}
                      className="rounded border-slate-700 text-sky-500 focus:ring-0"
                    />
                    <span>Good walking boots for Berat & Krujë cobblestones</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklistState.appetite}
                      onChange={(e) => setChecklistState(prev => ({ ...prev, appetite: e.target.checked }))}
                      className="rounded border-slate-700 text-sky-500 focus:ring-0"
                    />
                    <span>Voracious appetite for Tavë Kosi & Adriatic sea bass</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-2">
              {activeModalSeat.isClaimed && !activeModalSeat.isLocked ? (
                <button
                  onClick={() => handleVacateSeat(activeModalSeat.seatId)}
                  className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vacate Seat</span>
                </button>
              ) : <div></div>}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalSeat(null)}
                  className="px-3.5 py-2 text-xs text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSeat}
                  disabled={!nameInput.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Spot</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function renderSeatCard(
  seat: TravelerSeat, 
  onClaim: (seat: TravelerSeat) => void
) {
  const isDriver = seat.position === 'driver';

  return (
    <div
      key={seat.seatId}
      onClick={() => onClaim(seat)}
      className={`p-3 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between min-h-[92px] ${
        seat.isClaimed
          ? isDriver
            ? 'bg-sky-950/40 border-sky-500/40 hover:border-sky-400'
            : 'bg-slate-800/80 border-slate-700/80 hover:border-sky-400'
          : 'bg-slate-900/40 border-dashed border-slate-700/60 hover:border-sky-500/60 hover:bg-slate-800/40'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400 flex items-center gap-1">
            {isDriver ? 'Driver (Operations)' : `Seat: ${seat.position}`}
          </span>
          {seat.isClaimed ? (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              <CheckCircle2 className="w-2.5 h-2.5" /> Confirmed
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-sky-400 group-hover:underline flex items-center gap-0.5">
              <PlusCircle className="w-2.5 h-2.5" /> Claim
            </span>
          )}
        </div>

        {seat.isClaimed ? (
          <div>
            <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
              {seat.travelerName}
            </h4>
            <p className="text-[11px] text-sky-400 font-medium line-clamp-1 mt-0.5">
              {seat.role}
            </p>
          </div>
        ) : (
          <div className="py-1">
            <span className="text-xs font-medium text-slate-400 block">Available Spot</span>
            <span className="text-[10px] text-slate-500">Tap to assign your name</span>
          </div>
        )}
      </div>

      {seat.isClaimed && !seat.isLocked && (
        <div className="flex items-center justify-between pt-1 mt-1 border-t border-slate-700/30 text-[10px] text-slate-500">
          <span>Click to edit</span>
          <Edit2 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
    </div>
  );
}
