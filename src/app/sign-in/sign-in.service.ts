import { Injectable } from '@angular/core';
import {constants} from "../constants";
import {HttpClient} from "../HttpClient";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient) {

  }

  private uri: constants= new constants;

  url: string = this.uri.getUrl();


  validateUser(user) {
    return this.http.post(this.url+'user/login', user).pipe(map(res => res.json()));
  }

}
