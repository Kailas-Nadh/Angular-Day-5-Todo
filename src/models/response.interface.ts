import { ToDoList } from "./todo.interface"

export interface ResponseAPI{
    todos:ToDoList[];
    total:number;
    skip:number;
    limit:number;
}