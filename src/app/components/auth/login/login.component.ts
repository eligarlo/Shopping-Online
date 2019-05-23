import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from 'src/app/models/auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  alertMessage = {
    username: '',
    password: ''
  };

  inputsValidation = {
    username: false,
    password: false
  };

  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onLogin(): AuthData {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      this.resetValues();
      console.log(res);
    }, err => {
      console.log(err);
      this.resetValues();
      if (err.error.errUsername) {
        this.inputsValidation.username = true;
        this.alertMessage.username = err.error.message;
        return;
      }
      this.inputsValidation.password = true;
      this.alertMessage.password = err.error.message;
    });
  }

  private resetValues() {
    this.inputsValidation.username = false;
    this.inputsValidation.password = false;
    this.alertMessage.username = '';
    this.alertMessage.password = '';
  }

}
