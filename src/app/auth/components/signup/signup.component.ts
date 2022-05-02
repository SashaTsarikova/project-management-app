import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorHandlerService} from "../../../shared/services/errorhandler.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private err: ErrorHandlerService,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      repeatpass: ['', Validators.required]
    })
  }

  getErrorMessage() {
    if (this.signupForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.signupForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    if (!this.signupForm.value) {
      return;
    }

    if (this.signupForm.get('password')?.value !== this.signupForm.get('repeatpass')?.value) {
      this.err.errorHandler('Passwords do not match')
      return;
    }

    delete this.signupForm.value.repeatpass
    this.auth.signup(this.signupForm.value).subscribe(
      res => this.err.errorHandler('Signup success'),
      error => this.err.errorHandler('Error, Please try again'))
  }
}
