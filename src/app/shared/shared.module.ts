import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MaterialModule } from "./material/material.module";

const MODULES = [
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  TranslateModule,
];

@NgModule({
  declarations: [
    ConfirmationComponent,
  ],
  imports: MODULES,
  exports: MODULES,
})
export default class SharedModule {}
