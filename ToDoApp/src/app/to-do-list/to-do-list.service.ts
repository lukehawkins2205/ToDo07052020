import { Injectable, OnInit } from '@angular/core';
import { ToDo } from './to-do-list-item.model'
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap, map } from 'rxjs/operators';
import { SharedComponent } from '../shared/shared.component';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  closeOpenCreation = new Subject<boolean>();
  closeOpenEdit = new Subject<boolean>();

  userUid: string;

  toDoArray: ToDo[] = [];

  todoArrayNext = new Subject<ToDo[]>();

  collectionUid: string;
  collectionName: string;


  constructor(private fireStoreDB: AngularFirestore, private afAuth: AngularFireAuth, private sharedRandom: SharedComponent) {

   }


  index: number;
  indexOfCollection(i){
    this.index = i
  }


  editWindow(openClose: boolean){
    this.closeOpenEdit.next(openClose);
  }

  creationWindow(openClose: boolean){
    this.closeOpenCreation.next(openClose);
    
  }




  

getToDo(){
 return this.fireStoreDB.collection<ToDo>('ToDo', ref => ref.where('toDoCollectionUid', '==', `${this.collectionUid}`)).valueChanges()
 .pipe(map((resArray) =>{
   return resArray.map(toDo =>{
    var todayDate = new Date();
        if(toDo.toDoCompleteBy < todayDate){
          toDo.toDoOverdue = true;} })
        })),
    tap<ToDo[]>((res)=>{this.toDoArray = res;})
 
  }



  
  /*tap(toDoArrayResponse =>{
   this.toDoArray = toDoArrayResponse
  console.log('Recieved toDoarray', this.toDoArray)}
    ))
  }*/

  /*overDueCheck(toDoArray: ToDo[]){
    var todayDate = new Date();
    var index = 0;
      toDoArray .forEach(toDo => {
        if(toDo.toDoCompleteBy < todayDate){
          toDo.toDoOverdue = true;
          console.log('todo is overdue', toDoArray[index].toDoName);
        }
        })
      this.todoArrayNext.next(toDoArray);
     
  }*/



  addToDo(toDo: string, dueDate: Date){

    const toDoUid = this.sharedRandom.makeid();
    const toDoCollectionUid = this.collectionUid;
    const toDoName = toDo;
    const toDoCompleted = false;
    const toDoCompleteBy = dueDate;
    const toDoCreated =  new Date();
    const toDoOverdue = false;

    const toDoObj = new ToDo(toDoUid, toDoCollectionUid, toDoName, toDoCompleted, toDoCompleteBy, toDoCreated, toDoOverdue);

    this.fireStoreDB.collection('ToDo').doc(`${toDoObj.toDoUid}`).set({
      toDoUid: toDoObj.toDoUid,
      toDoCollectionUid: toDoObj.toDoCollectionUid,
      toDoName: toDoObj.toDoName,
      toDoCompleted: false,
      toDoCompleteBy: toDoObj.toDoCompleteBy,
      toDoCreated: toDoObj.toDoCreated,
      toDoOverdue: false
      
    }).then(() => {}).catch(x => {console.log('error', x.message)})
  }



  Completed(completed: boolean){

    completed = !completed

    this.fireStoreDB.collection('ToDo').doc(`${this.toDoArray[this.index].toDoUid}`).update({
      'toDoCompleted': completed
    }).then(()=>{}).catch(error => console.log(error.message)); 
  }



  editToDo(newtoDoName: string){
    this.fireStoreDB.collection('ToDo').doc(`${this.toDoArray[this.index].toDoUid}`).update({
      'toDoName': newtoDoName
    }).then(()=>{}).catch(error => console.log(error.message)); 
  }



  deleteToDo(index){
    console.log('You Have Deleted: ',this.toDoArray[index].toDoName);
    this.fireStoreDB.collection('ToDo').doc(`${this.toDoArray[index].toDoUid}`).delete()
      .then(()=>{}).catch(error => console.log(error.message)); 
  }



  




}
