import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../models/todo.interface';
import { ResponseAPI } from '../../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private todo_api = `https://dummyjson.com/todos`;

  constructor(private http: HttpClient) { }

  fetchTodos() {
    return this.http.get<ResponseAPI>(this.todo_api);
  }
}