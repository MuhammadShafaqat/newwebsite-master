import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TitlescreenComponent } from './titlescreen/titlescreen.component';
import { JoinAndDonatePopupComponent } from './join-and-donate-popup/join-and-donate-popup.component';
import { FooterComponent } from './footer/footer.component';
import { ShopComponent } from './shop/shop.component';
import { ActionsComponent } from './actions/actions.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ValuesComponent } from './values/values.component';
import { FaqComponent } from './faq/faq.component';
import { LangComponent } from './lang/lang.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ShortsVideoPlayerModule } from './shorts-videoplayer/shorts-videoplayer.module';
import { ShortsVideoPlayer } from './shorts-videoplayer/shorts-videoplayer.component';
import { TodolistComponent } from './todolist/todolist.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SigninComponent } from './auth-components/signin/signin.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TitlescreenComponent,
    JoinAndDonatePopupComponent,
    FooterComponent,
    ShopComponent,
    ActionsComponent,
    ContactFormComponent,
    TodolistComponent,
    ImpressumComponent,
    ValuesComponent,
    FaqComponent,
    ShortsVideoPlayer,
    HomeComponent,
    LangComponent,
    SigninComponent,
    SignupComponent
  
  ],
  imports: [
    //only modules
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ShortsVideoPlayerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    AboutComponent,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}