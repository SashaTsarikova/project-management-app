import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';

import CoreModule from './core/core.module';
import { UserComponent } from './user/pages/user/user.component';
import { BoardsComponent } from './boards/pages/boards/boards.component';
import { OneBoardComponent } from './boards/pages/one-board/one-board.component';
import { BoardItemComponent } from './boards/components/items/board-item/board-item.component';
import { ColumnItemComponent } from './boards/components/items/column-item/column-item.component';
import { TaskItemComponent } from './boards/components/items/task-item/task-item.component';
import { BoardFormComponent } from './boards/components/forms/board-form/board-form.component';
import { ColumnFormComponent } from './boards/components/forms/column-form/column-form.component';
import { TaskFormComponent } from './boards/components/forms/task-form/task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    BoardsComponent,
    OneBoardComponent,
    BoardItemComponent,
    ColumnItemComponent,
    TaskItemComponent,
    BoardFormComponent,
    ColumnFormComponent,
    TaskFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export default class AppModule { }
