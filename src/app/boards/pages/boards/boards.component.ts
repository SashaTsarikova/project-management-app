import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BoardsService } from '../../services/boards.service';
import { LoaderService } from "../../../shared/services/loader.service";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boardForm!: FormGroup;

  constructor(
    public boardsService: BoardsService,
    public loaderService: LoaderService,
    ) {}

  ngOnInit(): void {
    this.loaderService.isLoadingOn();
    this.boardsService.updateBoards();
  }
}
