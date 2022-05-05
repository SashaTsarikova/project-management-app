import {ITask} from "./ITask.interface";

export interface IColumn {
  id?: string;
  title: string;
  order: number;
  tasks?: ITask[];
}
