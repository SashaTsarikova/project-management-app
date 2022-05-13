import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DialogRef } from '../../services/dialogs/dialogRef';
import { DIALOG_DATA } from '../../services/dialogs/dialogToken';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    private dialogRef: DialogRef,
    private fb: FormBuilder,
    public translate: TranslateService,
    @Inject(DIALOG_DATA) public data: {
      dataTitle : string;
      dataDescription: string
    },
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [this.data.dataTitle, Validators.required],
      description: [this.data.dataDescription, Validators.required],
    });
  }

  reject() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    if (!this.editForm.value) {
      return;
    }
    this.dialogRef.close(this.editForm.value);
  }

  confirm() {
    this.onSubmit();
  }
}
