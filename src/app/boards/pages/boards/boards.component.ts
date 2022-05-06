import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IBoard } from '../../interfaces/IBoard.interface';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boardForm!: FormGroup;

  boards$!: Observable<IBoard[]>;

  constructor(private boardsService: BoardsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.boardForm = this.fb.group({
    //   title: ['', Validators.required],
    // });
    this.boards$ = this.boardsService.getAllBoards();
  }

  // onSubmit() {
  //   this.boardsService
  //     .createBoard(this.boardForm.value)
  //     .subscribe((board) => console.log(board));
  // }

  // onColumnSubmit() {}
}
