import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IColumn } from 'src/app/boards/interfaces/IColumn.interface';
import { BoardsService } from 'src/app/boards/services/boards.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '../../../../shared/services/dialogs/dialog.service';
import { ConfirmationComponent } from '../../../../shared/components/confirmation/confirmation.component';
import { CreateNewTaskComponent } from '../../../../shared/components/create-new-task/create-new-task.component';
import { ITask } from '../../../interfaces/ITask.interface';
import { UserService } from '../../../../user/services/user.service';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnInit {
  @Input() public column!: IColumn;

  @Input() public color!: string;

  @Input() public boardId!: string;

  public inputShow = false;

  columnForm!: FormGroup;

  tasks!: any;

  currentUserId!: string | undefined;

  constructor(
    public boardsService: BoardsService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private userService: UserService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.columnForm = this.fb.group({
      title: [this.column.title, [Validators.required]],
    });
    this.userService.currentUserId().subscribe((userId) => this.currentUserId = userId);
    this.boardsService.getAllTasks(this.boardId, <string> this.column.id).subscribe((el) => this.tasks = el);
  }

  changeTitleMenu() {
    this.inputShow = !this.inputShow;
  }

  confirmChangeTitle() {
    if (!this.boardId || !this.column.id || this.columnForm.invalid) {
      return;
    }

    const updateColumn = {
      title: this.columnForm.controls['title'].value,
      order: this.column.order,
    };
    this.boardsService.updateColumnById(this.boardId, this.column.id, updateColumn)
      .subscribe(() => {
        this.boardsService
          .updateColumns(this.boardId);
        this.inputShow = false;
      });
  }

  cancelChangeTitle() {
    this.inputShow = false;
  }

  removeColumn() {
    this.dialogService.open(ConfirmationComponent, { data: `${this.translate.instant('CONFIRMATION.DELETE_COLUMN')} "${this.column.title}" ?` })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.boardsService
            .deleteColumnById(this.boardId, <string> this.column.id)
            .subscribe(() => this.boardsService
              .updateColumns(this.boardId));
        }
      });
  }

  createTask() {
    this.dialogService.open(CreateNewTaskComponent)
      .afterClosed()
      .subscribe((result) => {
        const newTask: ITask = {
          title: result.title,
          done: false,
          description: result.description,
          order: this.boardsService.calculateTaskOrder(),
          userId: <string> this.currentUserId,
        };
        this.boardsService.createTask(this.boardId, <string> this.column.id, newTask)
          .subscribe(() => this.boardsService.getAllTasks(this.boardId, <string> this.column.id)
            .subscribe((el) => this.tasks = el));
      });
  }
}
