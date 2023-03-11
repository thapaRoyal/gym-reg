import { Component } from '@angular/core';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent {
  public packages:string[] =  ['Monthly', "Quaterly", "Yearly"];
  public genders:string[] = ["Male", "Female"];
  public importantList:string[] = [
    "Toxic fat reduction",
    "Energy and Endurance",
    "Building lean muscle",
    "Healthier Digestive Function",
    "Fitness"
  ]

}
