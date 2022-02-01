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

  constructor(private http: HttpClient) { }

  encurtarUrl(urlOriginal: string): Observable<Url> {
    return this.http.post<Url>(`${environment.url_base}${environment.contextPath}${API_PATH}`, { urlOriginal });
  }

  redirecionarUrlOriginal(url: string) {
    const urlRedirecionar = HTTPS_PREFIX + url;
    if (url) {
      window.open(urlRedirecionar, "_blank");
    }
    // const url = `${environment.url_base}${environment.contextPath}${API_PATH}/${idUrl}`;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'Content-Type',
    //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    //   })
    // }
    // window.location.href= HTTPS_PREFIX + url;
    // return this.http.get(url, httpOptions);
  }

  buscarUrl(value): Observable<Url> {
    return this.http
      .get<Url>(`${environment.url_base}${environment.contextPath}${API_PATH}/codigo/
      ${value}`);
  }
}
