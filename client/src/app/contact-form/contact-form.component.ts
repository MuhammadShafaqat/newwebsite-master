import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
name: string = '';
email: string = '';
participation: string = 'member'; //by default

constructor(private contact:ContactService){}

onSubmit(): void{
     if (!this.name || !this.email || !this.participation) {
      alert('Bitte füllen Sie alle Felder aus.');
      return;
    }

    const contactData = {
      name: this.name,
      email: this.email,
      participation: this.participation
    };
    
    this.contact.submitContact(contactData).subscribe({
       next: (res) => {
        alert(res.message || 'Kontaktformular wurde erfolgreich gesendet!');
        this.name = '';
        this.email = '';
        this.participation = 'member';
      },
       error: (err) => {
        console.error(err);
        alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      }
    })
}

}
