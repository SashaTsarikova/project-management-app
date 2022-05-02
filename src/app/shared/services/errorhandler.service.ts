import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  mySnackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  }

  errorHandler(err: string) {
    this.mySnackBarConfig['panelClass'] = ['notification','success'];
    this.snackBar.open(`${err}`, '', this.mySnackBarConfig)
  }
}
