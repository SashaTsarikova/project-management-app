import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { OneBoardComponent } from './pages/one-board/one-board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
  },
  {
    path: ':id',
    component: OneBoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BoardsRoutingModule { }
