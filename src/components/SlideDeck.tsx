import React from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Car, 
  Hotel, 
  Mountain, 
  MapPin, 
  Sparkles, 
  Navigation,
  UtensilsCrossed,
  Calendar,
  Layers,
  Coins
} from 'lucide-react';
import { EXPEDITION_META, FINANCIAL_BREAKDOWN, BUDGET_ITEMS } from '../data/expeditionData';

interface SlideProps {
  onOpenRouteModal?: () => void;
  onOpenBudgetModal?: () => void;
  onOpenScheduleModal?: () => void;
}

/**
 * Slide 1 of 6: Title & Hero
 */
export const Slide1: React.FC<SlideProps> = ({ onOpenRouteModal }) => {
  return (
    <section className="page title-slide" id="slide-1">
      <div className="title-hero">
        <div className="title-badge-main">
          BALKAN GRAND CIRCUIT • DEC 3 – 6, 2026 • {EXPEDITION_META.travelers} TRAVELERS
        </div>
        <h1 className="title-main">Albania Winter Expedition</h1>
        <p className="title-sub">
          A Masterclass in High-Value Group Travel — Mountain Strongholds, UNESCO Stone Cities, Adriatic Coastlines & Alpine Passes at £200 Per Person Cap.
        </p>

        {/* Scenic Route Schematic Strip */}
        <div 
          className="route-schematic-strip group cursor-pointer"
          onClick={onOpenRouteModal}
          title="Click to explore interactive route map"
        >
          {/* Subtle connecting elevation curve line */}
          <div className="route-track-line"></div>
          
          <div className="route-stops-row">
            <div className="route-stop">
              <span className="stop-dot"></span>
              <strong className="stop-name">TIA Airport</strong>
              <span className="stop-sub">Arrival</span>
            </div>

            <div className="route-stop">
              <span className="stop-dot"></span>
              <strong className="stop-name">Krujë Citadel</strong>
              <span className="stop-sub">Ottoman Bazaar</span>
            </div>

            <div className="route-stop">
              <span className="stop-dot stop-dot-primary"></span>
              <strong className="stop-name text-sky-400">Berat</strong>
              <span className="stop-sub">UNESCO Villa (N1)</span>
            </div>

            <div className="route-stop">
              <span className="stop-dot stop-dot-primary"></span>
              <strong className="stop-name text-sky-400">Apollonia & Vlorë</strong>
              <span className="stop-sub">Seafront Hotel (N2)</span>
            </div>

            <div className="route-stop">
              <span className="stop-dot stop-dot-amber"></span>
              <strong className="stop-name text-amber-400">Llogara Pass</strong>
              <span className="stop-sub">1,043m Summit</span>
            </div>

            <div className="route-stop">
              <span className="stop-dot stop-dot-emerald"></span>
              <strong className="stop-name text-emerald-400">Tirana Capital</strong>
              <span className="stop-sub">AM Suites (N3) & Bovilla</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Expedition Command */}
        <div className="meta-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="meta-card">
            <h4>GROUP ROSTER</h4>
            <p>{EXPEDITION_META.travelers} Adult Adventurers</p>
          </div>
          <div className="meta-card">
            <h4>TOTAL CIRCUIT</h4>
            <p>{EXPEDITION_META.totalKm} km Scenic Loop</p>
          </div>
          <div className="meta-card">
            <h4>FLEET CLASS</h4>
            <p>Hyundai H1 8-Seater</p>
          </div>
          <div className="meta-card">
            <h4>BUDGET DISCIPLINE</h4>
            <p>£{EXPEDITION_META.masterCapGbp} Master Cap / Person</p>
          </div>
        </div>
      </div>

      <footer className="page-footer" style={{ width: '100%', marginTop: '24px' }}>
        <span>Lead Organizer: {EXPEDITION_META.leadOrganizer} • {EXPEDITION_META.organizerRole}</span>
        <span>Slide 1 of 6</span>
      </footer>
    </section>
  );
};

/**
 * Slide 2 of 6: 01 Quality Without Compromise
 */
