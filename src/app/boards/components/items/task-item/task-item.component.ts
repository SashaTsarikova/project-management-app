import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/boards/interfaces/ITask.interface';
import {DialogService} from "../../../../shared/services/dialogs/dialog.service";
import {ConfirmationComponent} from "../../../../shared/components/confirmation/confirmation.component";
import {BoardsService} from "../../../services/boards.service";
import {filter, switchMap} from "rxjs";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() public task!: ITask;

  @Input() public boardId!: string;

  @Input() public columnId!: string | undefined;

  constructor(
    private dialogService: DialogService,
    private boardService: BoardsService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {}

  removeTask() {
    this.dialogService.open(ConfirmationComponent, { data: `${this.translate.instant('CONFIRMATION.DELETE_TASK')} "${this.task.title}" ?` })
      .afterClosed()
      .pipe(
          filter(result => result),
          switchMap(() => this.boardService.deleteTaskById(this.boardId, <string>this.columnId, <string>this.task.id))
        )
      .subscribe(() => this.boardService.updateCurrentBoard(this.boardId))
  }
}
