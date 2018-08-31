///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Geolocation permissions granted');
      console.log('Latitude:' + position.coords.latitude);
      console.log('Longitude:' + position.coords.longitude);
    });


    Notification.requestPermission(function (result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      } else if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }
      console.log('Permission was granted for notifications');
    });

  }


}
