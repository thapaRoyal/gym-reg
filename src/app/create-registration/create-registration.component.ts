import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages: string[] = ['Monthly', 'Quaterly', 'Yearly'];
  public genders: string[] = ['Male', 'Female'];
  public importantList: string[] = [
    'Toxic fat reduction',
    'Energy and Endurance',
    'Building lean muscle',
    'Healthier Digestive Function',
    'Fitness',
  ];

  public registerForm!: FormGroup;

  public userIdToUpdate!:number;
  public isUpdateActive:boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private api: ApiService, private activatedRoute: ActivatedRoute , private toastService: NgToastService) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });

    this.registerForm.controls['height'].valueChanges.subscribe(res  => {
      this.calculateBmi(res);
    })

    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate).subscribe(res =>{
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      })
    })
  }

  submit() {
    this.api.postRegistration(this.registerForm.value).subscribe(
      res => {
        this.toastService.success({detail: "Success", summary:"Enquiry Added", duration: 3000});
        this.registerForm.reset();
      }
    )
  }

  update(){
    this.api.updateRegisterUser(this.registerForm.value, this.userIdToUpdate).subscribe(
      res => {
        this.toastService.success({detail: "Success", summary:"Enquiry Updated", duration: 3000});
        this.registerForm.reset();
        this.router.navigate(['list'])
      }
    )
  }

  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);

    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue('Underweight');
        break;
      case bmi >= 18.5 && bmi <= 25:
        this.registerForm.controls['bmiResult'].patchValue('Normal');
        break;
      case bmi >= 25 && bmi <= 30:
        this.registerForm.controls['bmiResult'].patchValue('Overweight');
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue('Obese');
        break;
    }
  }

  fillFormToUpdate(user: User){
    this.registerForm.setValue(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        weight: user.weight,
        height: user.height,
        bmi: user.bmi,
        bmiResult: user.bmiResult,
        gender: user.gender,
        requireTrainer: user.requireTrainer,
        package: user.package,
        important: user.important,
        haveGymBefore: user.haveGymBefore,
        enquiryDate: user.enquiryDate, 
      }
    )
  }
}
