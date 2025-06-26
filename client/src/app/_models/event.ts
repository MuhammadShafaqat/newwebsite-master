export interface Attendee {
  user?: string;           // ObjectId as string, if available
  isAnonymous: boolean;
}

export interface Event {
  id?: string;             // MongoDB document ID (optional when creating)
  title: string;
  image?: string;
  description?: string;
  isMandatory: boolean;
  eventDate: string;        // ISO date string (e.g., '2025-07-01')
  repeat: 'none' | 'weekly' | 'monthly' | 'annually';
  visibilityLevel: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  attendees?: Attendee[];
  isActive?: boolean;
  date: string;             // This seems redundant with `eventDate` unless used separately
  createdAt?: string;
  updatedAt?: string;
}
