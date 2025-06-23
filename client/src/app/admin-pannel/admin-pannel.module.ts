import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPannelRoutingModule } from './admin-pannel-routing.module';
import { AdminInfobannerComponent } from './admin-infobanner/admin-infobanner.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminLayoutComponent, 
   AdminInfobannerComponent, 
   AdminEventsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminPannelRoutingModule,
    MatIconModule
  ]
})
export class AdminPannelModule { }
