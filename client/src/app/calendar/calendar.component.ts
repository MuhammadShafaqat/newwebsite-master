import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Event } from '../_models/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() events: Event[] = [];

  currentMonth = new Date();
  calendarDates: { date: Date; inCurrentMonth: boolean; event?: Event }[] = [];
  weekDays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  isMobile = false;

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
  }

  // 🔥 This ensures calendar updates when events arrive
  ngOnChanges(changes: SimpleChanges) {
    if (changes['events']) {
      this.generateCalendar();
    }
  }

  truncateTitle(title: string): string {
    const limit = this.isMobile ? 25 : 12;
    return title.length > limit ? title.slice(0, limit) + '...' : title;
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month, daysInMonth);

    // BUILD CALENDAR CELLS
    const calendar: { date: Date; inCurrentMonth: boolean; event?: Event }[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push({ date: new Date(year, month, day), inCurrentMonth: true });
    }

    // STORE REPEATING EVENTS
    const repeatedDatesMap = new Map<string, Event>();

    for (const event of this.events) {
      const originalDate = new Date(event.eventDate);
      let current = new Date(originalDate);

      // Non-repeating & not in current month → skip
      if (event.repeat === 'none' && (originalDate < startDate || originalDate > endDate)) {
        continue;
      }

      while (current <= endDate) {
        const key = current.toDateString();

        if (current >= startDate && current <= endDate) {
          repeatedDatesMap.set(key, event);
        }

        // Move based on repeat type
        if (event.repeat === 'weekly') {
          current.setDate(current.getDate() + 7);

        } else if (event.repeat === 'bi-weekly') {
          current.setDate(current.getDate() + 14);

        } else if (event.repeat === 'monthly') {
          current.setMonth(current.getMonth() + 1);

        } else if (event.repeat === 'annually') {
          current.setFullYear(current.getFullYear() + 1);

        } else {
          break;
        }
      }

      // Add one-time events
      if (event.repeat === 'none') {
        repeatedDatesMap.set(originalDate.toDateString(), event);
      }
    }

    this.calendarDates = calendar.map(day => {
      const event = repeatedDatesMap.get(day.date.toDateString());
      return { ...day, event };
    });
  }

  getTooltipText(event: { title: string; description?: string }): string {
    return `${event.title}\n${event.description || ''}`;
  }
}
