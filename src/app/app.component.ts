import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface TempByDay {
  cityName: string;
  temp: number;
  max: number;
  min: number;
  description: string;
  windSpeed: number;
  humidity: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weatherapp';
  public city: string = '';
  public maxMinDes?: TempByDay = {
    cityName: 'none',
    temp: 0,
    max: 0,
    min: 0,
    description: 'none',
    windSpeed: 0,
    humidity: 0,
  };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWeatherByCity('Tbilisi');
  }
  getWeatherByCity(city: string) {
    this.http
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=J5UFBQUU34SJGEVBQ7MENU9HZ`
      )
      .subscribe((response: any) => {
        this.maxMinDes = {
          cityName: response.address,
          temp: this.convertToFahrenheitToCelsius(response.days[0].temp),
          min: this.convertToFahrenheitToCelsius(response.days[0].tempmin),
          max: this.convertToFahrenheitToCelsius(response.days[0].tempmax),
          description: response.days[0].description,
          windSpeed: response.days[0].windspeed,
          humidity: response.days[0].humidity,
        };
      });
  }
  convertToFahrenheitToCelsius(fahrenheit: number | undefined): number {
    if (fahrenheit) {
      return Math.round(((fahrenheit - 32) * 5) / 9);
    }
    return 0;
  }
}
