import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Search } from "./search/search";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Search],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  env = environment;
  protected readonly title = signal('weathertrack-ui');
}
