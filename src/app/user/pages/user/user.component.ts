import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/shared/services/errorhandler.service';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/IUser.interface';
import { DialogService } from "../../../shared/services/dialogs/dialog.service";
import { ConfirmationComponent } from "../../../shared/components/confirmation/confirmation.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUser!: IUser;

  updateUserForm!: FormGroup;

  hide = true;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    private err: ErrorHandlerService,
    private dialogService: DialogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
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
        this.updateUserForm.controls['login'].setValue(this.currentUser.login)
        this.updateUserForm.controls['name'].setValue(this.currentUser.name)
      });
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit() {
    if (!this.updateUserForm.value) {
      return;
    }

    if (this.updateUserForm.get('password')?.value !== this.updateUserForm.get('repeatpass')?.value) {
      this.err.errorHandler('Passwords do not match');
      return;
    }
    delete this.updateUserForm.value.repeatpass;

    const dialogRef = this.dialogService.open(ConfirmationComponent, { data: `update user data?` })
    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.currentUser.id) {
        this.userService.updateUserById(this.currentUser.id, this.updateUserForm.value)
          .subscribe((response: IUser) => {
            this.userService.updateUser(response.login)
            this.router.navigate(['/boards'])
          })
      }
    });
  }
}
