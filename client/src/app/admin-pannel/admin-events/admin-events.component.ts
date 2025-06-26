import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmineventService } from '../admin-services/adminevent.service';
import { Event } from 'src/app/_models/event';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'] // ✅ fix typo here
})
export class AdminEventsComponent implements OnInit {

  eventForm!: FormGroup;
  events: Event[] = [];
  loading = false;
  selectedFile: File | null = null;

  visibilityOptions = [
    { label: 'Public', value: 0 },
    { label: 'Internal (Everyone)', value: 1 },
    { label: 'Regulärmitglied', value: 2 },
    { label: 'Vollmitglied', value: 3 },
    { label: 'Lokalverwaltung', value: 4 },
    { label: 'Regionalverwaltung', value: 5 },
    { label: 'Vorstand', value: 6 },
  ];

  repeatOptions = ['none', 'weekly', 'monthly', 'annually'];
 

  constructor(private fb: FormBuilder, private adminevent: AdmineventService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      isMandatory: [false],
      eventDate: ['', Validators.required],
      repeat: ['none'],
      visibilityLevel: [0, Validators.required]
    });

    this.getEvents();
  }

  getEvents() {
    this.loading = true;
    this.adminevent.getEvents().subscribe({
      next: (data) => {
        console.log('event data' + data)
        this.events = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  createEvent() {
    if (this.eventForm.invalid || !this.selectedFile) {
      alert('All required fields and an image must be selected.');
      return;
    }

    const formData = new FormData();
    const formValues = this.eventForm.value;

    formData.append('title', formValues.title);
    formData.append('description', formValues.description || '');
    formData.append('isMandatory', formValues.isMandatory.toString());
    formData.append('eventDate', formValues.eventDate);
    formData.append('repeat', formValues.repeat);
    formData.append('visibilityLevel', formValues.visibilityLevel.toString());
    formData.append('date', formValues.eventDate); // for backend compatibility
    formData.append('image', this.selectedFile); // ✅ actual file

    this.adminevent.createEvent(formData).subscribe(() => {
      this.eventForm.reset({ repeat: 'none', visibilityLevel: 0, isMandatory: false });
      this.selectedFile = null;
      this.getEvents();
    });
  }

  deleteEvent(eventId: string) {
    if (!confirm('Are you sure you want to delete this event?')) return;

    this.adminevent.deleteEvent(eventId).subscribe(() => {
      this.getEvents();
    });
  }

  getVisibilityLabel(level: number): string {
    const match = this.visibilityOptions.find(o => o.value === level);
    return match ? match.label : 'Unknown';
  }

  // ✅ Use specific typing to avoid conflict with your custom Event model
   onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
