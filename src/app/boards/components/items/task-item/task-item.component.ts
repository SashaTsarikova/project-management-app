import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/boards/interfaces/ITask.interface';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() public task!: ITask;

  @Input() public boardId!: string;

  @Input() public columnId!: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}

