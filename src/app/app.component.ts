import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2' 

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  weather: any;
  url = `https://api.openweathermap.org/data/2.5/weather?q=`;
  apiKey = '54a7cac9a681b41b647a0161cbc9662d';

  constructor() {}

  ngOnInit(): void {
    $('#form').on('submit', (e: any) => {
      e.preventDefault();
      this.submitData(e.target[0].value);
    });
  }

  getWeather(cityName: string) {
    $.get(`${this.url}${cityName}&appid=${this.apiKey}`, (data: any) => {
      this.weather = data;
    }).fail(function(){
      Swal.fire({
        icon: "error",
        title: "Hubo algún error, intentalo de nuevo",
        text: "¡La ciudad no fue encontrada!",
      });
    });
  }

  submitData(value: string) {
    if (value) {
      this.getWeather(value);
    } else {
      Swal.fire({
        icon: "error",
        title: "Hubo algún error, intentalo de nuevo",
        text: "¡Ingresa un nombre para la ciudad!",
      });     
    }
  }
}