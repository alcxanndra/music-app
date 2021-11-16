import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../entities/playlist';
import { Song } from '../entities/song';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private apiServerUrl = environment.apiUrl + '/playlists';

  constructor(private http: HttpClient) { }

  public getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.apiServerUrl}`);
  }

  public getPlaylistById(playlistId: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiServerUrl}/${playlistId}`);
  }

  public addPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.apiServerUrl}`, playlist);
  }

  public deletePlaylist(playlistId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${playlistId}`);
  }

  public updatePlaylist(updatedPlaylist: Playlist, playlistId: number): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiServerUrl}/${playlistId}`, updatedPlaylist);
  }

  public getPlaylistSongs(playlistId: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiServerUrl}/${playlistId}/songs`);
  }

}
