import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Printer, 
  LayoutList, 
  Presentation, 
  Compass, 
  Coins, 
  CalendarDays,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { Slide1, Slide2, Slide3, Slide4, Slide5, Slide6 } from './SlideDeck';
import { SLIDE_METAS } from '../data/expeditionData';

interface SlideViewerProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  viewMode: 'presentation' | 'document';
  setViewMode: (mode: 'presentation' | 'document') => void;
  onOpenRouteModal: () => void;
  onOpenBudgetModal: () => void;
  onOpenScheduleModal: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  currentSlide,
  setCurrentSlide,
  viewMode,
  setViewMode,
  onOpenRouteModal,
  onOpenBudgetModal,
  onOpenScheduleModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [autoScale, setAutoScale] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Standard 297mm x 210mm at 96 DPI in CSS pixels:
  // 297mm * 96 / 25.4 = 1122.52px width, 210mm * 96 / 25.4 = 793.7px height
  const BASE_WIDTH = 1122.5;
  const BASE_HEIGHT = 793.7;

  useEffect(() => {
    if (!autoScale) return;

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const paddingX = 32;
      const paddingY = viewMode === 'presentation' ? 40 : 20;
      
      const availableWidth = Math.max(320, rect.width - paddingX);
      const availableHeight = viewMode === 'presentation' 
        ? Math.max(240, rect.height - paddingY) 
        : BASE_HEIGHT;

      const scaleX = availableWidth / BASE_WIDTH;
      const scaleY = viewMode === 'presentation' ? availableHeight / BASE_HEIGHT : scaleX;
      
      const computedScale = viewMode === 'presentation'
        ? Math.min(scaleX, scaleY, 1.15)
        : Math.min(scaleX, 1.05);

      setScale(Math.max(0.28, Math.min(computedScale, 1.4)));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [autoScale, viewMode, isFullscreen]);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'presentation') return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentSlide(Math.min(currentSlide + 1, 6));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlide(Math.max(currentSlide - 1, 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(6);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, viewMode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderSlide = (slideNum: number) => {
    switch (slideNum) {
      case 1:
        return <Slide1 onOpenRouteModal={onOpenRouteModal} />;
      case 2:
        return <Slide2 onOpenBudgetModal={onOpenBudgetModal} />;
      case 3:
        return <Slide3 onOpenRouteModal={onOpenRouteModal} />;
      case 4:
        return <Slide4 onOpenRouteModal={onOpenRouteModal} />;
      case 5:
        return <Slide5 onOpenScheduleModal={onOpenScheduleModal} />;
      case 6:
        return <Slide6 onOpenBudgetModal={onOpenBudgetModal} />;
      default:
        return <Slide1 onOpenRouteModal={onOpenRouteModal} />;
    }
  };

  const currentMeta = SLIDE_METAS[currentSlide - 1] || SLIDE_METAS[0];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden select-none">
      {/* Top Deck Control Header Bar */}
      <header className="no-print h-14 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between z-20 shrink-0">
        {/* Left: Deck Branding & Quick Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="font-bold text-sm tracking-tight text-white hidden sm:inline">
              Albania Expedition Briefing
            </span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block"></div>

          {/* View Mode Toggle: Slide vs Document */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
            <button
              onClick={() => setViewMode('presentation')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'presentation'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Presentation Mode (One slide scaled to viewport)"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Slides</span>
            </button>
            <button
              onClick={() => setViewMode('document')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'document'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Continuous Document Mode (All 6 slides stacked)"
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>All 6 Slides</span>
            </button>
          </div>
        </div>

        {/* Right: Companion Modals & Presentation Utilities */}
        <div className="flex items-center gap-2">
          {/* Quick Companion Tool Triggers */}
          <button
            onClick={onOpenRouteModal}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-sky-300 border border-slate-700 transition-colors"
            title="Inspect 570 km Scenic Route & Waypoints"
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden lg:inline">570km Route</span>
          </button>

          <button
            onClick={onOpenBudgetModal}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors"
            title="Open Master Budget & Currency Converter"
          >
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Budget & Dining</span>
          </button>

          <button
            onClick={onOpenScheduleModal}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors"
            title="Day-by-Day Schedule Breakdown"
          >
            <CalendarDays className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Schedule</span>
          </button>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-800/60 rounded-md p-0.5 border border-slate-700/50">
            <button
              onClick={() => { setAutoScale(false); setScale((s) => Math.max(0.3, s - 0.1)); }}
              className="p-1 text-slate-400 hover:text-slate-100 rounded hover:bg-slate-700/50 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1.5 text-slate-300 min-w-[42px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => { setAutoScale(false); setScale((s) => Math.min(1.5, s + 0.1)); }}
              className="p-1 text-slate-400 hover:text-slate-100 rounded hover:bg-slate-700/50 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setAutoScale(true); }}
              className="p-1 text-slate-400 hover:text-sky-300 rounded hover:bg-slate-700/50 transition-colors"
              title="Reset to Fit Screen"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Print / PDF button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
            title="Print or Export Deck to Landscape PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Slide Canvas Container */}
      <div 
        ref={containerRef}
        className="flex-1 w-full h-full overflow-auto flex flex-col items-center justify-start p-4 sm:p-6 bg-slate-950 relative"
      >
        {viewMode === 'presentation' ? (
          /* Single Slide Presentation Canvas */
          <div className="flex-1 flex items-center justify-center w-full min-h-0">
            <div
              style={{
                width: `${BASE_WIDTH * scale}px`,
                height: `${BASE_HEIGHT * scale}px`,
                position: 'relative',
                transition: 'width 0.15s ease-out, height 0.15s ease-out',
              }}
              className="shadow-2xl rounded-lg"
            >
              <div
                style={{
                  width: `${BASE_WIDTH}px`,
                  height: `${BASE_HEIGHT}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                {renderSlide(currentSlide)}
              </div>
            </div>
          </div>
        ) : (
          /* All Slides Continuous Document Mode (Print view ready) */
          <div className="flex flex-col items-center gap-8 w-full max-w-6xl print-container">
            {[1, 2, 3, 4, 5, 6].map((pageNum) => (
              <div 
                key={pageNum}
                className="w-full flex flex-col items-center relative"
                style={{
                  minHeight: `${BASE_HEIGHT * scale}px`,
                  marginBottom: '16px',
                }}
              >
                <div className="no-print text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  Slide {pageNum} of 6 • {SLIDE_METAS[pageNum - 1]?.title}
                </div>
                <div
                  style={{
                    width: `${BASE_WIDTH * scale}px`,
                    height: `${BASE_HEIGHT * scale}px`,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: `${BASE_WIDTH}px`,
                      height: `${BASE_HEIGHT}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  >
                    {renderSlide(pageNum)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Presentation Bottom Navigation Bar */}
      {viewMode === 'presentation' && (
        <footer className="no-print h-14 border-t border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
              disabled={currentSlide === 1}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Previous slide (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-medium text-slate-400 min-w-[75px] text-center">
              Slide <strong className="text-white">{currentSlide}</strong> of 6
            </span>

            <button
              onClick={() => setCurrentSlide(Math.min(6, currentSlide + 1))}
              disabled={currentSlide === 6}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Next slide (Right Arrow / Space)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide thumbnail / indicator pills (1 to 6) */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-200 ${
                  currentSlide === idx
                    ? 'w-8 bg-sky-400'
                    : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Jump to Slide ${idx}: ${SLIDE_METAS[idx - 1]?.title}`}
              />
            ))}
          </div>

          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-3">
            <span className="truncate max-w-[280px] font-medium text-slate-300">
              {currentMeta.title}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500 text-[11px]">Use ← / → arrows to navigate</span>
          </div>
        </footer>
      )}
    </div>
  );
};
