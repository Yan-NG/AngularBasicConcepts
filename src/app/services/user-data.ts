import { Injectable, inject } from '@angular/core';
import { ToDo, User, UserTodo } from '../models/user';
import { catchError, forkJoin, map, mergeMap, Observable, of, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserData {

//Options (in the Service)
//Catch the error and rethrow : Should return a valid Observable and Catch the error again in the component

//Catch the error and continue : Must return a valid Observable of the appropriate type. Is more difficult to get an error message to the UI

  private readonly usersUrl:string = 'https://jsonplaceholder.typicode.com/users';
  private readonly todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  private readonly http = inject(HttpClient);

  //Catch the error and rethrow
  getUserByID(id:number):Observable<User>{
    return this.http.get<User>(this.usersUrl + `/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl)
  }

//Catch Error and Continue
  getUsersWithTodo():Observable<UserTodo[]>{
   return this.http.get<User[]>(this.usersUrl).pipe(
        mergeMap((users: User[]) =>
        forkJoin(
          users.map((user: User) =>
            this.http.get<ToDo[]>(this.todosUrl).pipe(
              map((todos:ToDo[]) => ({ user, todos } as UserTodo)),
              retry(3), // we can also use retry to indicate if we want to try again to get this if it error, it takes the number of tries as parameter.
              catchError(err => of(({ user, todos: [], message:`Could not get Todos for : ${user.name}` }as UserTodo)))
            )
          )
        )
      ),
      //we catch the error trying to fetch get users
      catchError(this.handleError)
    );

  }

  // addUser(user:User){

  // }
  // removeUser(id:number){

  // }

  //Create custom error handler
  //Observable of never emits no item to the observer and never completes
  private handleError(err:HttpErrorResponse):Observable<never>{
    let errorMessage = `**An Error occurred. Status: ${err.status} Messages: ${err.message}**`
    console.error(err);
    return throwError(()=>errorMessage )
  }

}
