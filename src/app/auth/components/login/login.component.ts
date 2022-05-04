import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit() {
    if (!this.loginForm.value) {
      return;
    }
    this.auth.login(this.loginForm.value)
      .subscribe(
        res => this.err.errorHandler('Login success'),
        error => this.err.errorHandler(error.error.message)
      )
  }
}
