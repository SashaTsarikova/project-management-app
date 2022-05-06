import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IBoard } from 'src/app/boards/interfaces/IBoard.interface';
import getRandomColor from 'src/app/boards/utils/colorGenerator';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit, AfterViewInit {
  @Input() public board!: IBoard;

  @ViewChild('boardItem') boardItem!: ElementRef;

  private color!: string;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.color = getRandomColor();
    this.renderer.setStyle(
      this.boardItem.nativeElement,
      'background-color',
      this.color,
    );
  }

  goToOneBoard() {
    this.router.navigate(['boards', this.board.id], { fragment: this.color });
  }

  deleteBoard() { }
}
