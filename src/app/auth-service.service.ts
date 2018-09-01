import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie';


@Injectable()
export class AuthServiceService {

  constructor(private cookie: CookieService) { }
data;
getUser() {
 this.data = this.cookie.getObject('login');
 return this.data;

  }
}
