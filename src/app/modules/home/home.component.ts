import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidationService } from 'src/app/services/validation.service';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
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
  prospect: any = undefined;
  personJudicialRecords: any = undefined;
  score: number = 0;
  years: Array<any> = [];
  loading: boolean = false;
  validationMessages: FormValidationMessages = {
    names: [
      { type: 'required', message: 'Debe ingresar el nombre' }
    ],
    lastnames: [
      { type: 'required', message: 'Debe ingresar el apellido' }
    ],
    email: [
      { type: 'required', message: 'Debe ingresar el email' },
      { type: 'pattern', message: 'Debe ingresar un email valido' }

    ],
    identificationType: [
      { type: 'required', message: 'Debe ingresar el tipo de identificacion' }
    ],
    identificationNumber: [
      { type: 'required', message: 'Debe ingresar el numero de identificacion' }
    ],
    phoneNumber: [
      { type: 'required', message: 'Debe ingresar el numero de telefono' }
    ],
    day: [
      { type: 'required', message: 'Debe ingresar el dia de nacimiento' }
    ],
    month: [
      { type: 'required', message: 'Debe ingresar el mes de nacimiento' }
    ],
    year: [
      { type: 'required', message: 'Debe ingresar el año de nacimiento' }
    ],
  };
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

  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
    for (let index = 1900; index <= 2021; index++) {
      this.years.push(index);
    }
  }
  /**
   * checkCustomerData
   */
  checkCustomerData() {
    this.loading = true;
    const values = this.formValidation.value;
    this.validationService.validateProspect(values.identificationType, values.identificationNumber)
      .pipe(takeUntil(this.destroy$)).subscribe(async (value) => {
        this.prospect = value.exists;
        if (this.personJudicialRecords != undefined) {
          await this.getCustomerScore(values)
        }
      });

    this.validationService.validateJudicialReports(values.identificationType, values.identificationNumber)
      .pipe(takeUntil(this.destroy$)).subscribe(async (value) => {
        this.personJudicialRecords = value.personJudicialRecords;
        if (this.prospect != undefined) {
          await this.getCustomerScore(values)
        }
      });
  }
  /**
   * getCustomerScore
   * @param values formValues
   */
  async getCustomerScore(values: any): Promise<any> {
    if (this.score <= 0) {
      if ((this.personJudicialRecords != undefined && this.personJudicialRecords.length == 0) &&
        (this.prospect != undefined && this.prospect)) {
        let value = await this.validationService.getScore(values.identificationType, values.identificationNumber)
          .pipe(takeUntil(this.destroy$)).toPromise();
        this.score = JSON.parse(JSON.stringify(value)).score;
      } else {
        this.prospect = undefined;
        this.personJudicialRecords = undefined;
      }
    }
    this.loading = false;
  }

}
export interface FormValidationMessages {
  names: ValidationMessages[];
  lastnames: ValidationMessages[];
  email: ValidationMessages[];
  identificationType: ValidationMessages[];
  identificationNumber: ValidationMessages[];
  phoneNumber: ValidationMessages[];
  day: ValidationMessages[];
  month: ValidationMessages[];
  year: ValidationMessages[];
}
export interface ValidationMessages {
  type: string;
  message: string;
}
