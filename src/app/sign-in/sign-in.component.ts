///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from "angular-6-social-login";
import {signUp} from "../sign-up/signUp";
import {SignInService} from "./sign-in.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form;
  hide=true;
  sign:signUp;

  constructor(public socialAuthService: AuthService,private signInService:SignInService,private router:Router,
              private snack:MatSnackBar,private cookie:CookieService) {
  }

  ngOnInit() {

    if (this.cookie.getObject('login') !== undefined) {
      this.router.navigate(['weatherForecast'])
    }
    this.sign=new signUp();
    this.form = new FormGroup({
      emailId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
          + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")
      ])),
      password: new FormControl('', Validators.required),

    })


  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){

      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.cookie.putObject('login',userData)
        this.router.navigate(['/weatherForecast'])
        this.snack.open('Welcome '+ userData.name,'X',{duration:5000})

      }
    );
  }

  onSubmit(signIn) {
    this.sign.emailId=signIn.emailId;
    this.sign.password=signIn.password;
    this.signInService.validateUser(JSON.stringify(this.sign)).subscribe(data=>{
      if(data.status){
        this.cookie.putObject('login',data)
        this.router.navigate(['/weatherForecast'])
        this.snack.open('Welcome '+ data.companyName,'X',{duration:5000})
      }
      else {
        let snackBarRef=  this.snack.open('No User Found','Sign Up',{duration:5000})
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/signUp'])
        });
      }
    })
  }

}
