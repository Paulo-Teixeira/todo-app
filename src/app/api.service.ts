import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public signIn(username: string, password: string) {
    return this.http.post(API_URL + '/sign-in', {
      username,
      password
    }).pipe(
      catchError(this.handleError('signIn', []))
    );
  }

  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL + '/todos').pipe(
      catchError(this.handleError<Todo[]>('getAllTodos', []))
    );
  }

  public createTodo(todo: Todo): Observable<Todo[]> {
    return this.http.post<Todo[]>(API_URL + '/todos', todo).pipe(
      catchError(this.handleError<Todo[]>('createTodo', []))
    );
  }

  public getTodoById(todoId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_URL + '/todos/' + todoId).pipe(
      catchError(this.handleError<Todo[]>('getTodoById', []))
    );
  }

  public updateTodo(todo: Todo): Observable<Todo[]> {
    return this.http.put<Todo[]>(API_URL + '/todos/' + todo.id, todo).pipe(
      catchError(this.handleError<Todo[]>('updateTodo', []))
    );
  }

  public deleteTodoById(todoId: number): Observable<null> {
    return this.http.delete<null>(API_URL + '/todos/' + todoId).pipe(
      catchError(this.handleError<null>('deleteTodoById'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
