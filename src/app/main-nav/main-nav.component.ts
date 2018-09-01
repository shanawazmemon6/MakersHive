import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  signIn=true;
  signUp=true;
  signOut=false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private cookie:CookieService) {}


  signInSuccessful=function () {
    this.signIn=false;
    this.signUp=false
    this.signOut=true;
  }

  logout(drawer){
    if(this.cookie.remove('login')){
      this.signIn=true;
      this.signUp=true;
      this.signOut=false;
      drawer.toggle();

    }
  }


}
