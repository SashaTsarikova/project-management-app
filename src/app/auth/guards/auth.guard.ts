import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router, RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser: any = this.auth.currentUserValue;
    if (currentUser?.token) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
