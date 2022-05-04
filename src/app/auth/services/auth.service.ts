import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ILogin} from '../interfaces/ILogin.interface';
import {ISignUp} from '../interfaces/ISignUp.interface';
import {PATH} from '../models/base-path';
import {IUser} from "../interfaces/IUser.interface.";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser$: Observable<IUser>;

  userToken: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('token') || '')

  constructor(
      private http: HttpClient,
      private router: Router
      ) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({id: '', login: '', name: ''});
  }

  login(loginUser: ILogin) {
    return this.http.post(`${PATH}/signin`, loginUser)
      .pipe(
        tap((token: any) => {
            this.userToken.next(token.token);
            localStorage.setItem('token', token.token)
        }),
        switchMap(() => {
          console.log('route')
          return this.router.navigate(['boards'])
        })
      )
  }

  signup(signupUser: ISignUp) {
    return this.http.post(`${PATH}/signup`, signupUser)
      .pipe(
        switchMap((userData) => {
          this.currentUserSubject.next(userData as IUser)
          const user: ILogin = {
            login: signupUser.login,
            password: signupUser.password
          }
          return this.login(user)
        })
      );
  }
}
