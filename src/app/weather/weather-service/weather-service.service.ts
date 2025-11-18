// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CityWeather } from '../models/city-weather';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  getWeatherByCity(city: string): Observable<CityWeather>  {
    const url = `${this.baseUrl}/temperature/weather/${encodeURIComponent(city)}`;
    return this.http.get<CityWeather>(url);
  }
}