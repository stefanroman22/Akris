export interface BoardMember {
  id: string;
  name: string;
  role: string;
  major: string;
  imageUrl: string;
  quote: string;
  responsibilities: {
    icon: string;
    text: string;
  }[];
}

export interface EventItem {
  id: string;
  date: {
    month: string;
    day: string;
  };
  title: string;
  time: string;
  location: string;
  isToday?: boolean;
  type: 'training' | 'match' | 'social';
  description: string;
}

export interface SocialImage {
  id: string;
  imageUrl: string;
  alt: string;
  isLarge?: boolean;
  hasOverlayIcon?: boolean;
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CALENDAR_ID: string;
  readonly VITE_GOOGLE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


export interface FormData {
  fullName: string;
  initials: string;
  birthDate: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  nttbNumber: string;
  university: 'radboud' | 'han' | 'other' | '';
  otherUniversity: string;
  hasSportsCard: 'yes' | 'no' | '';
  rscNumber: string;
  interestedInCompetition: 'yes' | 'no' | '';
  iban: string;
  agreedToData: boolean;
  agreedToPermission: boolean;
}

export const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  initials: '',
  birthDate: '',
  address: '',
  postalCode: '',
  city: '',
  email: '',
  phone: '',
  nttbNumber: '',
  university: '',
  otherUniversity: '',
  hasSportsCard: '',
  rscNumber: '',
  interestedInCompetition: '',
  iban: '',
  agreedToData: false,
  agreedToPermission: false,
};



export enum EventCategory {
  TRAINING = 'Training',
  SOCIAL = 'Social',
  COMP = 'Comp',
  TOURNAMENT = 'Tournament'
}

export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    start: Date;
    end: Date;
    isAllDay: boolean;
    link: string;
}

export interface EventData {
  id: string;
  title: string;
  startTime: string;
  location: string;
  description: string;
  dayIndex: number; // 0 (Mon) to 6 (Sun)
}

export interface DayData {
  dayName: string;
  dayNumber: number;
  date: Date;
  events: EventData[];
}
