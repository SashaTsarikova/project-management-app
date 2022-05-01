import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
];

@NgModule({
  declarations: [
    ConfirmationComponent
  ],
  imports: MODULES,
  exports: MODULES,
})
export default class SharedModule {}
