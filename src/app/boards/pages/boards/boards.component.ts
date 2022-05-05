import { Component, OnInit } from '@angular/core';
import {BoardsService} from "../../services/boards.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boardForm!: FormGroup;

  constructor(
    private boardsService: BoardsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.boardForm = this.fb.group({
      title: ['', Validators.required]
    })
    this.boardsService.getAllBoards().subscribe(v => console.log(v))
  }

  onSubmit() {
    this.boardsService.createBoard(this.boardForm.value).subscribe(board => console.log(board))
  }

  onColumnSubmit() {

  }
}
