export interface SlideData {
  id: number;
  number: string;
  badge: string;
  title: string;
  subtitle?: string;
  category: string;
}

export interface Waypoint {
  id: string;
  name: string;
  albanianName?: string;
  leg: number;
  day: number;
  time: string;
  elevation?: string;
  driveTimeFromPrev?: string;
  highlights: string[];
  tips: string;
  type: 'airport' | 'castle' | 'city' | 'ruins' | 'pass' | 'lagoon' | 'canyon';
}

export interface ScheduleItem {
  time: string;
  activity: string;
  location: string;
  details: string;
  iconType: string;
  isSpecial?: boolean;
  specialBadge?: string;
  note?: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  weekday: string;
  title: string;
  subtitle: string;
  hotel: string;
  breakfastIncluded: boolean;
  schedule: ScheduleItem[];
}

export interface BudgetItem {
  category: string;
  committedGbp: number;
  perPersonGbp: number;
  status: string;
  statusType: 'paid' | 'booked' | 'desk' | 'pool' | 'settled';
  details: string;
}

export interface TravelerSeat {
  seatId: string;
  row: number; // 1 = Front, 2 = Middle, 3 = Back
  position: 'driver' | 'passenger' | 'left' | 'center' | 'right';
  travelerName: string;
  role: string;
  isClaimed: boolean;
  isLocked?: boolean;
  notes?: string;
  checklist?: {
    passport: boolean;
    warmLayers: boolean;
    hikingFootwear: boolean;
    appetite: boolean;
  };
}

export interface DiningItem {
  id: string;
  name: string;
  item?: string;
  albanianName: string;
  costEur: number;
  costGbp: number;
  category: 'Main Dish' | 'Seafood' | 'Bakery & Snack' | 'Drinks' | 'Sweet';
  description: string;
}
