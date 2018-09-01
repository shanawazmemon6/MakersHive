import { Injectable } from '@angular/core';
import {HttpClient} from "../HttpClient";
import {constants} from "../constants";
import { map } from "rxjs/internal/operators/map";


@Injectable({
  providedIn: 'root'
})
export class SignUpService {


  constructor(private http: HttpClient,) {
  }

  private uri: constants = new constants;
  url: string = this.uri.getUrl();


  saveUser(user) {
    return this.http.post(this.url + 'user/save', user).pipe(map(res => res.json()));
  }
}
