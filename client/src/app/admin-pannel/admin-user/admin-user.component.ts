import { Component, OnInit } from '@angular/core';
import { AdminuserService } from '../admin-services/adminuser.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent implements OnInit{
   users: any[] = [];
  loading = false;

roleOptions = [
  { label: 'Super Admin', value: 0 },
  { label: 'Admin', value: 1 },
  { label: 'Editor', value: 2 },
  { label: 'Moderator', value: 3 },
  { label: 'Manager', value: 4 },
  { label: 'Contributor', value: 5 },
  { label: 'User', value: 6 }
];


constructor(private adminuser:AdminuserService){}
  ngOnInit(): void {
    this.fetchUsers();
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


}
