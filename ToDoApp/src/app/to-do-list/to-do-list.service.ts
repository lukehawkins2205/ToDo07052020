import { Injectable, OnInit } from '@angular/core';
import { ToDoListItem } from './to-do-list-item.model'
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  ToDoItemArray: ToDoListItem[] = [{ToDo: 'Pick up Milk', ticked: false}, {ToDo: 'Clean the Kitchen', ticked: false}, {ToDo: 'Send Money to mexican cartel', ticked: false}]
  Delete: boolean = false;
  ToDoArrayChanged = new Subject;
  subscription: Subscription;
  tickedToDoItems: ToDoListItem[] = [];
  

  constructor(private FireStoreDB: AngularFirestore, private afAuth: AngularFireAuth) { }

  PushListToDB(){
  //this.http.put('https://todoapp-a9bad.firebaseio.com/ToDo.json', this.ToDoItemArray).subscribe(() => {});
 }

  getToDoArray(){
    return this.ToDoItemArray.slice()
  }



  UpdateToDoArray(Array: ToDoListItem[]){
      this.ToDoItemArray = Array;
      console.log(Array)
     // this.http.put('https://todoapp-a9bad.firebaseio.com/ToDo.json', this.ToDoItemArray).subscribe(() => {});
  }


  AddToDoItem(ToDoText: string){
    this.ToDoItemArray.push({ToDo: ToDoText, ticked: false});
  //  this.http.put('https://todoapp-a9bad.firebaseio.com/ToDo.json', this.ToDoItemArray).subscribe(() => {})
    this.ToDoArrayChanged.next(this.ToDoItemArray);
  }

  DeleteSelected(){

    let index = 0;

    while (index < this.ToDoItemArray.length){
      if (this.ToDoItemArray[index].ticked === true){
        this.ToDoItemArray.splice(index,1);
      }else{
        index++
      }
    }

  //  this.http.put('https://todoapp-a9bad.firebaseio.com/ToDo.json', this.ToDoItemArray).subscribe(() => {})
  }


}