export const Slide2: React.FC<SlideProps> = ({ onOpenBudgetModal }) => {
  return (
    <section className="page" id="slide-2">
      <header className="page-header">
        <div className="page-title">
          <span>01</span> Quality Without Compromise
        </div>
        <div className="page-badge">Zero Budget Cuts on Group Experience</div>
      </header>

      <div className="page-content">
        <div className="grid-2">
          {/* Left Column: Premium Standards */}
          <div className="card" style={{ justifyContent: 'space-between' }}>
            <div>
              <h3>👑 Premium Comfort on a Fixed Budget</h3>
              <p style={{ marginBottom: '8px' }}>
                Disciplined budgeting does not mean roughing it. We bypassed cramped budget hatchbacks and hostel dorms, securing executive-grade logistics for all 7 adults:
              </p>

              {/* Rental Van Spotlight */}
              <div className="highlight-box" style={{ padding: '8px 12px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, fontSize: '9.5pt' }}>
                    🚐 Radius Car Rental — Hyundai H1 Automatic (8-Seater)
                  </h4>
                  <span className="tag" style={{ fontSize: '7pt' }}>Confirmed • Ref: G96389719</span>
                </div>
                <p style={{ fontSize: '8pt', lineHeight: 1.35, color: '#cbd5e1' }}>
                  3 full rows of adult seating + 850-litre cargo bay. Fits all 7 passengers, 7 cabin backpacks, and Zaid's 10kg checked suitcase with zero knee-cramping or luggage on laps. Automatic transmission ensures effortless mountain driving up Krujë and Llogara.
                </p>
              </div>

              {/* Lodging List */}
              <div style={{ marginTop: '6px' }}>
                <h4 style={{ fontSize: '9.5pt', color: '#f8fafc', fontWeight: 700, margin: '0 0 4px 0' }}>
                  🏨 Curated Accommodations (Average £11.20 / night / person):
                </h4>
                <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '8.2pt' }}>
                  <li style={{ marginBottom: '4px' }}>
                    <strong>Night 1 (Berat): Georgemishel Guest House</strong> — Private stone Ottoman villa booked exclusively for our group. Free hot Albanian breakfast included (£76.38 total / €89).
                  </li>
                  <li style={{ marginBottom: '4px' }}>
                    <strong>Night 2 (Vlorë): Sea & Sand Hotel</strong> — Superior Quadruple + Classic Triple seafront rooms right on the Adriatic coast. Free breakfast buffet included (£83.42 total / €97.20).
                  </li>
                  <li>
                    <strong>Night 3 (Tirana): AM Apartment Tirana</strong> — 2 deluxe modern apartments in Vila Park with private bathrooms, high-speed Wi-Fi, and secure garage parking for our van (£75.52 total / €88).
                  </li>
                </ul>
              </div>
            </div>

            {/* The Fixed Cost Milestone Box */}
            <div 
              className="highlight-box cursor-pointer hover:border-sky-400 transition-colors" 
              style={{ marginTop: '8px', marginBottom: 0 }}
              onClick={onOpenBudgetModal}
              title="Click to open financial ledger"
            >
              <h4 style={{ color: '#38bdf8', fontSize: '9pt', margin: '0 0 2px 0' }}>The Fixed Cost Milestone</h4>
              <p style={{ fontSize: '8pt', lineHeight: 1.35 }}>
                Combined committed spend for all 7 adults across return flights, 3 nights of premium lodging, and car reservation is <strong>£601.72</strong>. Each member's share of core fixed costs is locked at exactly <strong>£35.57</strong> (plus individual flight ticket)!
              </p>
            </div>
          </div>

          {/* Right Column: Logistics Audit & Safety */}
          <div className="card" style={{ justifyContent: 'space-between' }}>
            <div>
              <h3>🛡️ Logistics Audit & Operational Safety</h3>

              <div className="highlight-box" style={{ marginBottom: '8px', padding: '10px 12px' }}>
                <h4 style={{ fontSize: '9.5pt', margin: '0 0 3px 0' }}>Car Rental Pickup & Desk Protocols</h4>
                <p style={{ fontSize: '8.2pt', lineHeight: 1.35 }}>
                  <strong>Meet & Greet at TIA Terminal:</strong> Radius agent meets us directly at arrivals on Dec 3 at 10:00 AM. <strong>EUR 140.00</strong> balance due at desk. <strong>EUR 1,000</strong> hold on lead driver's physical credit card (Zaid Abbasi). Domestic license + IDP required.
                </p>
              </div>

              <div className="highlight-box" style={{ marginBottom: '8px', padding: '10px 12px' }}>
                <h4 style={{ fontSize: '9.5pt', margin: '0 0 3px 0' }}>Cash Reserve Readiness</h4>
                <p style={{ fontSize: '8.2pt', lineHeight: 1.35 }}>
                  Night 3 in Tirana requires <strong>€88.00 in EUR cash</strong> at check-in. This is already budgeted and allocated from our cash pool, eliminating unexpected card surcharges.
                </p>
              </div>

              <div className="highlight-box" style={{ marginBottom: 0, padding: '10px 12px' }}>
                <h4 style={{ fontSize: '9.5pt', margin: '0 0 3px 0' }}>Daylight Driving Optimization</h4>
                <p style={{ fontSize: '8.2pt', lineHeight: 1.35 }}>
                  All mountain highway legs are scheduled between <strong>10:00 AM and 4:15 PM</strong>, maximizing winter daylight for safe scenic driving and panoramic photography.
                </p>
              </div>
            </div>

            <div 
              style={{ 
                background: 'rgba(34, 197, 94, 0.12)', 
                border: '1px solid rgba(34, 197, 94, 0.35)', 
                borderRadius: '8px', 
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '10px'
              }}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span style={{ fontSize: '8.5pt', fontWeight: 700, color: '#4ade80' }}>
                100% Logistics Confirmed • Zero Single Points of Failure
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <span>Albania Expedition 2026 • Master Briefing</span>
        <span>Slide 2 of 6</span>
      </footer>
    </section>
  );
};

