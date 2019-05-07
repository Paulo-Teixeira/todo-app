import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionService } from '../app/session.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private session: SessionService
    ) { }

  public signIn(username: string, password: string) {
    return this.http
      .post(API_URL + '/sign-in', {
        username,
        password
      })
      .pipe(catchError(this.handleError('signIn', []))
    );
  }

  public getAllTodos(): Observable<Todo[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<Todo[]>(API_URL + '/todos', options)
      .pipe(
        map(response => {
          const todos = <any[]> response;
          return todos.map((todo) => new Todo(todo));
        })
      )
      .pipe(
        catchError(this.handleError<Todo[]>('getAllTodos', []))
      );
  }

  public createTodo(todo: Todo): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http
      .post<Todo>(API_URL + '/todos', todo, options)
      .pipe(
        map(response => {
          return new Todo(response);
        })
      )
      .pipe(
        catchError(this.handleError<Todo>('createTodo'))
    );
  }

  public getTodoById(todoId: number): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http
      .get<Todo>(API_URL + '/todos/' + todoId, options)
      .pipe(
        map(response => {
          return new Todo(response);
        })
      )
      .pipe(
        catchError(this.handleError<Todo>('getTodoById'))
    );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    const options = this.getRequestOptions();
    return this.http
      .put<Todo>(API_URL + '/todos/' + todo.id, todo, options)
      .pipe(
        map(response => {
          return new Todo(response);
        })
      )
      .pipe(
        catchError(this.handleError<Todo>('updateTodo'))
    );
  }

  public deleteTodoById(todoId: number): Observable<null> {
    const options = this.getRequestOptions();
    return this.http
      .delete<null>(API_URL + '/todos/' + todoId, options)
      .pipe(
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

  // private handleError(error: HttpErrorResponse | any) {
  //   console.error('ApiService::handleError', error);
  //   return Observable.throw(error);
  // }

  private getRequestOptions() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.session.accessToken
    });
    return { headers };
  }
}
