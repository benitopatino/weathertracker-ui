// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  getWeatherByCity(city: string) {
    return this.http.get(`${this.baseUrl}/weather?city=${encodeURIComponent(city)}`);
  }
}