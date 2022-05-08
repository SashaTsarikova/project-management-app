import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IColumn } from 'src/app/boards/interfaces/IColumn.interface';
import { BoardsService } from 'src/app/boards/services/boards.service';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnInit {
  @Input() public column!: IColumn;

  @Input() public color!: string;

  @Input() public boardId!: string;

  public inputShow: boolean = false;

  public tasks$!: Observable<any>;

  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.tasks$ = this.boardsService.getAllTasks(
      this.boardId,
      <string> this.column.id,
    );
  }

  changeTitle() {
    if (this.inputShow) {
      this.inputShow = false;
    } else {
      this.inputShow = true;
    }
  }
}
