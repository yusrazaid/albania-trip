/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Compass, 
  Coins, 
  CalendarDays, 
  Presentation, 
  Sparkles, 
  Printer, 
  ExternalLink,
  Car,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { SlideViewer } from './components/SlideViewer';
import { FriendShowcase } from './components/FriendShowcase';
import { RouteExplorer } from './components/RouteExplorer';
import { BudgetCalculator } from './components/BudgetCalculator';
import { DayScheduleModal } from './components/DayScheduleModal';
import { Slide1, Slide2, Slide3, Slide4, Slide5, Slide6 } from './components/SlideDeck';
import { EXPEDITION_META } from './data/expeditionData';

export default function App() {
  // Main view: 'showcase' (Friend proof-of-concept website) or 'slides' (A4 landscape presentation deck)
  const [activeTab, setActiveTab] = useState<'showcase' | 'slides'>('showcase');
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [slideViewMode, setSlideViewMode] = useState<'presentation' | 'document'>('presentation');

  // Interactive Modals
  const [isRouteModalOpen, setIsRouteModalOpen] = useState<boolean>(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState<boolean>(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white font-sans">
      {/* Universal Top Navigation Header */}
      <nav className="no-print sticky top-0 z-40 h-16 border-b border-slate-800/90 bg-slate-950/85 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-black text-sm">
            AL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                Albania Winter Expedition
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 hidden md:inline-block">
                Dec 3–6, 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {EXPEDITION_META.circuitSummary} • Lead: Zaid Abbasi
            </p>
          </div>
        </div>

        {/* Center: Main View Switcher (Showcase vs Briefing Deck) */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('showcase')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'showcase'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Friend Showcase</span>
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'slides'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>6-Slide Deck</span>
          </button>
        </div>

        {/* Right: Quick Tools & Print */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRouteModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-800 transition-colors"
            title="Inspect 570km Route"
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>570km Route</span>
          </button>

          <button
            onClick={() => setIsBudgetModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800 transition-colors"
            title="Open Master Budget"
          >
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
            <span>Budget</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-colors"
            title="Print or Save All Slides as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Print PDF</span>
          </button>
        </div>
      </nav>

      {/* Main Content View Container */}
      <main className="flex-1 w-full overflow-y-auto">
        {activeTab === 'showcase' ? (
          <div className="pt-4">
            <FriendShowcase
              onOpenDeckView={() => setActiveTab('slides')}
              onOpenRouteModal={() => setIsRouteModalOpen(true)}
              onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
              onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
            />
          </div>
        ) : (
          <div className="h-[calc(100vh-4rem)] flex flex-col">
            <SlideViewer
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              viewMode={slideViewMode}
              setViewMode={setSlideViewMode}
              onOpenRouteModal={() => setIsRouteModalOpen(true)}
              onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
              onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Dedicated Print Container: Pre-rendered A4 Landscape Slides 1 to 6 */}
      <div className="hidden print:block print-only">
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <Slide4 />
        <Slide5 />
        <Slide6 />
      </div>

      {/* Companion Modals */}
      <RouteExplorer
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
      />

      <BudgetCalculator
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />

      <DayScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </div>
  );
}
