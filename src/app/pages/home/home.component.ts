import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from '../../services/fetch-todos.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ToDoList } from '../../../models/todo.interface';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../../../models/response.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, MatIcon,CommonModule,MatProgressSpinner],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'id',
    'title',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<ToDoList>([]); // Initialize with an empty array
  selection = new SelectionModel<ToDoList>(true, []);
  isLoading:boolean=false;
  todos:ToDoList[]=[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.apiService.fetchTodos().subscribe(
      (res: ResponseAPI) => {
        this.todos = res.todos;
        this.dataSource.data = this.todos;
        console.log(res.todos); 
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ToDoList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
