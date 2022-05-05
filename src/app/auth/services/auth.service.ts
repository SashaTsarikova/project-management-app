import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ILogin} from '../interfaces/ILogin.interface';
import {ISignUp} from '../interfaces/ISignUp.interface';
import {PATH} from '../models/base-path';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('currentUser') || '');
  public currentUser$: Observable<string> = this.currentUserSubject.asObservable();

  userToken: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('token') || '')

  constructor(
      private http: HttpClient,
      private router: Router
      ) {}

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next('');
  }

  login(loginUser: ILogin) {
    localStorage.setItem('currentUser', loginUser.login)
    this.currentUserSubject.next(loginUser.login)

    return this.http.post(`${PATH}/signin`, loginUser)
      .pipe(
        tap((token: any) => {
            this.userToken.next(token.token);
            localStorage.setItem('token', token.token)
        }),
        switchMap(() => this.router.navigate(['boards']))
      )
  }

  signup(signupUser: ISignUp) {
    return this.http.post(`${PATH}/signup`, signupUser)
      .pipe(
        switchMap((userData) => {
          const user: ILogin = {
            login: signupUser.login,
            password: signupUser.password
          }
          return this.login(user)
        })
      );
  }
}
