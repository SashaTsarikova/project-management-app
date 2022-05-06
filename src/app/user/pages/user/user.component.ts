import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ErrorHandlerService } from 'src/app/shared/services/errorhandler.service';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/IUser.interface';
import { ISignUp } from '../../../auth/interfaces/ISignUp.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUser!: IUser;

  signupForm!: FormGroup;

  hide = true;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    private err: ErrorHandlerService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      login: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeatpass: ['', Validators.required],
    });

    this.userService
      .currentUserId()
      .pipe(
        switchMap((user?: string) => this.userService.getUserById(user as string)),
      )
      .subscribe((userData: IUser) => {
        this.currentUser = userData;
        this.signupForm = this.fb.group({
          login: [this.currentUser.login, Validators.required],
          name: [this.currentUser.name, Validators.required],
          password: ['', Validators.required],
          repeatpass: ['', Validators.required],
        });
      });
  }

  changeUserData(updateUser: ISignUp) {
    this.userService
      .updateUserById(this.currentUser.id as string, updateUser)
      .subscribe();
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit() {
    if (!this.signupForm.value) {
      return;
    }

    if (this.signupForm.get('password')?.value !== this.signupForm.get('repeatpass')?.value) {
      this.err.errorHandler('Passwords do not match');
      return;
    }

    delete this.signupForm.value.repeatpass;
    this.auth.signup(this.signupForm.value).subscribe(
      (res) => this.err.errorHandler('Signup success'),
      (error) => this.err.errorHandler(error.error.message),
    );
  }
}
