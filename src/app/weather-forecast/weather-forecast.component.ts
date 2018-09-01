///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {MainNavComponent} from "../main-nav/main-nav.component";
import {WeatherForecastService} from "./weather-forecast.service";
import { Chart } from 'chart.js';
import {CookieService} from "ngx-cookie";
declare var google: any;


@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  breakpoint;
  weatherData:any;
  chart = [];
  title: string = 'My first AGM project';
  lat: number;
  lng: number ;

  pos:any;
  forecast=["Temperature","Pressure","Humidity","Speed","Rain","Degree"];

  constructor(private manNav:MainNavComponent,private weatherForecast:WeatherForecastService,private cookie:CookieService) {
    this.manNav.signInSuccessful();
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 576) ? 1 : 2;


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position =>{
        this.lat=position.coords.latitude;
        this.lng=position.coords.longitude;
      } ));
    } else {
    }
    navigator.mediaDevices.getUserMedia({ audio: true }) .then(function(stream) {
      console.log('You let me use your mic!')
    })
      .catch(function(err) {
        console.log('No mic for you!')
      });


    Notification.requestPermission(function (result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      } else if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }


      setInterval(function(){  new Notification("Weather Data", {
        body: "",
        icon: 'https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-512.png',
        dir: 'auto'
      }); }, 1000*60*60);


    });

this.getData(this.lat,this.lng);
  }

  getData(lat,long){
    this.weatherForecast.
    getWeatherForecast(lat,long).
    subscribe(data=>{
      let temp_max = data['list'].map(res => res.temp.max);
      let temp_min = data['list'].map(res => res.temp.min);
      let temp_eve = data['list'].map(res => res.temp.eve);
      let temp_day = data['list'].map(res => res.temp.day);
      let temp_morn = data['list'].map(res => res.temp.morn);
      let temp_night = data['list'].map(res => res.temp.night);
      let pressure=data['list'].map(res=>res.pressure);
      let humidity=data['list'].map(res=>res.humidity);
      let speed=data['list'].map(res=>res.speed);
      let rain=data['list'].map(res=>res.rain);
      let deg=data['list'].map(res=>res.deg);
      this.weatherData=data['list'][9];
      let alldates = data['list'].map(res => res.dt)
      let weatherDates = []
      alldates.forEach((res) => {
        let jsdate = new Date(res * 1000)
        weatherDates.push(jsdate.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
      })

      this.temperatureChart(weatherDates,temp_max,temp_min,temp_eve,temp_day,temp_morn,temp_night);
      this.pressureChart(weatherDates,pressure)
      this.humidityChart(weatherDates,humidity)
      this.speedChart(weatherDates,speed);
      this.rainChart(weatherDates,rain);
      this.degreeChart(weatherDates,deg)

    })
  }


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 576) ? 1 : 2;
  }


  degreeChart(weatherDates,degree){
    this.chart = new Chart('DegreeChart', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: degree,
            borderColor:'#8b0000',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              maxRotation: 0
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }



  rainChart(weatherDates,rain){
    this.chart = new Chart('RainChart', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: rain,
            borderColor:'#c6e2ff',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              maxRotation: 0
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }

  speedChart(weatherDates,speed){
    this.chart = new Chart('SpeedChart', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: speed,
            borderColor:'#ffcc00',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              maxRotation: 0
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }





  humidityChart(weatherDates,humidity){
    this.chart = new Chart('HumidityChart', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: humidity,
            borderColor:'#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              maxRotation: 0
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }




  pressureChart(weatherDates,pressure){
    this.chart = new Chart('PressureChart', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: pressure,
            backgroundColor: "#f6546a",
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              maxRotation: 0
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }


  temperatureChart(weatherDates,max,min,eve,day,morn,night){
    this.chart = new Chart('TemperatureChart', {
      type: 'bar',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: max,
            backgroundColor: "#3cba9f",
            fill: false


          },
          {
            data: min,
            backgroundColor: "#ffcc00",
            fill: false
          },
          {
            data: eve,
            backgroundColor: "#088da5",
            fill: false
          },
          {
            data: day,
            backgroundColor: "#f6546a",
            fill: false,
          },
          {
            data: morn,
            backgroundColor: "#c6e2ff",
            fill: false
          },
          {
            data: night,
            backgroundColor: "#8b0000",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              maxRotation: 0 // angle in degrees
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }


}
