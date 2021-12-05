import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Playlist } from '../entities/playlist';
import { Song } from '../entities/song';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    headers = new HttpHeaders().set('access-control-allow-origin',"http://localhost:8080/");

    private apiServerUrl = environment.apiUrl + '/users';

    constructor(private http: HttpClient) { }

    public getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiServerUrl}`);
    }

    public getUserById(userId: number): Observable<User> {
      return this.http.get<User>(`${this.apiServerUrl}/${userId}`);
    }

    public addUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.apiServerUrl}`, user);
    }

    public deleteUser(userId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/${userId}`);
    }

    public updateUser(updatedUser: User, userId: number): Observable<User> {
      return this.http.put<User>(`${this.apiServerUrl}/${userId}`, updatedUser);
    }

    public updateUsername(newUsername: string, userId: number): Observable<User> {
      return this.http.patch<User>(`${this.apiServerUrl}/${userId}`, newUsername);
    }


    public getUserSavedSongs(userId: number): Observable<Song[]> {
      return this.http.get<Song[]>(`${this.apiServerUrl}/${userId}/savedSongs`);
    }

    public getUserPlaylists(userId: number): Observable<Playlist[]> {
      return this.http.get<Playlist[]>(`${this.apiServerUrl}/${userId}/playlists`);
    }
}
