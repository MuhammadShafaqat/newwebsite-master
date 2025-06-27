import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../_models/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() events: Event[] = [];

  currentMonth = new Date();
  calendarDates: { date: Date; inCurrentMonth: boolean; event?: Event }[] = [];
  weekDays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  isMobile = false;

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
    this.generateCalendar();
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

  const calendar: { date: Date; inCurrentMonth: boolean; event?: Event }[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    calendar.push({ date, inCurrentMonth: true });
  }

  const repeatedDatesMap = new Map<string, Event>();

  for (const event of this.events) {
    const originalDate = new Date(event.eventDate);

    // If event is outside current month and not repeating, skip
    if (
      event.repeat === 'none' &&
      (originalDate < startDate || originalDate > endDate)
    ) continue;

    let current = new Date(originalDate);

    while (current <= endDate) {
      const dateStr = current.toDateString();

      if (current >= startDate && current <= endDate) {
        // ✅ Store for that day
        repeatedDatesMap.set(dateStr, event);
      }

      // Move to next occurrence
      if (event.repeat === 'weekly') {
        current.setDate(current.getDate() + 7);
      } else if (event.repeat === 'monthly') {
        current.setMonth(current.getMonth() + 1);
      } else if (event.repeat === 'annually') {
        current.setFullYear(current.getFullYear() + 1);
      } else {
        break; // not repeating
      }
    }

    // If it’s not a repeating event, map it to its original date
    if (event.repeat === 'none') {
      repeatedDatesMap.set(originalDate.toDateString(), event);
    }
  }

  // Add events to calendar
  this.calendarDates = calendar.map(day => {
    const event = repeatedDatesMap.get(day.date.toDateString());
    return { ...day, event };
  });
}




getTooltipText(event: { title: string; description?: string }): string {
  return `${event.title}\n${event.description || ''}`;
}


}
