import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';
import { catchError, map } from "rxjs/operators";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL + '/todos').pipe(
      catchError(this.handleError<Todo[]>('getAllTodos', []))
    );
  }

  public createTodo(todo: Todo) {

  }

  public getTodoById(todoId: number) {

  }

  public updateTodo(todo: Todo) {

  }

  public deleteTodoById(todoId: number) {

  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
