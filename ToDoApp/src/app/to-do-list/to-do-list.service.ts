import { Injectable, OnInit } from '@angular/core';
import { ToDo } from './to-do-list-item.model'
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription, of, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap, map } from 'rxjs/operators';
import { SharedComponent } from '../shared/shared.component';
import { firestore } from 'firebase';
import * as firebase from 'firebase';
import { ToDoListCollection } from '../to-do-list-collection/to-do-list-collection.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  closeOpenCreation = new Subject<boolean>();
  closeOpenEdit = new Subject<boolean>();

  userUid: string;

  toDoArray: ToDo[] = [];
  completedToDoArray: ToDo[] = [];

  todoArrayNext = new Subject<ToDo[]>();
  todoSort = new Subject<string>();
  completedToDoArrayNext = new Subject<ToDo[]>();

  collectionUid: string;
  collectionName: string;
  collectionToDo: ToDoListCollection
  collectionToDoUidArray: string[] = []


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
 .pipe(
   tap(toDoArrayRes => {
     //this.dateAndOverDueConversion(res);
     this.toDoArray = toDoArrayRes;
     this.toDoConversionHandler(this.toDoArray)
     console.log('TAP SERVICE ARRAY', this.toDoArray)
    }))
  }

  getToDoCompleted(){
    return this.fireStoreDB.collection<ToDo>('ToDoCompleted', ref => ref.where('toDoCollectionUid', '==', `${this.collectionUid}`)).valueChanges()
    .pipe(
      tap(toDoArrayRes => {
        //this.dateAndOverDueConversion(res);
        this.completedToDoArray = toDoArrayRes;
        this.toDoConversionHandler(this.completedToDoArray)
        console.log('TAP SERVICE Completed ARRAY', this.completedToDoArray)
       }))
     }

  addToDo(toDo: string, dueDate: Date){

    let toDoUid = this.sharedRandom.makeid();
    let toDoCollectionUid = this.collectionUid;
    let toDoName = toDo;
    let toDoCompleted = false;
    let toDoCompleteBy = dueDate;
    let toDoCreated =  new Date();
    let toDoOverdue = false;

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


    this.collectionToDo.toDoListUid.push(toDoUid);

   this.fireStoreDB.collection('Collections').doc(`${this.collectionUid}`).update({
      todoListsUid: this.collectionToDo.toDoListUid
    }).then(()=>{}).catch(error => console.log(error.message)); 
  }



  Completed(index){

    this.toDoArray[index].toDoCompleted = true;
    
    if(this.toDoArray[index].toDoCompleted === true){
      this.fireStoreDB.collection('ToDoCompleted').doc(`${this.toDoArray[index].toDoUid}`).set({
        toDoUid: this.toDoArray[index].toDoUid,
        toDoCollectionUid: this.toDoArray[index].toDoCollectionUid,
        toDoName: this.toDoArray[index].toDoName,
        toDoCompleted: true,
        toDoCompleteBy: this.toDoArray[index].toDoCompleteBy,
        toDoCreated: this.toDoArray[index].toDoCreated,
        toDoOverdue: this.toDoArray[index].toDoOverdue
        }).then(() => {console.log('added to completed collection')}).catch(x => {console.log('error1', x.message)})
  
        this.fireStoreDB.collection('ToDo').doc(`${this.toDoArray[index].toDoUid}`).delete()
        .then(()=>{console.log('deleted from main collection')}).catch(error => console.log('error2',error.message)); 
    }
  }

  unCompleted(index){
   
      this.fireStoreDB.collection('ToDo').doc(`${this.completedToDoArray[index].toDoUid}`).set({
        toDoUid: this.completedToDoArray[index].toDoUid,
        toDoCollectionUid: this.completedToDoArray[index].toDoCollectionUid,
        toDoName: this.completedToDoArray[index].toDoName,
        toDoCompleted: false,
        toDoCompleteBy: this.completedToDoArray[index].toDoCompleteBy,
        toDoCreated: this.completedToDoArray[index].toDoCreated,
        toDoOverdue: this.completedToDoArray[index].toDoOverdue
        }).then(() => {console.log('added to main collection')}).catch(x => {console.log('error1', x.message)})
  
        this.fireStoreDB.collection('ToDoCompleted').doc(`${this.completedToDoArray[index].toDoUid}`).delete()
        .then(()=>{console.log('deleted from completed collection')}).catch(error => console.log('error2',error.message)); 
  
  }



  editToDo(toDo: string, dueDate: Date){

    if(dueDate === null){
      dueDate = this.toDoArray[this.index].toDoCompleteBy;
    }

    if(toDo === null){
      toDo = this.toDoArray[this.index].toDoName;
    }

    this.fireStoreDB.collection('ToDo').doc(`${this.toDoArray[this.index].toDoUid}`).update({
      'toDoName': toDo,
      'toDoCompleteBy': dueDate
    }).then(()=>{}).catch(error => console.log(error.message)); 
  }



  deleteToDo(index){

   /*   var uidIndex = this.collectionToDoUidArray.indexOf(this.toDoArray[index].toDoUid)

      this.collectionToDoUidArray.splice(uidIndex, 1)

      this.fireStoreDB.collection('Collections').doc(`${this.collectionUid}`).update({
        todoListsUid: this.collectionToDoUidArray
      }).then(()=>{}).catch(error => console.log(error.message)); */

    console.log('You Have Deleted: ',this.toDoArray[index].toDoName);

    this.fireStoreDB.collection('ToDo').doc(`${this.toDoArray[index].toDoUid}`).delete()
      .then(()=>{}).catch(error => console.log(error.message)); 

  }




  deleteCompletedToDo(index){

  /*  var uidIndex = this.collectionToDoUidArray.indexOf(this.completedToDoArray[index].toDoUid)

      this.collectionToDoUidArray.splice(uidIndex, 1)

      this.fireStoreDB.collection('Collections').doc(`${this.collectionUid}`).update({
        todoListsUid: this.collectionToDoUidArray
      }).then(()=>{}).catch(error => console.log(error.message)); 
*/

    console.log('You Have Deleted: ',this.completedToDoArray[index].toDoName);
    this.fireStoreDB.collection('ToDoCompleted').doc(`${this.completedToDoArray[index].toDoUid}`).delete()
      .then(()=>{}).catch(error => console.log(error.message)); 

  }




  toDoConversionHandler(toDoArray: ToDo[]){
    toDoArray.forEach(toDo => {
      var completeBy = toDo.toDoCompleteBy.toDate();
      var todayDate = new Date()

      if(completeBy <= todayDate)
      {
        toDo.toDoOverdue = true;

      }else{
        toDo.toDoOverdue = false;
      }
      toDo.toDoCompleteBy = completeBy;
      
      var timedif = toDo.toDoCompleteBy.getTime() - todayDate.getTime()
      var daydif = timedif / (1000 * 3600 * 24);
      var myTrunc = Math.trunc( daydif );
      toDo.daysRemaining = myTrunc 
    })
  }
  

 

  sort(option: string){
    switch (option){
      case 'CreatedDate': 
        this.toDoArray.sort((todo1, todo2) => {
          return todo1.toDoCreated - todo2.toDoCreated});
        this.todoArrayNext.next(this.toDoArray);  
        break;

      case 'DueDate':
        this.toDoArray.sort((todo1, todo2) => {
          return todo1.toDoCompleteBy - todo2.toDoCompleteBy});
        this.todoArrayNext.next(this.toDoArray);
        break;

      case 'OverdueStatus':
        this.toDoArray.sort((todo1, todo2) => {
        if (todo1.toDoOverdue === true)
          {return -1;} 
        if (todo2.toDoOverdue === false)
          {return 1;} 
          return 0;});
          this.todoArrayNext.next(this.toDoArray);
          break;

      default: 
          this.todoArrayNext.next(this.toDoArray);

    }
  }
  




}
