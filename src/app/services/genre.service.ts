import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../entities/genre';
import { Song } from '../entities/song';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private apiServerUrl = environment.apiUrl + '/genres';

  constructor(private http: HttpClient) { }

  public fetchImage(genreId: string): Observable<Blob> {
    let url = `http://localhost:8080/uploads/genres/${genreId}`;
    console.log("Genre image URL is " + url);

    return this.http.get(url, { responseType: 'blob' });
  }

  public getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiServerUrl}`);
  }

  public getGenreById(genreId: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiServerUrl}/${genreId}`);
  }

  public addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${this.apiServerUrl}`, genre);
  }

  public deleteGenre(genreId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${genreId}`);
  }

  public updateGenre(updatedGenre: Genre, genreId: number): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiServerUrl}/${genreId}`, updatedGenre);
  }

  public getGenreSongs(genreId: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiServerUrl}/${genreId}/songs`);
  }

}
