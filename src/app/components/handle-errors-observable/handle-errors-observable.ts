import { Component, OnInit } from '@angular/core';
import { UserData } from '../../services/user-data';
import { User, UserTodo } from '../../models/user';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-handle-errors-observable',
  imports: [],
  templateUrl: './handle-errors-observable.html',
  styleUrl: './handle-errors-observable.scss',
})
export class HandleErrorsObservable implements OnInit{

  users:User[]=[];
  firstUser:User={
    id: 0,
    name: "",
    username: "",
    email: ""
  };
  usersTodos:UserTodo[] =[]
  errorMessage:string=''

  //Initialize the service
  constructor(private readonly userService:UserData){ }

  ngOnInit(){
    this.userService.getAllUsers().subscribe((users)=>{
      this.users = users;
    });

    this.userService.getUserByID(1).subscribe(
      {
        next:(user)=> this.firstUser=user,
        error:(err)=>this.errorMessage= err //We handle the error message coming from the observable
      })

      this.userService.getUsersWithTodo().subscribe({
        next:(usersTodo)=> this.usersTodos = usersTodo,
        error:(err)=>this.errorMessage= err
      })
  }



}
