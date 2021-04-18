import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  identificationTypes: Array<any> = [
    {
      label: "Cedula de Ciudadania",
      value: 1
    },
    {
      label: "Cedula de Extranjeria",
      value: 1
    }
  ];
  days: Array<any> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ];
  months: Array<any> = [
    {
      label: "Enero",
      value: 1
    },
    {
      label: "Febrero",
      value: 2
    },
    {
      label: "Marzo",
      value: 3
    },
    {
      label: "Abril",
      value: 4
    },
    {
      label: "Mayo",
      value: 5
    },
    {
      label: "Junio",
      value: 6
    },
    {
      label: "Julio",
      value: 7
    },
    {
      label: "Agosto",
      value: 8
    },
    {
      label: "Septiembre",
      value: 9
    },
    {
      label: "Octubre",
      value: 10
    },
    {
      label: "Noviembre",
      value: 11
    },
    {
      label: "Diciembre",
      value: 12
    },

  ];
  years: Array<any> = [];
  formValidation: FormGroup = new FormGroup({
    names: new FormControl('', [Validators.required]),
    lastnames: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^([a-zA-Z0-9-+_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'
      ),
    ]),
    identificationType: new FormControl('', [Validators.required]),
    identificationNumber: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    day: new FormControl('', [Validators.required]),
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),

  });

  constructor() { }

  ngOnInit(): void {
    for (let index = 1900; index <= 2021; index++) {
      this.years.push(index);
    }
  }
  async checkCustomerData(): Promise<any> {
    console.log("method");

  }

}
