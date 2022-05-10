import {IColumn} from "./IColumn.interface";

export interface IBoard {
  id?: string;
  title: string;
  description: string;
  columns?: IColumn[];
}
