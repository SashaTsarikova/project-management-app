import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBoard } from 'src/app/boards/interfaces/IBoard.interface';
import getRandomColor from 'src/app/boards/utils/colorGenerator';
import { ConfirmationComponent } from '../../../../shared/components/confirmation/confirmation.component';
import { DialogService } from '../../../../shared/services/dialogs/dialog.service';
import { BoardsService } from '../../../services/boards.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() public board!: IBoard;

  public bgColor: string = '';

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.bgColor = getRandomColor();
  }

  goToOneBoard() {
    this.router.navigate(['boards', this.board.id], {
      state: {
        color: this.bgColor,
      },
    });
  }

  deleteBoard() {
    const dialogRef = this.dialogService.open(ConfirmationComponent, {
      data: `delete board ${this.board.title}`,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.board.id) {
        this.boardsService
          .deleteBoardById(this.board.id)
          .subscribe(() => this.boardsService.updateBoards());
      }
    });
  }
}
