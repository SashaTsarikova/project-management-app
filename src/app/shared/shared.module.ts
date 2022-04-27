import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
];

@NgModule({
  declarations: [],
  imports: MODULES,
  exports: MODULES,
})
export default class SharedModule {}
