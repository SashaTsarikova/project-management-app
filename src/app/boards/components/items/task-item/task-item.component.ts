import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/boards/interfaces/ITask.interface';
import { filter, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { EditTaskComponent } from 'src/app/shared/components/edit-task/edit-task.component';
import { DialogService } from '../../../../shared/services/dialogs/dialog.service';
import { ConfirmationComponent } from '../../../../shared/components/confirmation/confirmation.component';
import { BoardsService } from '../../../services/boards.service';
import { UserService } from '../../../../user/services/user.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() public task!: ITask;

  @Input() public boardId!: string;

  @Input() public columnId!: string | undefined;

  currentUserId!: string | undefined;

  constructor(
    private dialogService: DialogService,
    private boardService: BoardsService,
    public translate: TranslateService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.currentUserId().subscribe((userId) => this.currentUserId = userId);
  }

  removeTask() {
    this.dialogService.open(ConfirmationComponent, { data: `${this.translate.instant('CONFIRMATION.DELETE_TASK')} "${this.task.title}" ?` })
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() => this.boardService.deleteTaskById(this.boardId, <string> this.columnId, <string> this.task.id)),
      )
      .subscribe(() => this.boardService.updateCurrentBoard(this.boardId));
  }

  editTask() {
    this.dialogService.open(EditTaskComponent, { data: { dataTitle: `${this.task.title}`, dataDescription: `${this.task.description}` } })
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap((result) => {
          const editTask: ITask = {
            title: result.title,
            done: false,
            order: this.boardService.calculateTaskOrder(<string> this.columnId),
            description: result.description,
            userId: <string> this.currentUserId,
            boardId: <string> this.boardId,
            columnId: <string> this.columnId,
          };
          return this.boardService.updateTaskById(this.boardId, <string> this.columnId, <string> this.task.id, editTask);
        }),
      ).subscribe(() => this.boardService.updateCurrentBoard(this.boardId));
  }
}
