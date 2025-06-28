import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmineventService } from '../admin-services/adminevent.service';
import { Event } from 'src/app/_models/event';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})

export class AdminEventsComponent implements OnInit, AfterViewInit {

   @ViewChild('descriptionTextarea') descriptionTextareaRef!: ElementRef<HTMLTextAreaElement>;

  eventForm!: FormGroup;
  events: Event[] = [];
  loading = false;
  selectedFile: File | null = null;
  editingEventId: string | null = null;
  filteredEvents: Event[] = [];
selectedVisibilityFilter: string = 'all';

  visibilityOptions = [
    { label: 'Public', value: 0 },
    { label: 'Internal (Everyone)', value: 1 },
    { label: 'Regulärmitglied', value: 2 },
    { label: 'Vollmitglied', value: 3 },
    { label: 'Lokalverwaltung', value: 4 },
    { label: 'Regionalverwaltung', value: 5 },
    { label: 'Vorstand', value: 6 }
  ];

  repeatOptions = ['none', 'weekly', 'monthly', 'annually'];

  constructor(private fb: FormBuilder, private adminevent: AdmineventService) {}
ngAfterViewInit(): void {
  setTimeout(() => this.autoGrowTextarea(), 100);
}

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
    this.adminevent.getAllEventsForAdmin().subscribe({
      next: (data) => {
        this.events = data;
        this.applyFilter(); // ✅ Apply filter after fetching
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  applyFilter() {
  if (this.selectedVisibilityFilter === 'all') {
    this.filteredEvents = [...this.events];
  } else {
    const selected = parseInt(this.selectedVisibilityFilter, 10);
    this.filteredEvents = this.events.filter(e => e.visibilityLevel === selected);
  }
}




  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  createEvent() {
    if (this.eventForm.invalid || !this.selectedFile) {
      alert('All required fields and an image must be selected.');
      return;
    }

    const formData = new FormData();
    const formValues = this.eventForm.value;

    formData.append('title', formValues.title);
    formData.append('description', this.convertToParagraphs(formValues.description || ''));
    formData.append('isMandatory', formValues.isMandatory.toString());
    formData.append('eventDate', formValues.eventDate);
    formData.append('repeat', formValues.repeat);
    formData.append('visibilityLevel', formValues.visibilityLevel.toString());
    formData.append('date', formValues.eventDate);
    formData.append('image', this.selectedFile);

    this.adminevent.createEvent(formData).subscribe(() => {
      this.eventForm.reset({ repeat: 'none', visibilityLevel: 0, isMandatory: false });
      this.selectedFile = null;
      this.getEvents();
    });
  }

  editEvent(event: Event) {
    this.editingEventId = event.id!;
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      isMandatory: event.isMandatory,
      eventDate: event.eventDate,
      repeat: event.repeat,
      visibilityLevel: event.visibilityLevel
    });
  }

  updateEventSubmit() {
    if (!this.editingEventId || this.eventForm.invalid) return;

    const formData = new FormData();
    const formValues = this.eventForm.value;

    formData.append('title', formValues.title);
    formData.append('description', this.convertToParagraphs(formValues.description || ''));
    formData.append('isMandatory', formValues.isMandatory.toString());
    formData.append('eventDate', formValues.eventDate);
    formData.append('repeat', formValues.repeat);
    formData.append('visibilityLevel', formValues.visibilityLevel.toString());
    formData.append('date', formValues.eventDate);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.adminevent.updatEvent(this.editingEventId, formData).subscribe(() => {
      this.eventForm.reset({ repeat: 'none', visibilityLevel: 0, isMandatory: false });
      this.selectedFile = null;
      this.editingEventId = null;
      this.getEvents();
    });
  }

  cancelEdit() {
    this.eventForm.reset({ repeat: 'none', visibilityLevel: 0, isMandatory: false });
    this.selectedFile = null;
    this.editingEventId = null;
  }

  deleteEvent(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) return;

    this.adminevent.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter(e => e.id !== id);
    });
  }

  getVisibilityLabel(level: number): string {
    const match = this.visibilityOptions.find(o => o.value === level);
    return match ? match.label : 'Unknown';
  }



  autoGrow(event: any): void {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

autoGrowTextarea(): void {
  if (this.descriptionTextareaRef) {
    const textarea = this.descriptionTextareaRef.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}

resetTextareaHeight(): void {
  if (this.descriptionTextareaRef) {
    const textarea = this.descriptionTextareaRef.nativeElement;
    textarea.style.height = '120px';
  }
}

convertToParagraphs(text: string): string {
  if (!text) return '';

  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const paragraphs = escaped.split(/\n{2,}/g);
  return paragraphs
    .map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');
}

}