/**
 * Slide 3 of 6: 02 Destination Showcase: Strongholds & Antiquity
 */
export const Slide3: React.FC<SlideProps> = ({ onOpenRouteModal }) => {
  return (
    <section className="page" id="slide-3">
      <header className="page-header">
        <div className="page-title">
          <span>02</span> Destination Showcase: Strongholds & Antiquity
        </div>
        <div className="page-badge">Legs 1 & 2 • Historical Heartlands</div>
      </header>

      <div className="page-content">
        <div className="grid-3">
          {/* Card 1: Krujë */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenRouteModal}
          >
            {/* Architectural Silhouette Graphic */}
            <div className="destination-vector-preview">
              <svg viewBox="0 0 200 65" className="w-full h-14 text-sky-400/40 fill-current">
                <path d="M10 65 L40 35 L70 50 L110 20 L150 45 L190 10 L195 65 Z" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="95" y="15" width="30" height="25" fill="rgba(56, 189, 248, 0.3)" />
                <rect x="100" y="8" width="6" height="7" fill="#38bdf8" />
                <circle cx="150" cy="18" r="7" fill="rgba(56, 189, 248, 0.6)" />
              </svg>
            </div>

            <h3 style={{ marginTop: '4px' }}>🏰 Krujë Mountain Citadel</h3>
            <div style={{ fontSize: '8pt', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
              Elevation: 600m • Dec 3 Afternoon
            </div>
            <p style={{ fontSize: '8.2pt' }}>
              Perched high in the crags above the coastal plains, Krujë was the legendary stronghold of national hero Skanderbeg, defying the Ottoman Empire for 25 years.
            </p>
            <ul style={{ paddingLeft: '14px', fontSize: '8pt' }}>
              <li style={{ marginBottom: '4px' }}>
                <strong>400-Year-Old Cobbled Bazaar:</strong> Wooden craft stalls selling handmade silver filigree, copper, wool rugs, and mountain sage.
              </li>
              <li>
                <strong>Culinary Stop:</strong> Hot flaky <em>byrek me spinaq</em> (spinach pastry) straight from wood-fired bakeries (~€1.50).
              </li>
            </ul>
          </div>

          {/* Card 2: Berat */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenRouteModal}
          >
            {/* Windows Silhouette Graphic */}
            <div className="destination-vector-preview">
              <svg viewBox="0 0 200 65" className="w-full h-14 text-amber-400/40 fill-current">
                <rect x="20" y="25" width="160" height="40" fill="rgba(251, 191, 36, 0.1)" stroke="#fbbf24" strokeWidth="1.2" rx="3" />
                <rect x="35" y="32" width="16" height="12" fill="#fbbf24" opacity="0.8" />
                <rect x="65" y="32" width="16" height="12" fill="#fbbf24" opacity="0.8" />
                <rect x="95" y="32" width="16" height="12" fill="#fbbf24" opacity="0.8" />
                <rect x="125" y="32" width="16" height="12" fill="#fbbf24" opacity="0.8" />
                <rect x="155" y="32" width="16" height="12" fill="#fbbf24" opacity="0.8" />
                <polygon points="100,5 180,25 20,25" fill="rgba(251, 191, 36, 0.25)" />
              </svg>
            </div>

            <h3 style={{ marginTop: '4px' }}>🪟 Berat: City of 1,000 Windows</h3>
            <div style={{ fontSize: '8pt', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
              UNESCO World Heritage • Dec 3 Night
            </div>
            <p style={{ fontSize: '8.2pt' }}>
              White Ottoman houses stacked up the steep gorge of the Osum River. We stay in our own private stone villa inside the historical quarter.
            </p>
            <ul style={{ paddingLeft: '14px', fontSize: '8pt' }}>
              <li style={{ marginBottom: '4px' }}>
                <strong>Gorica Bridge & Mangalem:</strong> Evening stroll (<em>*xhiro*</em>) along the marble promenade facing illuminated stone facades.
              </li>
              <li>
                <strong>Traditional Feast:</strong> Authentic <em>Tavë Kosi</em> (slow-baked lamb in tangy spiced yogurt) in family-run cellars (~€7–€9).
              </li>
            </ul>
          </div>

          {/* Card 3: Apollonia */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenRouteModal}
          >
            {/* Classical Columns Graphic */}
            <div className="destination-vector-preview">
              <svg viewBox="0 0 200 65" className="w-full h-14 text-sky-300 fill-current">
                <rect x="25" y="52" width="150" height="8" fill="#38bdf8" />
                <rect x="30" y="10" width="140" height="8" fill="#38bdf8" />
                <polygon points="100,0 170,10 30,10" fill="rgba(56, 189, 248, 0.3)" />
                <rect x="42" y="18" width="8" height="34" fill="rgba(255, 255, 255, 0.7)" />
                <rect x="68" y="18" width="8" height="34" fill="rgba(255, 255, 255, 0.7)" />
                <rect x="94" y="18" width="8" height="34" fill="rgba(255, 255, 255, 0.7)" />
                <rect x="120" y="18" width="8" height="34" fill="rgba(255, 255, 255, 0.7)" />
                <rect x="146" y="18" width="8" height="34" fill="rgba(255, 255, 255, 0.7)" />
              </svg>
            </div>

            <h3 style={{ marginTop: '4px' }}>🏛️ Apollonia Archaeological Park</h3>
            <div style={{ fontSize: '8pt', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
              2,500-Year-Old Ruins • Dec 4 Midday
            </div>
            <p style={{ fontSize: '8.2pt' }}>
              Founded by Corinthian Greek settlers in 588 BC, this ancient intellectual hub was where future Roman Emperor Augustus studied philosophy.
            </p>
            <ul style={{ paddingLeft: '14px', fontSize: '8pt' }}>
              <li style={{ marginBottom: '4px' }}>
                <strong>Monumental Center:</strong> The dramatic 6-column Bouleuterion facade, ancient theatre, and Roman odeon.
              </li>
              <li>
                <strong>St. Mary Byzantine Monastery:</strong> 13th-century courtyard monastery with archaeological treasures and ancient olive groves.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <span>Albania Expedition 2026 • Master Briefing</span>
        <span>Slide 3 of 6</span>
      </footer>
    </section>
  );
};

/**
 * Slide 4 of 6: 03 Destination Showcase: Seas, Passes & Canyons
 */
export const Slide4: React.FC<SlideProps> = ({ onOpenRouteModal }) => {
  return (
    <section className="page" id="slide-4">
      <header className="page-header">
        <div className="page-title">
          <span>03</span> Destination Showcase: Seas, Passes & Canyons
        </div>
        <div className="page-badge">Legs 3 & 4 • Coastline to Capital</div>
      </header>

      <div className="page-content">
        <div className="grid-3">
          {/* Card 1: Vlorë & Zvërnec */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenRouteModal}
          >
            <div className="destination-vector-preview">
              <svg viewBox="0 0 200 65" className="w-full h-14 text-cyan-400 fill-current">
                <path d="M0 45 Q 35 35, 70 45 T 140 45 T 200 45 L 200 65 L 0 65 Z" fill="rgba(6, 182, 212, 0.25)" />
                <path d="M0 52 Q 40 46, 80 52 T 160 52 T 200 52 L 200 65 L 0 65 Z" fill="#06b6d4" opacity="0.6" />
                <circle cx="100" cy="24" r="14" fill="#fbbf24" opacity="0.8" />
                <polygon points="140,40 160,20 180,40" fill="rgba(34, 197, 94, 0.5)" />
              </svg>
            </div>

            <h3 style={{ marginTop: '4px' }}>🌊 Vlorë Riviera & Zvërnec</h3>
            <div style={{ fontSize: '8pt', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
              Adriatic & Ionian Confluence • Dec 4–5
            </div>
            <p style={{ fontSize: '8.2pt' }}>
              Where Albania's two seas meet. We stay directly opposite the beach along the palm-lined Lungomare promenade.
            </p>
            <ul style={{ paddingLeft: '14px', fontSize: '8pt' }}>
              <li style={{ marginBottom: '4px' }}>
                <strong>Lungomare Seafood Feast:</strong> Evening dinner feasting on fresh grilled sea bass, calamari, and cold local Korça beer.
              </li>
              <li>
                <strong>Zvërnec Monastery Island:</strong> Walk the winding wooden footbridge across Narta Lagoon to an idyllic 13th-century monastery.
              </li>
            </ul>
          </div>

          {/* Card 2: Llogara Pass */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenRouteModal}
          >
            <div className="destination-vector-preview relative">
              <svg viewBox="0 0 200 65" className="w-full h-14 text-sky-400 fill-current">
                <path d="M10 65 L 50 40 L 80 50 L 120 15 L 160 45 L 195 65 Z" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="120" cy="15" r="4" fill="#ef4444" />
                <path d="M 0 58 Q 40 50, 90 56 T 150 48 T 200 52" stroke="#38bdf8" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
              </svg>
              <span className="absolute top-1 right-2 bg-red-500/80 text-white text-[7.5pt] font-mono px-1.5 py-0.5 rounded">
                1,043m
              </span>
            </div>

            <h3 style={{ marginTop: '4px' }}>⛰️ Llogara Pass (1,043m Elevation)</h3>
            <div style={{ fontSize: '8pt', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
              Ceraunian Mountain Ridge • Dec 5 Morning
            </div>
            <p style={{ fontSize: '8.2pt' }}>
              One of the most spectacular coastal alpine passes in Southern Europe, dropping sheer from clouds straight into the turquoise sea.
            </p>
            <ul style={{ paddingLeft: '14px', fontSize: '8pt' }}>
              <li style={{ marginBottom: '4px' }}>
                <strong>Dramatic Panorama:</strong> Stand at the summit pass looking down onto the dramatic Albanian Riviera and Greek islands.
              </li>
              <li>
                <strong>Alpine Teahouse Stop:</strong> Enjoy hot mountain sage tea (<em>*Çaj Mali*</em>) and sheep's yogurt with wild walnuts in the pine forests.
              </li>
            </ul>
          </div>

          {/* Card 3: Tirana Capital & Bovilla */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenRouteModal}
          >
            <div className="destination-vector-preview">
              <svg viewBox="0 0 200 65" className="w-full h-14 text-indigo-400 fill-current">
                <polygon points="100,5 125,60 75,60" fill="rgba(99, 102, 241, 0.4)" stroke="#818cf8" strokeWidth="1.2" />
                <rect x="135" y="20" width="18" height="40" fill="rgba(255, 255, 255, 0.2)" />
                <rect x="45" y="30" width="22" height="30" fill="rgba(255, 255, 255, 0.2)" />
                <polygon points="100,5 106,16 94,16" fill="#ef4444" />
                <circle cx="160" cy="15" r="3" fill="#fbbf24" />
              </svg>
            </div>

            <h3 style={{ marginTop: '4px' }}>🏙️ Tirana Capital & Lake Bovilla</h3>
            <div style={{ fontSize: '8pt', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
              Festive Capital & Alpine Gorge • Dec 5–6
            </div>
            <p style={{ fontSize: '8.2pt' }}>
              A vibrant contrast between Saturday night urban energy and Sunday morning mountain wilderness.
            </p>
            <ul style={{ paddingLeft: '14px', fontSize: '8pt' }}>
              <li style={{ marginBottom: '4px' }}>
                <strong>Skanderbeg Square Christmas Market:</strong> Giant holiday tree, carousel, street chestnuts, and Blloku nightlife.
              </li>
              <li>
                <strong>Lake Bovilla Canyon Hike:</strong> Climb the wooden cliff boardwalk for fjord-like panoramic views over the turquoise reservoir.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <span>Albania Expedition 2026 • Master Briefing</span>
        <span>Slide 4 of 6</span>
      </footer>
    </section>
  );
};

/**
 * Slide 5 of 6: 04 Day-by-Day Master Itinerary (10 AM – 10 PM)
 */
export const Slide5: React.FC<SlideProps> = ({ onOpenScheduleModal }) => {
  return (
    <section className="page" id="slide-5">
      <header className="page-header">
        <div className="page-title">
          <span>04</span> Day-by-Day Master Itinerary (10 AM – 10 PM)
        </div>
        <div className="page-badge">Seamless Flow • Balanced Pace</div>
      </header>

      <div className="page-content">
        <div className="grid-4" style={{ gap: '10px' }}>
          {/* Day 1: Thursday, Dec 3 */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenScheduleModal}
            style={{ padding: '12px 10px' }}
          >
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px', marginBottom: '8px' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '9pt', margin: 0, fontWeight: 800 }}>Thursday, Dec 3</h4>
              <span style={{ fontSize: '7.5pt', color: '#94a3b8', fontWeight: 600 }}>Tirana to Berat</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '7.8pt' }}>
              <div>
                <strong style={{ color: '#38bdf8' }}>09:55</strong> <span style={{ color: '#e2e8f0' }}>Land at TIA on Ryanair RK8288.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>10:45</strong> <span style={{ color: '#e2e8f0' }}>Pick up Mercedes-Benz Vito 8-seater van.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>14:30</strong> <span style={{ color: '#e2e8f0' }}>Check into Georgemishel Villa in Berat.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>15:30</strong> <span style={{ color: '#e2e8f0' }}>15th-century King Mosque & Turkish coffees in the square.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>17:30</strong> <span style={{ color: '#e2e8f0' }}>Gorica Bridge evening stroll (<em>*xhiro*</em>).</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>19:00</strong> <span style={{ color: '#e2e8f0' }}>Chef Toska at Wildor Restaurant: authentic halal-friendly Tavë Kosi feast.</span>
              </div>
            </div>
          </div>

          {/* Day 2: Friday, Dec 4 */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenScheduleModal}
            style={{ padding: '12px 10px' }}
          >
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px', marginBottom: '8px' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '9pt', margin: 0, fontWeight: 800 }}>Friday, Dec 4</h4>
              <span style={{ fontSize: '7.5pt', color: '#94a3b8', fontWeight: 600 }}>River Gorges to Gjirokastër</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '7.8pt' }}>
              <div>
                <strong style={{ color: '#38bdf8' }}>08:30</strong> <span style={{ color: '#e2e8f0' }}>Complimentary hot breakfast at villa.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>09:30</strong> <span style={{ color: '#e2e8f0' }}>Scenic drive through Vjosa River Valley gorges.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>12:30</strong> <span style={{ color: '#e2e8f0' }}>Detour to Thermal Baths of Bënja & Ottoman bridge.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>14:30</strong> <span style={{ color: '#e2e8f0' }}>Roadside lunch: hot wood-fired byrek & bakery stop.</span>
              </div>
              <div>
                <strong style={{ color: '#fbbf24' }}>17:30</strong> <span style={{ color: '#fbbf24' }}>The Spit-Roast Feast (5:30 PM) at Uji i Ftohtë Tepelenë (Pre-order required).</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>20:00</strong> <span style={{ color: '#e2e8f0' }}>Check into Ottoman stone mansion in Gjirokastër.</span>
              </div>
            </div>
          </div>

          {/* Day 3: Saturday, Dec 5 */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenScheduleModal}
            style={{ padding: '12px 10px' }}
          >
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px', marginBottom: '8px' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '9pt', margin: 0, fontWeight: 800 }}>Saturday, Dec 5</h4>
              <span style={{ fontSize: '7.5pt', color: '#94a3b8', fontWeight: 600 }}>Gjirokastër & Llogara Pass</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '7.8pt' }}>
              <div>
                <strong style={{ color: '#38bdf8' }}>08:30</strong> <span style={{ color: '#e2e8f0' }}>Morning coffee in Gjirokastër cobbled bazaar.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>09:30</strong> <span style={{ color: '#e2e8f0' }}>Explore 300-year-old Skenduli House (64 windows).</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>11:00</strong> <span style={{ color: '#e2e8f0' }}>Descend into Cold War Tunnel bunker system.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>13:00</strong> <span style={{ color: '#e2e8f0' }}>Scenic coastal highway drive towards Riviera.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>15:30</strong> <span style={{ color: '#e2e8f0' }}>Top lodge of Llogara Pass: hot Çaj Mali (mountain tea) with honey.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>18:30</strong> <span style={{ color: '#e2e8f0' }}>Check in & evening dinner in Tirana / Riviera.</span>
              </div>
            </div>
          </div>

          {/* Day 4: Sunday, Dec 6 */}
          <div 
            className="card hover:border-sky-500/40 transition-colors cursor-pointer"
            onClick={onOpenScheduleModal}
            style={{ padding: '12px 10px' }}
          >
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px', marginBottom: '8px' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '9pt', margin: 0, fontWeight: 800 }}>Sunday, Dec 6</h4>
              <span style={{ fontSize: '7.5pt', color: '#94a3b8', fontWeight: 600 }}>Krujë Antiquing & Departure</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '7.8pt' }}>
              <div>
                <strong style={{ color: '#38bdf8' }}>09:30</strong> <span style={{ color: '#e2e8f0' }}>Drive to mountain stronghold of Krujë.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>11:00</strong> <span style={{ color: '#e2e8f0' }}>Tour Skanderbeg Citadel ramparts & fortress walls.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>13:00</strong> <span style={{ color: '#e2e8f0' }}>1 hour in Old Ottoman Bazaar (copper pots, woodcrafts, kilim rugs).</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>15:30</strong> <span style={{ color: '#e2e8f0' }}>Farewell roadside lunch & sizzling spiced qofte.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>19:30</strong> <span style={{ color: '#e2e8f0' }}>Refuel Vito diesel tank (£100) & return van at TIA.</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>22:50</strong> <span style={{ color: '#e2e8f0' }}>Ryanair flight RK8289 home to London STN.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <span>Albania Expedition 2026 • Master Briefing</span>
        <span>Slide 5 of 6</span>
      </footer>
    </section>
  );
};

/**
 * Slide 6 of 6: 05 Financial Audit & Dining Superpower
 */
export const Slide6: React.FC<SlideProps> = ({ onOpenBudgetModal }) => {
  return (
    <section className="page" id="slide-6">
      <header className="page-header">
        <div className="page-title">
          <span>05</span> Financial Audit & Dining Superpower
        </div>
        <div className="page-badge">100% Mathematically Reconciled</div>
      </header>

      <div className="page-content">
        <div className="grid-2">
          {/* Left Column: Master Group Ledger */}
          <div className="card" style={{ justifyContent: 'space-between' }}>
            <div>
              <h3>📊 Master Group Ledger (£{FINANCIAL_BREAKDOWN.totalCap.toLocaleString()} Total Cap)</h3>
              <table style={{ marginTop: '6px' }}>
                <thead>
                  <tr>
                    <th>CATEGORY / LINE ITEM</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {BUDGET_ITEMS.map((item, idx) => {
                    const isTotalRow = item.category.includes('Total');
                    const isRemainingRow = item.category.includes('Remaining');
                    return (
                      <tr key={idx} className={isTotalRow || isRemainingRow ? 'bg-slate-800/40 font-semibold' : ''}>
                        <td>{item.category}</td>
                        <td style={{ color: isRemainingRow ? '#4ade80' : isTotalRow ? '#38bdf8' : '#f8fafc' }}>
                          £{item.committedGbp.toFixed(2)}
                        </td>
                        <td>
                          <span 
                            className={`tag ${
                              item.statusType === 'paid' 
                                ? 'tag-emerald' 
                                : item.statusType === 'settled'
                                ? 'bg-sky-500/20 text-sky-300'
                                : item.statusType === 'desk'
                                ? 'tag-amber'
                                : 'tag-emerald'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ fontSize: '7.8pt', color: '#94a3b8', marginTop: '6px' }}>
              * Initial: £1,600 | Spent: £600 | Remaining: £1,000. Balance covers Vito fuel, spit-roast feast, teas, entries & dinners.
            </div>
          </div>

          {/* Right Column: Dining Superpower */}
          <div className="card" style={{ justifyContent: 'space-between' }}>
            <div>
              <h3>🍷 What Does £1,000 Remaining Cash Buy Us?</h3>
              <p style={{ fontSize: '8.2pt', lineHeight: 1.4, marginBottom: '8px' }}>
                Because flights, villas, and the 8-seater Vito were secured upfront for £600, our remaining cash pool gives us an astonishing <strong>£125 per person (~€147 / 14,750 ALL)</strong> for road trip fuel, traditional feasts, and mountain activities!
              </p>

              <div 
                className="highlight-box cursor-pointer hover:border-sky-400 transition-colors"
                style={{ padding: '8px 12px', marginBottom: '8px' }}
                onClick={onOpenBudgetModal}
                title="Click to open dining simulator"
              >
                <h4 style={{ fontSize: '9pt', margin: '0 0 3px 0' }}>
                  Spit-Roast Feast (£150) + 3 Dinners (£337) + £150 Lunches
                </h4>
                <p style={{ fontSize: '8pt', lineHeight: 1.35 }}>
                  Full group banquets, roasted lamb over wood embers, roadside bakeries, and mountain tea overlooking the river valleys!
                </p>
              </div>

              <ul style={{ paddingLeft: '14px', fontSize: '8pt', margin: 0 }}>
                <li style={{ marginBottom: '4px' }}>
                  <strong>The Spit-Roast Feast:</strong> Day 2 banquet at Uji i Ftohtë Tepelenë (mish qengji në hell dhe pilaf) for all 8 travelers (£150).
                </li>
                <li style={{ marginBottom: '4px' }}>
                  <strong>Tavë Kosi & Adriatic Seafood:</strong> 3 group dinners (£337 total) in Berat, Vlorë/Gjirokastër, and Tirana.
                </li>
                <li>
                  <strong>Teas & Castle Entries:</strong> £90 allocated for Çaj Mali and Turkish coffees, and £127 for castle and bunker entry tickets.
                </li>
              </ul>
            </div>

            <div 
              style={{ 
                textAlign: 'center', 
                background: 'rgba(34, 197, 94, 0.12)', 
                border: '1px solid rgba(34, 197, 94, 0.35)', 
                borderRadius: '8px', 
                padding: '8px 12px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              onClick={onOpenBudgetModal}
              className="hover:bg-emerald-500/20 transition-all"
            >
              <span style={{ fontSize: '9.5pt', fontWeight: 700, color: '#4ade80' }}>
                Ready for Takeoff • Thursday, December 3, 2026 🚀
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <span>Albania Expedition 2026 • Master Briefing</span>
        <span>Slide 6 of 6</span>
      </footer>
    </section>
  );
};
