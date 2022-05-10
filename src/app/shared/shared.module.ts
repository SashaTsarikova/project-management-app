import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MaterialModule } from './material/material.module';
import { CreateNewBoardComponent } from './components/create-new-board/create-new-board.component';
import {CreateNewColumnComponent} from "./components/create-new-column/create-new-column.component";
import {CreateNewTaskComponent} from "./components/create-new-task/create-new-task.component";

const MODULES = [
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  TranslateModule,
];

@NgModule({
  declarations: [
    ConfirmationComponent,
    CreateNewBoardComponent,
    CreateNewColumnComponent,
    CreateNewTaskComponent
  ],
  imports: MODULES,
  exports: MODULES,
})
export class SharedModule {}
