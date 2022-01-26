import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Url} from '../domain/url';

const API_PATH: String  = '/encurtador-rest/api';
const HTTPS_PREFIX = 'https://';

@Injectable({
  providedIn: 'root'
})
export class EncurtadorUrlService {

  private readonly apiEncurtadorUrl = `${environment.url_base}`;

  constructor(private http: HttpClient) { }

  encurtadorTest(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/text' })
    }
    return this.http.get(`${this.apiEncurtadorUrl}/test`, httpOptions);
  }

  encurtarUrl(urlOriginal: String): Observable<Url> {
    return this.http.post<Url>(`${this.apiEncurtadorUrl}${API_PATH}`, { urlOriginal });
  }

  redirecionarUrlOriginal(url: any) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'Content-Type',
    //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    //   })
    // }
    window.open(HTTPS_PREFIX + url, "_blank");
    // window.location.href= HTTPS_PREFIX + url;
    // return this.http.get(`${this.apiEncurtadorUrl}${API_PATH}/${idUrl}`, httpOptions);
  }
}
