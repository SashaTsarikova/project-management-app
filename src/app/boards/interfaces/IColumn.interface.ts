import {ITask} from "./ITask.interface";

export interface IColumn {
  id?: string;
  title: string;
  order: number;
  tasks?: ITask[];
}

export interface IOtherColumn extends IColumn {
  otherColumns: string[];
}
