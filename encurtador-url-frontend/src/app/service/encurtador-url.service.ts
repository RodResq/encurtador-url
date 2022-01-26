import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const API_PATH: String  = '/encurtador-rest/api';

@Injectable({
  providedIn: 'root'
})
export class EncurtadorUrlService {

  private readonly apiEncurtadorUrl = `${environment.URL_BACKEND}`;

  constructor(private http: HttpClient) { }

  encurtadorTest(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/text' })
    }
    return this.http.get(`${this.apiEncurtadorUrl}/test`, httpOptions);
  }

  encurtarUrl(urlOriginal: String): Observable<any> {
    return this.http.post(`${this.apiEncurtadorUrl}${API_PATH}`, { urlOriginal });
  }
}
