import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpressumComponent } from './impressum/impressum.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { FaqComponent } from './faq/faq.component';
import { ActionsComponent } from './actions/actions.component';
import { EventsComponent } from './events/events.component';
import { AboutComponent } from './about/about.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { SigninComponent } from './auth-components/signin/signin.component';
import { AdminGuard } from './guards/admin.guard';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'article-list', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },

 // Lazy-loaded Admin Pannel
  {
    path: 'admin',
    canActivate: [AdminGuard], 
    loadChildren: () =>
      import('./admin-pannel/admin-pannel.module').then(m => m.AdminPannelModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
