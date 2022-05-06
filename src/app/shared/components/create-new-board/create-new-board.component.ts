import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '../../services/dialogs/dialogRef';

@Component({
  selector: 'app-create-new-board',
  templateUrl: './create-new-board.component.html',
  styleUrls: ['./create-new-board.component.scss'],
})
export class CreateNewBoardComponent implements OnInit {
  titleForm!: FormGroup;

  constructor(
    private dialogRef: DialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.titleForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  /* confirm() {
    this.dialogRef.close(true);
  } */

  reject() {
    this.dialogRef.close(false);
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit() {
    if (!this.titleForm.value) {
      this.dialogRef.close(true);
    } else {
      
    }
  }
}
