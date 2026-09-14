import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Car, 
  Coins, 
  Compass, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Presentation, 
  Printer, 
  Clock, 
  Coffee, 
  Hotel, 
  Plane, 
  Mountain, 
  UtensilsCrossed, 
  ChevronRight,
  Info,
  Layers,
  FileText,
  Flame,
  Volume2
} from 'lucide-react';
import { EXPEDITION_META, FINANCIAL_BREAKDOWN, BUDGET_ITEMS, ITINERARY, ALBANIAN_PHRASES } from '../data/expeditionData';
import { VanSeatingRoster } from './VanSeatingRoster';
import { FeastSimulator } from './FeastSimulator';
import { RouteMapVisualizer } from './RouteMapVisualizer';

interface FriendShowcaseProps {
  onOpenDeckView: () => void;
  onOpenRouteModal: () => void;
  onOpenBudgetModal: () => void;
  onOpenScheduleModal: () => void;
}

export const FriendShowcase: React.FC<FriendShowcaseProps> = ({
  onOpenDeckView,
  onOpenRouteModal,
  onOpenBudgetModal,
  onOpenScheduleModal,
}) => {
  const [selectedDayTab, setSelectedDayTab] = useState<number>(1);
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  // Live countdown timer to December 3, 2026 09:55 AM
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(EXPEDITION_META.takeoffTimestamp).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPhrase = (phrase: string) => {
    navigator.clipboard?.writeText(phrase);
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  const currentDayData = ITINERARY.find(d => d.day === selectedDayTab) || ITINERARY[0];

  return (
    <div className="w-full flex flex-col gap-10 pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* 1. HERO PITCH BANNER */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 blur-3xl -z-10 rounded-full pointer-events-none"></div>

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
            BALKAN GRAND CIRCUIT • DEC 3 – 6, 2026 • 7 TRAVELERS
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Albania Winter Expedition
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
            {EXPEDITION_META.tagline}
          </p>

          {/* Live Countdown Clock */}
          <div className="pt-2 pb-2">
            <div className="inline-flex items-center gap-3 sm:gap-6 bg-slate-900/90 border border-slate-800/90 backdrop-blur-md px-4 sm:px-6 py-3 rounded-2xl shadow-xl">
              <div className="flex flex-col items-center min-w-[52px]">
                <span className="text-xl sm:text-3xl font-black font-mono text-sky-400">{timeLeft.days}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">Days</span>
              </div>
              <span className="text-xl font-mono text-slate-600">:</span>
              <div className="flex flex-col items-center min-w-[52px]">
                <span className="text-xl sm:text-3xl font-black font-mono text-white">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">Hours</span>
              </div>
              <span className="text-xl font-mono text-slate-600">:</span>
              <div className="flex flex-col items-center min-w-[52px]">
                <span className="text-xl sm:text-3xl font-black font-mono text-white">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">Minutes</span>
              </div>
              <span className="text-xl font-mono text-slate-600">:</span>
              <div className="flex flex-col items-center min-w-[52px]">
                <span className="text-xl sm:text-3xl font-black font-mono text-emerald-400">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">Seconds</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Landing at TIA Airport • Ryanair RK8288 • Thursday, Dec 3, 2026 @ 09:55 AM
            </div>
          </div>

          {/* 4 Hero Pillars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Group Roster</span>
              <span className="text-sm sm:text-base font-bold text-white">{EXPEDITION_META.travelers} Adult Adventurers</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total Circuit</span>
              <span className="text-sm sm:text-base font-bold text-sky-400">{EXPEDITION_META.totalKm} km Scenic Loop</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Fleet Class</span>
              <span className="text-sm sm:text-base font-bold text-indigo-300">Hyundai H1 8-Seater</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 text-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Budget Discipline</span>
              <span className="text-sm sm:text-base font-bold text-emerald-400">£{EXPEDITION_META.masterCapGbp} Master Cap</span>
            </div>
          </div>

          {/* Quick Jump Action Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <a
              href="#van-seating"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 transition-all"
            >
              <Car className="w-4 h-4" />
              <span>Claim Your Van Seat</span>
            </a>

            <a
              href="#feast-simulator"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Test Dining Superpower</span>
            </a>

            <a
              href="#route-visualizer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>570km Route & Elevations</span>
            </a>

            <button
              onClick={onOpenDeckView}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold text-xs border border-indigo-500/40 transition-all"
            >
              <Presentation className="w-4 h-4 text-indigo-200" />
              <span>Executive 6-Slide Deck</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE THREE CORE VALUE PILLARS (Why this trip works) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Hotel className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Quality Without Compromise</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We bypassed cramped budget hatchbacks and hostel dorms. We secured an <strong>executive Hyundai H1 8-seater van</strong> (850L cargo bay) and <strong>3 nights of top-tier lodging</strong>: a private stone Ottoman villa in Berat, beachfront suites in Vlorë, and modern apartments in Tirana.
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Average Lodging:</span>
            <span className="font-bold text-sky-400">£11.20 / night / person</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Mountain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">The 570 km Grand Circuit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Experience the best of Albania without rushing: the 400-year-old Krujë Ottoman bazaar, 1,000 stone windows of Berat, 2,500-year-old Greek/Roman ruins at Apollonia, the dramatic 1,043m Llogara Pass into the Ionian Sea, and Bovilla fjord-like canyon.
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Daylight Schedule:</span>
            <span className="font-bold text-indigo-300">10:00 AM – 16:15 PM Safe Driving</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Astonishing Dining Power</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Because flights, lodging, and van deposits only cost £601.72 total, we have <strong>£573.13 in unallocated cash</strong>. That gives each traveler <strong>~£20.50 (€24) per day</strong> exclusively for restaurant feasts, fresh Adriatic sea bass, craft beer, and mountain tea!
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Food Cash Pool:</span>
            <span className="font-bold text-emerald-400">£81.88 / person pure cash</span>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE VAN CABIN & SEAT CLAIMER */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Group Roster & Cabin</span>
            <h2 className="text-xl font-bold text-white">Hyundai H1 8-Seater Van Seating Plan</h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Ref: G96389719 • Automatic Transmission</span>
        </div>
        <VanSeatingRoster />
      </section>

      {/* 4. 570 KM ROUTE & ELEVATION VISUALIZER */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Circuit Intel</span>
            <h2 className="text-xl font-bold text-white">Scenic Route & Elevation Profile</h2>
          </div>
          <button
            onClick={onOpenRouteModal}
            className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
          >
            <span>Open Detailed Waypoint Inspector</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <RouteMapVisualizer />
      </section>

      {/* 5. DAY-BY-DAY MASTER ITINERARY */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Day-by-Day Master Itinerary (10 AM – 10 PM)
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Seamless Flow • Balanced Pace
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Optimized for winter daylight, relaxed cultural exploration, and legendary dining
            </p>
          </div>

          {/* Day Tabs */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/60 overflow-x-auto">
            {ITINERARY.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDayTab(day.day)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                  selectedDayTab === day.day
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Day {day.day}: {day.weekday.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day Content */}
        <div className="pt-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                {currentDayData.weekday}, {currentDayData.date}
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                {currentDayData.title} — {currentDayData.subtitle}
              </h4>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-slate-400 block text-[10px]">Overnight Lodging:</span>
                <strong className="text-slate-200">{currentDayData.hotel}</strong>
              </div>
              {currentDayData.breakfastIncluded && (
                <span className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Breakfast Included
                </span>
              )}
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-2.5 pt-2">
            {currentDayData.schedule.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/50 hover:bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-3.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-2 py-1 rounded shrink-0">
                    {item.time}
                  </span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white">
                      {item.activity}
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 self-start sm:self-auto shrink-0">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINANCIAL AUDIT & FEAST SIMULATOR */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Transparency & Economics</span>
          <h2 className="text-xl font-bold text-white">Financial Reconciliation & Dining Superpower</h2>
        </div>

        {/* Master Group Ledger Table + What You Pay Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>📊 Master Group Ledger (£1,400 Total Cap)</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    100% Mathematically Reconciled
                  </span>
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3 text-left font-semibold">CATEGORY / LINE ITEM</th>
                      <th className="py-2 px-3 text-right font-semibold">AMOUNT</th>
                      <th className="py-2 px-3 text-right font-semibold">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {BUDGET_ITEMS.map((item, idx) => {
                      const isRemaining = item.category.includes('Remaining');
                      const isTotalPaid = item.category.includes('Total Already');
                      return (
                        <tr key={idx} className={isRemaining ? 'bg-emerald-950/20 font-semibold' : isTotalPaid ? 'bg-sky-950/20 font-semibold' : ''}>
                          <td className="py-2.5 px-3 text-slate-200">
                            {item.category}
                          </td>
                          <td className={`py-2.5 px-3 text-right font-mono font-bold ${
                            isRemaining ? 'text-emerald-400' : isTotalPaid ? 'text-sky-400' : 'text-slate-100'
                          }`}>
                            £{item.committedGbp.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                              item.statusType === 'paid' 
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : item.statusType === 'settled'
                                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                                : item.statusType === 'desk'
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-3 mt-3 border-t border-slate-800">
              * Fixed upfront costs total £248.99 (£35.57 / person). Current net reimbursement due to Zaid Abbasi is +£516.59.
            </div>
          </div>

          {/* What YOU Pay Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-sky-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Your Individual Breakdown</h4>
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  £200 Max
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-300">Shared Fixed Upfront (Hotels + Van Deposit):</span>
                  <span className="font-mono font-bold text-white">£35.57</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-300">Ryanair Flights (Return to London STN):</span>
                  <span className="font-mono font-bold text-white">£50.39</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-300">Fuel Pool & TIA Car Desk Share:</span>
                  <span className="font-mono font-bold text-white">£32.16</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800 text-emerald-400 font-semibold">
                  <span>Your Free Spending Cash (Food & Leisure):</span>
                  <span className="font-mono font-bold text-emerald-400">£81.88</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 bg-slate-950/40 p-3 rounded-xl">
              <div className="text-[11px] text-slate-400">
                You transfer only <strong>£35.57</strong> for upfront accommodation & car locking (plus your individual flight ticket). The remaining funds stay with you in cash for our daily tavern feasts!
              </div>
            </div>
          </div>
        </div>

        {/* Feast Simulator */}
        <FeastSimulator />
      </section>

      {/* 7. ALBANIAN PHRASEBOOK & ROADTRIP CHEAT SHEET */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🇦🇱 Albanian Roadtrip Phrasebook & Travel Cheat Sheet</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any phrase to copy it to your clipboard for your roadtrip notes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          {ALBANIAN_PHRASES.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleCopyPhrase(item.phrase)}
              className="bg-slate-950/70 hover:bg-slate-800/60 border border-slate-800 hover:border-sky-500/50 p-3 rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-sky-400 group-hover:text-sky-300">
                  {item.phrase}
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300">
                  {copiedPhrase === item.phrase ? 'Copied!' : 'Copy'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                /{item.phonetic}/
              </div>
              <div className="text-xs font-medium text-slate-200 mt-1">
                {item.english}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EXECUTIVE PRESENTATION DECK CTA BANNER */}
      <section className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-sky-950/60 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Presentation className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Official Master Presentation Deck (6 Slides)
            </h3>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            View the high-resolution 297mm × 210mm executive landscape slides matching the master briefing PDF with keyboard navigation, full-screen presentation mode, and print-to-PDF export.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDeckView}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/25 transition-all"
          >
            <Presentation className="w-4 h-4" />
            <span>Launch Slide Deck</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
            title="Export all 6 slides to PDF"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Print PDF</span>
          </button>
        </div>
      </section>
    </div>
  );
};
