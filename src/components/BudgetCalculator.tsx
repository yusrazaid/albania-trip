import React, { useState } from 'react';
import { 
  X, 
  Coins, 
  CreditCard, 
  UtensilsCrossed, 
  Receipt, 
  CheckCircle2, 
  ShieldCheck, 
  PieChart, 
  ArrowRightLeft,
  Sparkles,
  Info
} from 'lucide-react';
import { EXPEDITION_META, FINANCIAL_BREAKDOWN, BUDGET_ITEMS, DINING_POWER_ITEMS } from '../data/expeditionData';

interface BudgetCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ isOpen, onClose }) => {
  const [currency, setCurrency] = useState<'GBP' | 'EUR' | 'ALL'>('GBP');
  const [selectedTravelerCount, setSelectedTravelerCount] = useState<number>(7);

  // Conversion rates (approx standard)
  // 1 GBP = 1.18 EUR
  // 1 GBP = 118 ALL
  const rates = {
    GBP: 1.0,
    EUR: 1.18,
    ALL: 118.0,
  };

  const currencySymbols = {
    GBP: '£',
    EUR: '€',
    ALL: 'Lek ',
  };

  const formatMoney = (amountGbp: number) => {
    const val = amountGbp * rates[currency];
    if (currency === 'ALL') {
      return `${Math.round(val).toLocaleString()} Lek`;
    }
    return `${currencySymbols[currency]}${val.toFixed(2)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Financial Reconciliation & Dining Power</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% Balanced Master Ledger
                </span>
              </div>
              <p className="text-xs text-slate-400">
                £200/person master ceiling • Total pool: £1,400 for {EXPEDITION_META.travelers} travelers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency selector */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              {(['GBP', 'EUR', 'ALL'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                    currency === curr ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Top Cards: Key Financials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Master Cap (Group)</span>
              <span className="text-xl font-extrabold text-white mt-0.5 block">{formatMoney(FINANCIAL_BREAKDOWN.totalCap)}</span>
              <span className="text-[11px] text-slate-500 block mt-1">£200.00 / traveler</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block">Fixed Cost Per Person</span>
              <span className="text-xl font-extrabold text-sky-400 mt-0.5 block">{formatMoney(FINANCIAL_BREAKDOWN.fixedPerPerson)}</span>
              <span className="text-[11px] text-slate-400 block mt-1">Flights + 3 nights hotel</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">Remaining Cash Pool</span>
              <span className="text-xl font-extrabold text-emerald-400 mt-0.5 block">{formatMoney(FINANCIAL_BREAKDOWN.remainingPool)}</span>
              <span className="text-[11px] text-emerald-400/80 block mt-1">Fuel, Desk balance & Food</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">Daily Food Allowance</span>
              <span className="text-xl font-extrabold text-amber-300 mt-0.5 block">{formatMoney(FINANCIAL_BREAKDOWN.dailyFoodPerPersonGbp)}</span>
              <span className="text-[11px] text-slate-400 block mt-1">Per person / per day feast</span>
            </div>
          </div>

          {/* Master Budget Reconciliation Table */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-sky-400" />
              Master Ledger & Booking Audit
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="text-left py-2 font-semibold">Expense Category</th>
                    <th className="text-left py-2 font-semibold">Total Group</th>
                    <th className="text-left py-2 font-semibold">Per Traveler (7)</th>
                    <th className="text-left py-2 font-semibold">Status</th>
                    <th className="text-left py-2 font-semibold">Logistics Reference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {BUDGET_ITEMS.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 font-bold text-white">{item.category}</td>
                      <td className="py-2.5">{formatMoney(item.committedGbp)}</td>
                      <td className="py-2.5">{formatMoney(item.perPersonGbp)}</td>
                      <td className="py-2.5">
                        <span className="tag">{item.status}</span>
                      </td>
                      <td className="py-2.5 text-slate-400 text-[11px]">{item.details}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-800/40 font-bold text-slate-100">
                    <td className="py-2.5">Total Committed Upfront</td>
                    <td className="py-2.5 text-sky-400">{formatMoney(FINANCIAL_BREAKDOWN.totalCommitted)}</td>
                    <td className="py-2.5 text-sky-400">{formatMoney(FINANCIAL_BREAKDOWN.fixedPerPerson)}</td>
                    <td className="py-2.5"><span className="tag tag-amber">43.0% of Cap</span></td>
                    <td className="py-2.5 text-slate-400 text-[11px]">Includes all flights and private lodging for 8</td>
                  </tr>
                  <tr className="bg-emerald-950/20 font-bold text-emerald-300">
                    <td className="py-2.5">Remaining Cash Pool</td>
                    <td className="py-2.5">{formatMoney(FINANCIAL_BREAKDOWN.remainingPool)}</td>
                    <td className="py-2.5">{formatMoney(FINANCIAL_BREAKDOWN.remainingPool / 7)}</td>
                    <td className="py-2.5"><span className="tag">Reserved Cash</span></td>
                    <td className="py-2.5 text-emerald-400/80 text-[11px]">Covers €140 desk car balance, fuel, and all dinners</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Organizer Reimbursement Audit Note */}
            <div className="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Organizer Reimbursement Audit:</strong>
                <p className="mt-0.5 text-slate-400">
                  Shared upfront commitments total <strong>{formatMoney(FINANCIAL_BREAKDOWN.sharedUpfrontCommitment)}</strong> ({formatMoney(FINANCIAL_BREAKDOWN.sharedUpfrontPerPerson)} per person).
                  The net reimbursement due to lead organizer <strong>{EXPEDITION_META.leadOrganizer}</strong> is <strong>+{formatMoney(FINANCIAL_BREAKDOWN.reimbursementToZaid)}</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Luxury Dining Power Simulator */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-slate-200">
                  Albanian Dining Purchasing Power (What {formatMoney(16.18)} / Day Buys)
                </h3>
              </div>
              <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Tavern Feast Mode
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Albania boasts one of Europe's lowest restaurant cost indexes with incredible Mediterranean and Ottoman culinary traditions. Our remaining <strong>{formatMoney(FINANCIAL_BREAKDOWN.freeDiningPoolGbp)}</strong> food pool affords royal portions every day:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {DINING_POWER_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div>
                    <span className="font-semibold text-slate-200 block">{item.name}</span>
                    <span className="text-[10px] text-slate-400">{item.category}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 ml-2 shrink-0">
                    {formatMoney(item.costGbp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>Zero hidden charges • 100% balanced across 7 travelers</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
