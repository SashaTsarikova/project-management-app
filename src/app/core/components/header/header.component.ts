import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userName = '';

  public isLoggedIn = false;

  public headerFixed:boolean = false;

  @HostListener('window:scroll', ['$event.target'])
  onScroll(): void {
    if (window.scrollY > 10) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }

  constructor(public translate: TranslateService, private router: Router) { }

  ngOnInit(): void { }

  changeLang(lang: string) {
    if (lang) {
      this.translate.use(lang);
    }
  }

  goToLogin() {
    this.router.navigate(['auth', 'login']);
  }

  goToSignup() {
    this.router.navigate(['auth', 'signup']);
  }

  goToUser() {
    this.router.navigate(['user']);
  }
}
