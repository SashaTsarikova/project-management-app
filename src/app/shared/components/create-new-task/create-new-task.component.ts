import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DialogRef } from '../../services/dialogs/dialogRef';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.scss'],
})
export class CreateNewTaskComponent implements OnInit {
  titleForm!: FormGroup;

  constructor(
    private dialogRef: DialogRef,
    private fb: FormBuilder,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.titleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  reject() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    if (!this.titleForm.value) {
      return;
    }
    this.dialogRef.close(this.titleForm.value);
  }

  confirm() {
    this.onSubmit();
  }
}
