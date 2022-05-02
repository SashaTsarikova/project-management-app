import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  getErrorMessage() {
    if (this.signupForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.signupForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    console.log(this.signupForm)
  }
}
