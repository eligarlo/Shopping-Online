import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  step1 = true;
  step2 = false;

  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      identityDocument: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      passwordConfirm: new FormControl(null, {
        validators: [Validators.required]
      }),
      username: new FormControl(null, {
        validators: [Validators.required],
      }),
      city: new FormControl(null, {
        validators: [Validators.required]
      }),
      street: new FormControl(null, {
        validators: [Validators.required]
      }),
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      surname: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
  }

  changeState() {
    this.step1 = !this.step1;
    this.step2 = !this.step2;
  }

  onRegister() {
    console.log(this.registerForm.value);
  }

}
