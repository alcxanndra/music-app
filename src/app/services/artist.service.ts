import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../entities/artist';
import { Album } from '../entities/album';
import { Song } from '../entities/song';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private apiServerUrl = environment.apiUrl + '/artists';

  constructor(private http: HttpClient) { }

  public getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiServerUrl}`);
  }

  public getArtistById(artistId: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiServerUrl}/${artistId}`);
  }

  public addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(`${this.apiServerUrl}`, artist);
  }

  public deleteArtist(artistId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${artistId}`);
  }

  public updateArtist(updatedArtist: Artist, artistId: number): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiServerUrl}/${artistId}`, updatedArtist);
  }

  public getArtistSongs(artistId: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiServerUrl}/${artistId}/songs`);
  }

  public getArtistAlbums(artistId: number): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiServerUrl}/${artistId}/albums`);
  }

}
