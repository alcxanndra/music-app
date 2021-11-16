import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SongDetails } from '../entities/songdetails';
import { Song } from '../entities/song';

@Injectable({
  providedIn: 'root'
})
export class SongdetailsService {

  private apiServerUrl = environment.apiUrl + '/songs';

  constructor(private http: HttpClient) { }

  public getSongDetailsBySongId(songId: number): Observable<SongDetails> {
    return this.http.get<SongDetails>(`${this.apiServerUrl}/${songId}/details`);
  }

}
