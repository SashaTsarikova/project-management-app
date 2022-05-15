import {
  Component,
  Input,
  OnInit, Output, EventEmitter
} from '@angular/core';
import { IColumn } from 'src/app/boards/interfaces/IColumn.interface';
import { BoardsService } from 'src/app/boards/services/boards.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "../../../../shared/services/dialogs/dialog.service";
import {ConfirmationComponent} from "../../../../shared/components/confirmation/confirmation.component";
import {CreateNewTaskComponent} from "../../../../shared/components/create-new-task/create-new-task.component";
import {ITask} from "../../../interfaces/ITask.interface";
import {UserService} from "../../../../user/services/user.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {filter, switchMap} from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import {LoaderService} from "../../../../shared/services/loader.service";

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnInit {
  @Input() public columnData!: any;

  @Input() public column!: IColumn;

  @Input() public color!: string;

  @Input() public boardId!: string;

  @Input() public searchString?: any;

  @Output() public dropTaskEvent = new EventEmitter<
    CdkDragDrop<ITask[] | undefined, ITask[]>>();

  public inputShow = false;

  columnForm!: FormGroup;

  currentUserId!: string | undefined;

  constructor(
    public boardsService: BoardsService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private userService: UserService,
    public translate: TranslateService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.columnForm = this.fb.group({
      title: [this.column.title, [Validators.required]]
    })
    this.userService.currentUserId().subscribe((userId) => this.currentUserId = userId);
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
        this.boardsService.updateCurrentBoard(this.boardId)
        this.inputShow = false;
      });
  }

  cancelChangeTitle() {
    this.inputShow = false;
  }

  removeColumn() {
    this.dialogService.open(ConfirmationComponent, { data: `${this.translate.instant('CONFIRMATION.DELETE_COLUMN')} "${this.column.title}" ?` })
      .afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.boardsService.deleteColumnById(this.boardId, <string>this.column.id)))
      .subscribe(() => this.boardsService.updateCurrentBoard(this.boardId))
  }

  createTask() {
    this.dialogService.open(CreateNewTaskComponent)
      .afterClosed()
        .pipe(
          filter((result) => result),
          switchMap(result => {
            const newTask: ITask = {
              title: result.title,
              done: false,
              description: result.description,
              order: this.boardsService.calculateTaskOrder(<string>this.column.id),
              userId: <string>this.currentUserId
            }
            return this.boardsService.createTask(this.boardId, <string>this.column.id, newTask)
          })).subscribe(() => this.boardsService.updateCurrentBoard(this.boardId))
  }
  dropTask(event: CdkDragDrop<ITask[] | undefined, ITask[]>) {
    this.dropTaskEvent.emit(event);
  }
}
