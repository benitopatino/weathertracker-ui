import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NgForm } from '@angular/forms';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { WeatherService } from '../weather/weather-service/weather-service.service';
import { CityWeather } from '../weather/models/city-weather';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  standalone: true,
  styleUrls: ['./search.css'],
})
export class Search {

  city: string = '';
  cityWeather: CityWeather | null = null;


  constructor(private weatherService: WeatherService) {}

  onSubmit(myForm: NgForm): void {

    if(!myForm.valid)
      return;

    console.log(`Searching for city: ${this.city}`);

        // Call the API: choose which endpoint you want
    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: res => {
        this.cityWeather = res;
      },
      error: err => {
        console.error(err);
      }
    });

  }
}