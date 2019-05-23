import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  cities: string[] = ['City', 'Madrid', 'Barcelona', 'Valencia', 'Seville'];
  defaultCity = 'City';

  alertMessage = {
    username: 'username',
    ID: 'id',
    email: 'email',
    confirmPass: 'Enter the same password',
    city: 'Please, select a city',
    street: 'street',
    name: 'name',
    surname: 'surname'
  };

  inputsValidation = {
    username: false,
    ID: false,
    email: false,
    confirmPass: false,
    city: false,
    street: false,
    name: false,
    surname: false
  };


  registerForm: FormGroup;
  step1 = true;
  step2 = false;
  userChecked = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required]
      }),
      identityDocument: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      passwordConfirm: new FormControl(null, {
        validators: [Validators.required]
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
    this.registerForm.controls.city.setValue(this.defaultCity, { onlySelf: true });
  }

  changeState() {
    const user = {
      username: this.registerForm.value.username,
      identityDocument: this.registerForm.value.identityDocument,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      passwordConfirm: this.registerForm.value.passwordConfirm
    };
    /*
      If the inputs are filled up go to server.
      Can not use this.registerForm.invalid validation because is taking in account the inputs from step 2.
    */
    if ((user.username !== null || user.identityDocument !== null || user.password !== null || user.passwordConfirm !== null) && this.registerForm.controls.email.valid) {
      if (user.username !== '' && user.identityDocument !== '' && user.password !== '' && user.passwordConfirm !== '') {
        this.authService.checkUser(user).subscribe((res: any) => {
          this.serverMessage(res);
          if (res.userChecked) {
            this.step1 = !this.step1;
            this.step2 = !this.step2;
          }
        });
      } else {
        this.resetInputValidation();
        this.inputsValidation.confirmPass = true;
        this.alertMessage.confirmPass = 'Please, fill up all the fields';
      }
    } else if (this.registerForm.controls.email.invalid && user.email !== null) {
      this.resetInputValidation();
      this.inputsValidation.email = true;
      this.alertMessage.email = 'Email must be a valid email address';
    } else {
      this.resetInputValidation();
      this.inputsValidation.confirmPass = true;
      this.alertMessage.confirmPass = 'Please, fill up all the fields';
    }
  }

  onRegister() {
    if (this.registerForm.valid && this.registerForm.value.city !== 'City') {
      this.resetInputValidation();
      this.authService.registerUser(this.registerForm.value).subscribe((res: any) => {

        if (res.result.username === this.registerForm.value.username) {
          this.router.navigate(['/']);
        }
      });
    } else if (this.registerForm.value.city === 'City') {
      this.inputsValidation.city = true;
    } else {
      this.resetInputValidation();
      this.inputsValidation.surname = true;
      this.alertMessage.surname = 'Please, fill up all the fields';
    }
  }

  private serverMessage(response) {
    if (response.errUsername) {
      this.inputsValidation.username = true;
      this.alertMessage.username = response.message;
    } else {
      this.inputsValidation.username = false;
    }

    if (response.errID) {
      this.inputsValidation.ID = true;
      this.alertMessage.ID = response.message;
    } else {
      this.inputsValidation.ID = false;
    }

    if (response.errEmail) {
      this.inputsValidation.email = true;
      this.alertMessage.email = response.message;
    } else {
      this.inputsValidation.email = false;
    }

    if (response.errDiffPass) {
      this.inputsValidation.confirmPass = true;
      this.alertMessage.confirmPass = response.message;
    } else {
      this.inputsValidation.confirmPass = false;
    }
  }

  private resetInputValidation() {
    this.inputsValidation.username = false;
    this.inputsValidation.ID = false;
    this.inputsValidation.email = false;
    this.inputsValidation.confirmPass = false;
    this.inputsValidation.city = false;
    this.inputsValidation.street = false;
    this.inputsValidation.name = false;
    this.inputsValidation.surname = false;
  }

}
