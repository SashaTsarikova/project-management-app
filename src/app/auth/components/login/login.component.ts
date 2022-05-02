import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {ErrorHandlerService} from "../../../shared/services/errorhandler.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private err: ErrorHandlerService
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  getErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Not a valid email';
  }

  onSubmit() {
    if (!this.loginForm.value) {
      return;
    }
    this.auth.login(this.loginForm.value)
      .subscribe(
        res => this.err.errorHandler('Login success'),
        error => this.err.errorHandler('Incorrect email or password')
      )
  }
}
