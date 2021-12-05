import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './components/discover/discover.component';
import { HomeComponent } from './components/home/home.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';

const songsModule = () => import('./components/songs/songs.module').then(x => x.SongsModule);
const artistsModule = () => import('./components/artists/artists.module').then(x => x.ArtistsModule);
const genresModule = () => import('./components/genres/genres.module').then(x => x.GenresModule);
const producersModule = () => import('./components/producers/producers.module').then(x => x.ProducersModule);

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'songs', loadChildren: songsModule,  canActivate : [AuthGuard] },
  { path: 'producers', loadChildren: producersModule, canActivate : [AuthGuard] },
  { path: 'artists', loadChildren: artistsModule, canActivate : [AuthGuard] },
  { path: 'genres', loadChildren: genresModule, canActivate : [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit/:id', component: UserProfileComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
