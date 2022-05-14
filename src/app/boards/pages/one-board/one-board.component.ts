import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IColumn } from '../../interfaces/IColumn.interface';
import { BoardsService } from '../../services/boards.service';
import {DialogService} from "../../../shared/services/dialogs/dialog.service";
import {CreateNewColumnComponent} from "../../../shared/components/create-new-column/create-new-column.component";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {IBoard} from "../../interfaces/IBoard.interface";
import {ITask} from "../../interfaces/ITask.interface";
import {filter, switchMap} from "rxjs";

@Component({
  selector: 'app-one-board',
  templateUrl: './one-board.component.html',
  styleUrls: ['./one-board.component.scss'],
})
export class OneBoardComponent implements OnInit {
  boardId: string = this.route.snapshot.params['id'];

  color: string = '#47c383';

  searchString?: string = '';

  public board!: IBoard;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public boardsService: BoardsService,
    private dialog: DialogService
  ) {
    if ((this.router.getCurrentNavigation()?.extras as any).state) {
      if ((this.router.getCurrentNavigation()?.extras as any).state.color) {
        this.color = (
          this.router.getCurrentNavigation()?.extras as any
        ).state.color;
      }
    }
  }

  ngOnInit(): void {
    this.boardsService.updateCurrentBoard(this.boardId)
    this.boardsService.boardById$.subscribe(board => this.board = board)
  }

  goToBoards() {
    this.router.navigate(['boards']);
  }

  createColumn() {
    const dialogRef = this.dialog.open(CreateNewColumnComponent)
    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        switchMap(result => {
          const createColumn: IColumn = {
            title: result.title,
            order: this.boardsService.calculateColumnOrder()
          }
          return this.boardsService.createColumn(this.boardId, createColumn)
        })).subscribe(() => this.boardsService.updateCurrentBoard(this.boardId))
  }

  getColumnData(i: number, columnData: IColumn) {
    return {
      ...columnData,
      id: i,
      otherColumn: [...Array(this.board.columns?.length).keys()]
        .filter(el => el !== i).map(el => `column-${el}`)
    }
  }

  public dropTask(event: CdkDragDrop<ITask[] | undefined, ITask[]>): void {
    if (!event.container?.data) {
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  drop(event: CdkDragDrop<IColumn[]>) {
    if(event.previousIndex === event.currentIndex) {
      return;
    }
    moveItemInArray(<IColumn[]>this.board.columns, event.previousIndex, event.currentIndex);
  }
}
