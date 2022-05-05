import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PATH} from "../../auth/models/base-path";
import {ISignUp} from "../../auth/interfaces/ISignUp.interface";
import {map, Observable} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {IUser} from "../interfaces/IUser.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) { }

  getAllUsers() {
    return this.http.get(`${PATH}/users`)
  }

  getUserById(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${PATH}/users/${userId}`)
  }

  deleteUserById(userId: string) {
    return this.http.delete(`${PATH}/users/${userId}`)
  }

  updateUserById(userId: string, updateUser: ISignUp) {
    return this.http.put(`${PATH}/users/${userId}`, updateUser)
  }

  currentUserId() {
    return this.http.get<IUser[]>(`${PATH}/users`)
      .pipe(
        map(users => users.find(user => user.login === this.auth.currentUserValue)?.id)
      )
  }
}
