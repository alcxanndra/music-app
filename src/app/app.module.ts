import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ModalModule } from 'angular-bootstrap-md';
import { AuthGuard } from './guards/auth.guard'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';    
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingpageComponent,
    LoginComponent,
    RegisterComponent,
    DiscoverComponent,
    HomeComponent,
    UserProfileComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [AuthGuard, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
