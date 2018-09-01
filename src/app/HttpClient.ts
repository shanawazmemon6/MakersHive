import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class HttpClient {


  constructor(private http: Http) {
  }
  createAuthorizationHeader(headers: Headers) {

    headers.append('Authorization', 'Basic ' +
      btoa('admin:12uq1a0551'));
    headers.append('Content-Type', 'application/json')
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }

}
