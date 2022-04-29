import { NgModule } from '@angular/core';

import { OneBoardComponent } from './pages/one-board/one-board.component';
import { BoardItemComponent } from './components/items/board-item/board-item.component';
import { ColumnItemComponent } from './components/items/column-item/column-item.component';
import { TaskItemComponent } from './components/items/task-item/task-item.component';
import { BoardFormComponent } from './components/forms/board-form/board-form.component';
import { ColumnFormComponent } from './components/forms/column-form/column-form.component';
import { TaskFormComponent } from './components/forms/task-form/task-form.component';
import { BoardsComponent } from './pages/boards/boards.component';
import SharedModule from '../shared/shared.module';
import BoardsRoutingModule from './boards-routing.module';

@NgModule({
  declarations: [
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
    BoardsRoutingModule,
    SharedModule,
  ],
})
export class BoardsModule { }
