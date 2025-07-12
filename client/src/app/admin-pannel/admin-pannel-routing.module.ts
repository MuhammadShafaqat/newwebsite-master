import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminInfobannerComponent } from './admin-infobanner/admin-infobanner.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminArticlesComponent } from './admin-articles/admin-articles.component';
import { AdminPressComponent } from './admin-press/admin-press.component';
import { AdminShopComponent } from './admin-shop/admin-shop.component';
import { AdminVideosComponent } from './admin-videos/admin-videos.component';
import { AdminGuard } from '../guards/admin.guard';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminActionComponent } from './admin-action/admin-action.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard], 
    children: [
      {path:'admin-articles', component:AdminArticlesComponent},
      { path: 'admin-infobanner', component: AdminInfobannerComponent },
      { path: 'admin-events', component: AdminEventsComponent },
       { path: 'admin-press', component: AdminPressComponent },
      { path: 'admin-shop', component:  AdminShopComponent},
      { path: 'admin-videos', component: AdminVideosComponent },
      { path: 'admin-user', component: AdminUserComponent },
       { path: 'admin-action', component: AdminActionComponent },
       { path: 'admin-orders', component: AdminOrdersComponent },
      { path: '', redirectTo: 'admin-articles', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPannelRoutingModule { }
