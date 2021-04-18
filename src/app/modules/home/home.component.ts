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
  formValidation: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^([a-zA-Z0-9-+_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'
      ),
    ]),
    identificationType: new FormControl('', [Validators.required]),
    identificationNumber: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),

  });

  constructor() { }

  ngOnInit(): void {
  }
  checkCustomerData() {

  }

}
