import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToDoListCollectionService {


  //array

  constructor(private router: Router) { }

  getCollectionToDoList(index: number){

    this.router.navigate(['/todo']);
  }


  //initial login (sign up?), create fake collecion or bring up creation-header

  //onClickCollection {get request collection.uid === firebase.files.collection.uid, then attach to array }



}
