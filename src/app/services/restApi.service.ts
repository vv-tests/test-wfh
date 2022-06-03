import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private _http: HttpClient) {}
  getMessages() {
    const endPoint = 'https://vervemobi.com/test.html';
    return this._http.get(endPoint);
  }
}
