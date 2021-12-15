import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../entities/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiServerUrl = environment.apiUrl + '/songs';

  constructor(private http: HttpClient) { }

  public fetchImage(songId: string): Observable<Blob> {
    let url = `http://localhost:8080/uploads/songs/${songId}`;
    console.log("Song image URL is " + url);
    return this.http.get(url, { responseType: 'blob' });
  }

  public getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiServerUrl}`);
  }

  public getSongById(songId: number): Observable<Song> {
    return this.http.get<Song>(`${this.apiServerUrl}/${songId}`);
  }

  public addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(`${this.apiServerUrl}`, song);
  }

  public deleteSong(songId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${songId}`);
  }

  public updateSong(updatedSong: Song, songId: number): Observable<Song> {
    return this.http.put<Song>(`${this.apiServerUrl}/${songId}`, updatedSong);
  }

  public saveSongForUser(songId: number, userId: number): Observable<Song> {
    return this.http.put<Song>(`${this.apiServerUrl}/${songId}/save`, userId);
  }

}
