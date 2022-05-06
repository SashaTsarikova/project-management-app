import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IColumn } from 'src/app/boards/interfaces/IColumn.interface';
import { BoardsService } from 'src/app/boards/services/boards.service';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnInit, AfterViewInit {
  @Input() public column!: IColumn;

  @Input() public color!: string;

  @Input() public boardId!: string;

  @ViewChild('columnItem') columnItem!: ElementRef;

  @ViewChild('titleItem') titleItem!: ElementRef;

  public inputShow: boolean = false;

  public tasks$!: Observable<any>;

  constructor(
    private boardsService: BoardsService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.boardsService.getAllTasks(
      this.boardId,
      <string>this.column.id
    );
  }

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.columnItem.nativeElement,
      'border-color',
      this.color
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
