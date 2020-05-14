import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToDoListCollection } from './to-do-list-collection.model';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedComponent } from '../shared/shared.component';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ToDoListCollectionService {

  CloseOpen = new Subject<boolean>();
  close = new Subject<boolean>();
  

  constructor(private router: Router, private fireStoreDB: AngularFirestore, private afAuth: AngularFireAuth, private sharedRandom: SharedComponent) {this.afAuth.user.subscribe(userData => {this.CurrentUserUid = userData.uid})}


  CurrentUserUid: string;
  //firebaseUser = this.afAuth.user.subscribe(userData => {this.CurrentUserUid = userData.uid})
  toDoListCollection: ToDoListCollection[] = [];
  collectionChangeSubject: Subject<ToDoListCollection[]>;

 

  getCollectionToDoList(index: number){
    this.router.navigate(['/todo']);
  }

  getCollections(){
  return this.fireStoreDB.collection<ToDoListCollection>('Collections', ref => ref.where('userUid', '==', `${this.CurrentUserUid}`)).valueChanges()
//this only runs when values change maybe
  }


  creationWindow(openClose: boolean){
    this.CloseOpen.next(openClose);
  }

  closeCollectionCreation(){

  }

  addCollection(CollectionName: string){
    
    const toDoListsUid = ['toDoListUIDTest1', 'toDoListUIDTest2', 'toDoListUIDTest3']
    const collectionUid = this.sharedRandom.makeid();
    const selected = false;
    const collectionObj = new ToDoListCollection(CollectionName, toDoListsUid, this.CurrentUserUid, collectionUid, selected)

    this.fireStoreDB.collection('Collections').doc(collectionObj.collectionUid).set({
      collectionName: collectionObj.collectionName,
      userUid: collectionObj.userUid,
      todoListsUid: collectionObj.toDoListUid,
      selected: false
      
    }).then(x => {console.log('Collection Upload Successful')}).catch(x => {console.log('error', x.message)})



  }

  deleteCollections(){
    //subscribe to array. If selected, delete on firestore. 
  }

  editCollections(){

  }


}
