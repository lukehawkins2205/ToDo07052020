import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ToDoListCollection } from './to-do-list-collection.model';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedComponent } from '../shared/shared.component';
import { tap } from 'rxjs/operators';
import { ToDoListService } from '../to-do-list/to-do-list.service';




@Injectable({
  providedIn: 'root'
})




export class ToDoListCollectionService implements OnInit, OnDestroy  {

  closeOpenCreation = new Subject<boolean>();
  closeOpenEdit = new Subject<boolean>();

  getToDoList = new Subject<string>();  
  
  toDoListCollectionArray: ToDoListCollection[] = []; 
  selectedCollectionArray: ToDoListCollection[] = [];
  userUid: string;


  constructor(private router: Router, private fireStoreDB: AngularFirestore, private afAuth: AngularFireAuth, private sharedRandom: SharedComponent, private toDoService: ToDoListService) {
  
  }

  ngOnInit(){
    
  }
  

  collectionSelected(index: number){
    
    this.toDoListCollectionArray[index].selected = !this.toDoListCollectionArray[index].selected;

    if(this.toDoListCollectionArray[index].selected === true){
      this.selectedCollectionArray.push(this.toDoListCollectionArray[index]);
      console.log('ADDED to Deleted Array', this.selectedCollectionArray);}
      else{
        var collectionCheck = this.selectedCollectionArray.includes(this.toDoListCollectionArray[index])
        if(collectionCheck === true){
          var selectedCollectionIndex = this.selectedCollectionArray.indexOf(this.toDoListCollectionArray[index])
          this.selectedCollectionArray.splice(selectedCollectionIndex, 1)
          console.log('REMOVED from Deleted Array', this.selectedCollectionArray)
        }
      }
  }


  getCollectionToDoList(index: number){
  this.toDoService.collectionUid = this.toDoListCollectionArray[index].collectionUid;
  this.toDoService.collectionName = this.toDoListCollectionArray[index].collectionName;
   this.router.navigate(['/todo']);
  }

  getCollections(){

    var user = this.afAuth.currentUser;
    user.then(x => {this.userUid = x.uid}).catch(error => console.log(error.message));
    
  return this.fireStoreDB.collection<ToDoListCollection>('Collections', ref => ref.where('userUid', '==', `${this.userUid}`)).valueChanges()
  .pipe(tap(CollectionArrayReponse => {
    this.toDoListCollectionArray = CollectionArrayReponse;
  }))
  }



  editWindow(openClose: boolean){
    this.closeOpenEdit.next(openClose);
  }

  creationWindow(openClose: boolean){
    this.closeOpenCreation.next(openClose);
    
  }


  addCollection(CollectionName: string){
    
    const toDoListsUid = ['toDoListUIDTest1', 'toDoListUIDTest2', 'toDoListUIDTest3']
    const collectionUid = this.sharedRandom.makeid();
    const selected = false;
    const collectionObj = new ToDoListCollection(CollectionName, toDoListsUid, this.userUid, collectionUid, selected)

    this.fireStoreDB.collection('Collections').doc(collectionObj.collectionUid).set({
      collectionName: collectionObj.collectionName,
      userUid: collectionObj.userUid,
      todoListsUid: collectionObj.toDoListUid,
      selected: false,
      collectionUid: collectionObj.collectionUid
      
    }).then(() => {}).catch(x => {console.log('error', x.message)})
  }

  index: number;
  indexOfCollection(i){
    this.index = i
  }

  editCollection(collectionName: string){

    this.fireStoreDB.collection('Collections').doc(`${this.toDoListCollectionArray[this.index].collectionUid}`).update({
      'collectionName': collectionName
    }).then(()=>{}).catch(error => console.log(error.message)); 
  }

  deleteCollections(){

    for(let index = 0; this.selectedCollectionArray.length; index++){
      this.fireStoreDB.collection('Collections').doc(`${this.selectedCollectionArray[index].collectionUid}`).delete()
      .then(()=>{}).catch(error => console.log(error.message)); 
    }
    this.selectedCollectionArray = [];
    console.log('selected container after delete function', this.selectedCollectionArray)
  }

  deleteCollection(index){
    console.log('You Have Deleted: ',this.toDoListCollectionArray[index].collectionName);
    this.fireStoreDB.collection('Collections').doc(`${this.toDoListCollectionArray[index].collectionUid}`).delete()
    .then(()=>{}).catch(error => console.log(error.message)); 
  }

  


  ngOnDestroy(){
    
  }


}
