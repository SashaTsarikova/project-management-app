import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IColumn } from '../../interfaces/IColumn.interface';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-one-board',
  templateUrl: './one-board.component.html',
  styleUrls: ['./one-board.component.scss'],
})
export class OneBoardComponent implements OnInit {
  boardId: string = this.route.snapshot.params['id'];

  color: string = '#47c383';

  public board$!: Observable<any>;

  public columns$!:Observable<IColumn[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
  ) {
    if ((this.router.getCurrentNavigation()?.extras as any).state) {
      if ((this.router.getCurrentNavigation()?.extras as any).state.color) {
        this.color = (
          this.router.getCurrentNavigation()?.extras as any
        ).state.color;
      }
    }
  }

  ngOnInit(): void {
    this.board$ = this.boardsService.getBoardById(this.boardId);
    this.columns$ = this.boardsService.getAllColumns(this.boardId);
  }

  goToBoards() {
    this.router.navigate(['boards']);
  }
}
