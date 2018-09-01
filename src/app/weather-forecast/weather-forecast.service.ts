import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {


  constructor(private http: Http) {

  }





  getWeatherForecast(lat,long){
    let headers=new Headers();
    return this.http.get("https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/daily?lat="+lat+"&;lon="+long+"&;cnt=10&;appid=b1b15e88fa797225412429c1c50c122a1",
     {headers: headers}).pipe(map(res => res.json()));
  }


}

