import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NgForm } from '@angular/forms';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  standalone: true,
  styleUrls: ['./search.css'],
})
export class Search {

  city: string = '';

  onSubmit(myForm: NgForm): void {

    if(!myForm.valid)
      return;

    console.log(`Searching for city: ${this.city}`);

  }
}