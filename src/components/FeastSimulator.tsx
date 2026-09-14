import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Plus, 
  Minus, 
  RotateCcw, 
  Receipt, 
  Check, 
  Coins,
  Wine,
  Coffee,
  Fish,
  Flame
} from 'lucide-react';
import { DINING_POWER_ITEMS, FINANCIAL_BREAKDOWN } from '../data/expeditionData';

export const FeastSimulator: React.FC = () => {
  const [selectedCounts, setSelectedCounts] = useState<{ [id: string]: number }>({
    'tave-kosi': 1,
    'byrek': 1,
    'korca-beer': 1,
    'mountain-tea': 1,
  });

  const [currency, setCurrency] = useState<'EUR' | 'GBP' | 'ALL'>('EUR');

  const rates = { EUR: 1.0, GBP: 0.85, ALL: 100.0 };
  const currencySymbols = { EUR: '€', GBP: '£', ALL: 'Lek ' };

  const dailyCapEur = FINANCIAL_BREAKDOWN.dailyDiningAllowanceEur; // €24.00
  const dailyCapGbp = FINANCIAL_BREAKDOWN.dailyDiningAllowanceGbp; // £20.50

  const handleIncrement = (id: string) => {
    setSelectedCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setSelectedCounts(prev => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const handleReset = () => {
    setSelectedCounts({
      'tave-kosi': 1,
      'byrek': 1,
      'korca-beer': 1,
      'mountain-tea': 1,
    });
  };

  // Calculate totals
  const totalEur = Object.entries(selectedCounts).reduce((sum: number, [id, qty]: [string, number]) => {
    const item = DINING_POWER_ITEMS.find(i => i.id === id);
    return sum + (item ? item.costEur * Number(qty) : 0);
  }, 0);

  const totalGbp = totalEur * 0.85;
  const remainingEur = dailyCapEur - totalEur;
  const percentUsed = Math.min(100, Math.round((totalEur / dailyCapEur) * 100));

  const formatPrice = (eurVal: number) => {
    if (currency === 'EUR') return `€${eurVal.toFixed(2)}`;
    if (currency === 'GBP') return `£${(eurVal * 0.85).toFixed(2)}`;
    return `${Math.round(eurVal * 100).toLocaleString()} ALL`;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden" id="feast-simulator">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Tavern Dining Superpower Simulator
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ~£20.50 (€24) / Person / Day
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Build your personal daily feast & test how far our remaining £573.13 cash pool goes in Albania
            </p>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
            {(['EUR', 'GBP', 'ALL'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  currency === curr
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {curr === 'EUR' ? '€ EUR' : curr === 'GBP' ? '£ GBP' : 'Lek ALL'}
              </button>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Reset to sample feast"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Budget Utilization Gauge */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 my-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <span className="text-xs font-bold text-white">Daily Dining Gauge</span>
            <span className="text-xs text-slate-400 ml-2">
              Budget: <strong>{formatPrice(dailyCapEur)}</strong> / person
            </span>
          </div>
          <div className="text-xs font-mono font-bold">
            <span className={remainingEur >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
              Total Selected: {formatPrice(totalEur)}
            </span>
            <span className="text-slate-500 mx-1.5">•</span>
            <span className={remainingEur >= 0 ? 'text-slate-300' : 'text-rose-400'}>
              {remainingEur >= 0 
                ? `${formatPrice(remainingEur)} remaining`
                : `${formatPrice(Math.abs(remainingEur))} over cap`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              remainingEur >= 0 ? 'bg-gradient-to-r from-emerald-500 to-sky-400' : 'bg-rose-500'
            }`}
            style={{ width: `${Math.min(100, percentUsed)}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-400 mt-2">
          💡 <em>Pro-tip:</em> In the UK, £20.50 barely covers a pint and a burger. In traditional Albanian cellars, it pays for <strong>full multi-course banquets</strong> of slow-baked lamb, fresh Adriatic calamari, village salads, mountain tea, and craft beers!
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {DINING_POWER_ITEMS.map((item) => {
          const qty = selectedCounts[item.id] || 0;
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                qty > 0 
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm' 
                  : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-serif italic">
                      {item.albanianName}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700 shrink-0">
                    {formatPrice(item.costEur)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-700/40">
                <span className="text-[10px] uppercase font-semibold text-slate-500">
                  {item.category}
                </span>

                <div className="flex items-center gap-2">
                  {qty > 0 && (
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs transition-colors"
                      title="Remove one"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  )}
                  {qty > 0 && (
                    <span className="text-xs font-mono font-bold text-white min-w-[14px] text-center">
                      {qty}
                    </span>
                  )}
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="w-6 h-6 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center text-xs transition-colors shadow-sm"
                    title="Add to daily feast"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
