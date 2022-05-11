import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PATH} from "../../auth/models/base-path";
import {IColumn} from "../interfaces/IColumn.interface";
import {ITask} from "../interfaces/ITask.interface";
import {IBoard} from "../interfaces/IBoard.interface";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private allBoardsSubject: BehaviorSubject<IBoard[]> = new BehaviorSubject<IBoard[]>([])
  allBoards$: Observable<IBoard[]> = this.allBoardsSubject.asObservable()

  private boardByIdSubject: BehaviorSubject<IBoard> = new BehaviorSubject<IBoard>(<IBoard>{});
  boardById$: Observable<IBoard> = this.boardByIdSubject.asObservable()

  constructor(
    private http: HttpClient,
    ) { }

  //Boards
  updateBoards() {
    this.getAllBoards().subscribe(res => this.allBoardsSubject.next(res))
  }

  updateCurrentBoard(boardId: string) {
    this.getBoardById(boardId).subscribe(res => this.boardByIdSubject.next(res))
  }

  getAllBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${PATH}/boards`);
  }

  createBoard(createBoard: IBoard) {
    return this.http.post(`${PATH}/boards`, createBoard)
  }

  getBoardById(boardId: string): Observable<IBoard> {
    return this.http.get<IBoard>(`${PATH}/boards/${boardId}`)
  }

  deleteBoardById(boardId: string) {
    return this.http.delete(`${PATH}/boards/${boardId}`)
  }

  updateBoardById(boardId: string, updateBoard: IBoard) {
    return this.http.put(`${PATH}/boards/${boardId}`, updateBoard)
  }

  //Columns

  getAllColumns(boardId: string): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`${PATH}/boards/${boardId}/columns`)
  }

  createColumn(boardId: string, createColumn: IColumn) {
    return this.http.post(`${PATH}/boards/${boardId}/columns`, createColumn)
  }

  getColumnById(boardId: string, columnId: string) {
    return this.http.get(`${PATH}/boards/${boardId}/columns/${columnId}`)
  }

  deleteColumnById(boardId: string, columnId: string) {
    return this.http.delete(`${PATH}/boards/${boardId}/columns/${columnId}`)
  }

  updateColumnById(boardId: string, columnId: string, updateColumn: IColumn) {
    return this.http.put(`${PATH}/boards/${boardId}/columns/${columnId}`, updateColumn)
  }

  calculateColumnOrder() {
    if(!this.boardByIdSubject.value.columns?.length) {
      return 0
    }
    let order = this.boardByIdSubject.value.columns.reduce((acc, curr) => acc.order > curr.order ? acc : curr)
    let count = order.order
    count += 1;
    return count;
  }

  //Tasks

  getAllTasks(boardId: string, columnId: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${PATH}/boards/${boardId}/columns/${columnId}/tasks`)
  }

  createTask(boardId: string, columnId: string, createTask: ITask) {
    return this.http.post(`${PATH}/boards/${boardId}/columns/${columnId}/tasks`, createTask)
  }

  getTaskById(boardId: string, columnId: string, taskId: string) {
    return this.http.get(`${PATH}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
  }

  deleteTaskById(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(`${PATH}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
  }

  updateTaskById(boardId: string, columnId: string, taskId: string, updateTask: ITask) {
    return this.http.put(`${PATH}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, updateTask)
  }

  calculateTaskOrder(columnId: string): number {
    const currColumn = this.boardByIdSubject.value.columns?.find(column => columnId === column.id)
    if(!currColumn?.tasks?.length) {
      return 0
    }
    let order = currColumn.tasks.reduce((acc, curr) => acc.order > curr.order ? acc : curr)
    let count = order.order
    count += 1;
    return count;
  }
}
