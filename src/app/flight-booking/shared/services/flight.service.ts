import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Flight } from '../../../entities/flight';

@Injectable({ providedIn: 'root' })
export class FlightService {
  url = 'http://www.angular.at/api/flight';
  // url = 'https://demo.angulararchitects.io/api/Flight';

  headers = new HttpHeaders().set('Accept', 'application/json');

  constructor(private http: HttpClient) {}

  find(from: string, to: string, urgent = false): Observable<Flight[]> {
    const url = urgent ? 'http://www.angular.at/api/error?code=403' : this.url;
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<Flight[]>(url, { headers: this.headers, params });
  }

  findById(id: string): Observable<Flight> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Flight>(this.url, { headers: this.headers, params });
  }

  save(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.url, flight, { headers: this.headers });
  }
}
