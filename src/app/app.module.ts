import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {HttpModule} from '@angular/http';
import { AgmCoreModule } from '@agm/core';


import { MatButtonModule, MatToolbarModule,
  MatSidenavModule, MatIconModule,
  MatListModule, MatFormFieldModule,
  MatInputModule, MatCardModule, MatSnackBarModule, MatMenuModule,MatGridListModule
} from '@angular/material';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

import {CookieModule, CookieService} from "ngx-cookie";
import {AuthServiceService} from "./auth-service.service";
import {AuthGuard} from "./authguard";
import {SignUpService} from "./sign-up/sign-up.service";
import {HttpClient} from "./HttpClient";
import {WeatherForecastService} from "./weather-forecast/weather-forecast.service";

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("313992086025361")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("663728440673-rchds4ucp925h6qu6pd14j2kfhrpd6ae.apps.googleusercontent.com")
      },
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    SignInComponent,
    SignUpComponent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SocialLoginModule,
    ReactiveFormsModule,
    LayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatGridListModule,
    CookieModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbJHaGku_3v2Z8jY6adIIsCfckIwV2b_U'
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: SignInComponent
      },
      {
        path: 'signUp',
        component: SignUpComponent
      },
      {
        path:'weatherForecast',
        component:WeatherForecastComponent,
        canActivate: [AuthGuard]

      }
    ])
  ],
  providers: [{provide: AuthServiceConfig, useFactory: getAuthServiceConfigs},CookieService,AuthServiceService,AuthGuard,
    SignUpService,HttpClient,WeatherForecastService],
  bootstrap: [AppComponent]
})



export class AppModule { }
