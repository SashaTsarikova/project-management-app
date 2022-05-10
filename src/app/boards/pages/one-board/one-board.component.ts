import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IColumn } from '../../interfaces/IColumn.interface';
import { BoardsService } from '../../services/boards.service';
import {DialogService} from "../../../shared/services/dialogs/dialog.service";
import {CreateNewColumnComponent} from "../../../shared/components/create-new-column/create-new-column.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {IBoard} from "../../interfaces/IBoard.interface";

@Component({
  selector: 'app-one-board',
  templateUrl: './one-board.component.html',
  styleUrls: ['./one-board.component.scss'],
})
export class OneBoardComponent implements OnInit {
  boardId: string = this.route.snapshot.params['id'];

  color: string = '#47c383';

  public board$!: Observable<any>;

  public columns!: IColumn[];

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
    this.board$ = this.boardsService.getBoardById(this.boardId);
    this.boardsService.updateColumns(this.boardId)
    this.boardsService.allColumns$.subscribe(columns => this.columns = columns)
  }

  goToBoards() {
    this.router.navigate(['boards']);
  }

  createColumn() {
    const dialogRef = this.dialog.open(CreateNewColumnComponent)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const createColumn: IColumn = {
          title: result.title,
          order: this.boardsService.calculateColumnOrder()
        }
        this.boardsService.createColumn(this.boardId, createColumn).subscribe(() => this.boardsService.updateColumns(this.boardId))
      }
    })
  }

  drop(event: CdkDragDrop<IBoard[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    const replaceColumn = this.boardsService.findColumns(event.previousIndex, event.currentIndex)
    const swapReplace = {...replaceColumn.prevColumn}
    swapReplace!.order = 999;
    delete(swapReplace!.id)
    const currReplace = {...replaceColumn.currColumn}
    currReplace!.order = event.previousIndex
    delete(currReplace!.id)

    if (replaceColumn.prevColumn?.id && swapReplace) {
      this.boardsService
        .updateColumnById(this.boardId, replaceColumn.prevColumn.id, <IColumn>swapReplace).subscribe(() => {
          if(replaceColumn.currColumn?.id && currReplace) {
            this.boardsService
              .updateColumnById(this.boardId, replaceColumn.currColumn.id, <IColumn>currReplace).subscribe(() => {
                if (replaceColumn.prevColumn?.id && replaceColumn.currColumn) {
                  this.boardsService.updateColumnById(this.boardId, replaceColumn.prevColumn.id, replaceColumn.currColumn).subscribe()
                }
            })
          }
      })
    }
  }
}
