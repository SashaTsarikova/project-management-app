import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DialogRef } from 'src/app/shared/services/dialogs/dialogRef';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent implements OnInit {
  columnForm!: FormGroup;

  constructor(
    private dialogRef: DialogRef,
    private fb: FormBuilder,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.columnForm = this.fb.group({
      title: ['', Validators.required],
      order: ['', Validators.required],
    });
  }

  reject() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    if (!this.columnForm.value) {
      return;
    }
    this.dialogRef.close(this.columnForm.value);
  }

  confirm() {
    this.onSubmit();
  }
}
