import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './components/discover/discover.component';
import { HomeComponent } from './components/home/home.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const songsModule = () => import('./components/songs/songs.module').then(x => x.SongsModule);
const artistsModule = () => import('./components/artists/artists.module').then(x => x.ArtistsModule);
const genresModule = () => import('./components/genres/genres.module').then(x => x.GenresModule);
const producersModule = () => import('./components/producers/producers.module').then(x => x.ProducersModule);

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'home', component: HomeComponent },
  { path: 'songs', loadChildren: songsModule },
  { path: 'producers', loadChildren: producersModule },
  { path: 'artists', loadChildren: artistsModule },
  { path: 'genres', loadChildren: genresModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
