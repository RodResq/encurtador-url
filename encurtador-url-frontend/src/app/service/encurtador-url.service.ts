import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Url} from '../domain/url';

const API_PATH: String  = 'encurtador-rest/api';
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

  encurtarUrl(urlOriginal: string): Observable<Url> {
    return this.http.post<Url>(`${environment.url_base}${environment.contextPath}${API_PATH}`, { urlOriginal });
  }

  redirecionarUrlOriginal(url: string) {
    const urlRedirecionar = HTTPS_PREFIX + url;
    console.log(urlRedirecionar);

    // const url = `${environment.url_base}${environment.contextPath}${API_PATH}/${idUrl}`;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'Content-Type',
    //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    //   })
    // }
    if (url) {
      window.open(urlRedirecionar, "_blank");
    }
    // window.location.href= HTTPS_PREFIX + url;
    // return this.http.get(url, httpOptions);
  }
}
