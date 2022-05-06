import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { CreateNewBoardComponent } from 'src/app/shared/components/create-new-board/create-new-board.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userName = '';

  public isLoggedIn = true;

  public headerFixed:boolean = false;

  @HostListener('window:scroll', ['$event.target'])
  onScroll(): void {
    if (window.scrollY > 10) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }

  constructor(public translate: TranslateService, private router: Router, private dialog: DialogService) { }

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

  createNewBoard() {
    const dialogRef = this.dialog.open(CreateNewBoardComponent);
  }
}
