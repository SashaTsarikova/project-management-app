import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorHandlerService} from "../../shared/services/errorhandler.service";
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

  private allColumnsSubject: BehaviorSubject<IColumn[]> = new BehaviorSubject<IColumn[]>([])
  allColumns$: Observable<IColumn[]> = this.allColumnsSubject.asObservable()

  private allTasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([])
  allTasks$: Observable<ITask[]> = this.allTasksSubject.asObservable()

  constructor(
    private http: HttpClient,
    private err: ErrorHandlerService
    ) { }

  //Boards
  updateBoards() {
    this.getAllBoards().subscribe(res => this.allBoardsSubject.next(res))
  }

  getAllBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${PATH}/boards`);
  }

  createBoard(createBoard: IBoard) {
    return this.http.post(`${PATH}/boards`, createBoard)
  }

  getBoardById(boardId: string) {
    return this.http.get(`${PATH}/boards/${boardId}`)
  }

  deleteBoardById(boardId: string) {
    return this.http.delete(`${PATH}/boards/${boardId}`)
  }

  updateBoardById(boardId: string, updateBoard: IBoard) {
    return this.http.put(`${PATH}/boards/${boardId}`, updateBoard)
  }

  //Columns
  updateColumns(boardId: string) {
    this.getAllColumns(boardId).subscribe(res => this.allColumnsSubject.next(res))
  }

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
    if(!this.allColumnsSubject.value.length) {
      return 0
    }
    let order = this.allColumnsSubject.value.reduce((acc, curr) => acc.order > curr.order ? acc : curr)
    let count = order.order
    count += 1;
    return count;
  }

  //Tasks
  updateTasks(boardId: string, columnId: string) {
    this.getAllTasks(boardId, columnId).subscribe(res => {
      this.allColumnsSubject.next(res)
    })
  }

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

  calculateTaskOrder() {
    if(!this.allTasksSubject.value.length) {
      return 0
    }
    let order = this.allTasksSubject.value.reduce((acc, curr) => acc.order > curr.order ? acc : curr)
    let count = order.order
    count += 1;
    return count;
  }

  findColumns(prevPos: number, currPos: number) {
    return {
      prevColumn: this.allColumnsSubject.value.find(column => column.order === prevPos),
      currColumn: this.allColumnsSubject.value.find(column => column.order === currPos)
    }
  }
}
