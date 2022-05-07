import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boardForm!: FormGroup;

  constructor(
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boardsService.updateBoards();
  }

}
