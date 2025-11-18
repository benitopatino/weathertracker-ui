// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  getWeatherByCity(city: string) {
    const url = `${this.baseUrl}/temperature/weather/${encodeURIComponent(city)}`;
    return this.http.get(url);
  }
}