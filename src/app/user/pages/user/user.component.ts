import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUser} from "../../interfaces/IUser.interface";
import {switchMap} from "rxjs";
import {ISignUp} from "../../../auth/interfaces/ISignUp.interface";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUser!: IUser;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUserId()
      .pipe(
        switchMap((user?: string) => {
          return this.userService.getUserById(user as string)
        })
      ).subscribe((userData: IUser) => this.currentUser = userData)
  }

  changeUserData(updateUser: ISignUp) {
    this.userService.updateUserById(this.currentUser.id as string, updateUser).subscribe()
  }
}
