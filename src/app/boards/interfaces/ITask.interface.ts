import {IFiles} from "./IFiles.interface";

export interface ITask {
  id?: string;
  title: string;
  order: number;
  done: boolean,
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
  files?: IFiles[];
}
