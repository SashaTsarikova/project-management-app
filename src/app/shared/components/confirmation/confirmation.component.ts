import {Component, Inject, OnInit} from '@angular/core';
import {DialogRef} from "../../services/dialogs/dialogRef";
import {DIALOG_DATA} from "../../services/dialogs/dialogToken";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close(true);
  }

  reject() {
    this.dialogRef.close(false);
  }
}
