import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/event';
import { AuthService } from '../services/auth.service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  loading = false;

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

const isLoggedIn = this.auth.isLoggedIn(); // ✅ Call the method
console.log('🔍 Is user logged in?', isLoggedIn); // Add this for debugging
    const fetch$ = isLoggedIn
      ? this.eventService.getProtectedEvents()
      : this.eventService.getPublicEvents();

   fetch$.subscribe({
  next: (events) => {
    this.events = events;
    this.loading = false;
  },
  error: (err) => {
    console.error('❌ Error fetching events:', err);

    // Fallback if 401 unauthorized
    if (err.status === 401) {
      this.eventService.getPublicEvents().subscribe({
        next: (events) => {
          this.events = events;
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
});
  }

  getVisibilityLabel(level: number): string {
    return this.visibilityLabels[level] ?? 'Unknown';
  }
}
