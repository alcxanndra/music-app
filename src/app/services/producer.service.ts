import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producer } from '../entities/producer';
import { Song } from '../entities/song';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  private apiServerUrl = environment.apiUrl + '/producers';

  constructor(private http: HttpClient) { }

  public fetchImage(producerId: string): Observable<Blob> {
    let url = `http://localhost:8080/uploads/producers/${producerId}`;
    console.log("Producer image URL is " + url);

    return this.http.get(url, { responseType: 'blob' });
  }

  public getAllProducers(): Observable<Producer[]> {
    return this.http.get<Producer[]>(`${this.apiServerUrl}`);
  }

  public getProducerById(producerId: number): Observable<Producer> {
    return this.http.get<Producer>(`${this.apiServerUrl}/${producerId}`);
  }

  public addProducer(producer: Producer): Observable<Producer> {
    return this.http.post<Producer>(`${this.apiServerUrl}`, producer);
  }

  public deleteProducer(producerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${producerId}`);
  }

  public updateProducer(updatedProducer: Producer, producerId: number): Observable<Producer> {
    return this.http.put<Producer>(`${this.apiServerUrl}/${producerId}`, updatedProducer);
  }

  public getProducerSongs(producerId: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiServerUrl}/${producerId}/songs`);
  }

}
