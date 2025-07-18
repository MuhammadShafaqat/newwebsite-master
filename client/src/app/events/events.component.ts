import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/event';
import { AuthService } from '../services/auth.service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  loading = false;
  userId: string = '';
  isLoggedIn = false;
  isAdmin: boolean = false;
  expandedEventIds = new Set<string>();

  visibilityLabels = [
    'Public',
    'Internal (Everyone)',
    'Regulärmitglied',
    'Vollmitglied',
    'Lokalverwaltung',
    'Regionalverwaltung',
    'Vorstand'
  ];

  constructor(
    private auth: AuthService,
    private eventService: EventsService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.auth.getCurrentUser().subscribe((res:any)=>{
      console.log(res.user.isAdmin)
      this.isAdmin = res.user.isAdmin;
    })
    this.isLoggedIn = this.auth.isLoggedIn();

    if (this.isLoggedIn) {
      this.auth.getCurrentUser().subscribe({
        next: (user) => {
          this.userId = user.id;
          this.fetchEvents(true);
        },
        error: () => {
          this.fetchEvents(false); // fallback
        }
      });
    } else {
      this.fetchEvents(false);
    }
  }

  fetchEvents(useProtected: boolean): void {
    const fetch$ = useProtected
      ? this.eventService.getProtectedEvents()
      : this.eventService.getPublicEvents();

    fetch$.subscribe({
      next: (events) => {
        this.events = events.map(event => ({
          ...event,
          isAttending: this.isLoggedIn
            ? event.attendees?.some(a => a.user === this.userId)
            : false,
          attendeesCount: event.attendees?.length || 0
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching events:', err);
        if (err.status === 401) {
          this.fetchEvents(false);
        } else {
          this.loading = false;
        }
      }
    });
  }

  toggleReadMore(eventId: string): void {
    this.expandedEventIds.has(eventId)
      ? this.expandedEventIds.delete(eventId)
      : this.expandedEventIds.add(eventId);
  }

  isExpanded(eventId: string): boolean {
    return this.expandedEventIds.has(eventId);
  }

  hasShortDescription(desc?: string): boolean {
    return !!desc && desc.length > 0;
  }

  hasLongDescription(desc?: string): boolean {
    return !!desc && desc.length > 180;
  }

  toggleAttendance(event: Event): void {
    
    const attend = !event.isAttending;

    this.eventService.toggleAttendance(event.id, attend).subscribe({
      next: (res) => {
        event.isAttending = attend;
        event.attendeesCount = res.attendees;
      },
      error: (err) => {
        console.error('❌ Toggle attendance failed:', err);
      }
    });
  }

  getVisibilityLabel(level: number): string {
    return this.visibilityLabels[level] ?? 'Unknown';
  }

convertToParagraphs(text: string): string {
  if (!text) return '';

  const isHTML = /<\/?[a-z][\s\S]*>/i.test(text); // detects basic HTML tags

  if (isHTML) {
    // ✅ already has <p>, <br>, etc. → return as-is
    return text;
  }

  // Else treat as plain text and wrap into paragraphs
  const paragraphs = text.includes('\n\n')
    ? text.split(/\n{2,}/g)
    : [text];

  return paragraphs
    .map(para => `<p>${para.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');
}




}
