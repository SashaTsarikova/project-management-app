import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ILogin} from "../interfaces/ILogin.interface";
import {ISignUp} from "../interfaces/ISignUp.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  PATH = 'localhost:4000';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  login(loginUser: ILogin) {
    return this.http.post(`${this.PATH}/signin`, loginUser)
  }

  signup(signupUser: ISignUp) {
    return this.http.post(`${this.PATH}/signin`, signupUser)
  }
}
