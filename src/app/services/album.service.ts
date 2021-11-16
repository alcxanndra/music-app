import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../entities/album';
import { Song } from '../entities/song';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private apiServerUrl = environment.apiUrl + '/albums';

  constructor(private http: HttpClient) { }

  public getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiServerUrl}`);
  }

  public getAlbumById(albumId: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiServerUrl}/${albumId}`);
  }

  public addAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(`${this.apiServerUrl}`, album);
  }

  public updateAlbum(updatedAlbum: Album, albumId: number): Observable<Album> {
    return this.http.put<Album>(`${this.apiServerUrl}/${albumId}`, updatedAlbum);
  }

  public deleteAlbum(albumId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${albumId}`);
  }

  public getAlbumSongs(albumId: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiServerUrl}/${albumId}/songs`);
  }
}
