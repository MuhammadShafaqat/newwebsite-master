import { Component, OnInit } from '@angular/core';
import { AdminuserService } from '../admin-services/adminuser.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent implements OnInit {
  users: any[] = [];
  loading = false;
  registrationKey: string = '';
  keyUpdateMessage: string = '';
  keyPreview: string = ''; // ✅ To show current key

  roleOptions = [
    { label: 'Super Admin', value: 0 },
    { label: 'Admin', value: 1 },
    { label: 'Editor', value: 2 },
    { label: 'Moderator', value: 3 },
    { label: 'Manager', value: 4 },
    { label: 'Contributor', value: 5 },
    { label: 'User', value: 6 }
  ];

  constructor(private adminuser: AdminuserService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchKeyPreview(); // ✅ Load key preview on page load
  }

  fetchUsers(): void {
    this.loading = true;
    this.adminuser.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  toggleActivation(user: any): void {
    const newStatus = !user.isActive;
    this.adminuser.updateUser(user.id, { isActive: newStatus }).subscribe({
      next: () => this.fetchUsers(),
      error: (err) => console.error(err)
    });
  }

  onRoleChange(event: Event, user: any): void {
    const selectElement = event.target as HTMLSelectElement;
    const newRole = Number(selectElement.value);

    this.adminuser.updateUser(user.id, { roleLevel: newRole }).subscribe({
      next: () => this.fetchUsers(),
      error: (err) => console.error(err)
    });
  }

  submitKey(): void {
    if (!this.registrationKey || this.registrationKey.length !== 4) {
      this.keyUpdateMessage = 'Key must be exactly 4 characters.';
      return;
    }

    this.adminuser.createOrUpdateRegistrationKey(this.registrationKey).subscribe({
      next: () => {
        this.keyUpdateMessage = 'Registration key updated successfully.';
        this.registrationKey = '';
        this.fetchKeyPreview(); // ✅ Refresh key preview
      },
      error: (err) => {
        console.error(err);
        this.keyUpdateMessage = 'Failed to update key.';
      }
    });
  }

  fetchKeyPreview(): void {
    this.adminuser.getKeyInfo().subscribe({
      next: (res) => {
        this.keyPreview = res.key || 'Hidden';
      },
      error: (err) => {
        console.error(err);
        this.keyPreview = 'N/A';
      }
    });
  }
}
