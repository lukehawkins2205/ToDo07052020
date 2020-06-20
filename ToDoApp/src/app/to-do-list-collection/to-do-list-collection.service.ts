import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { ToDoListCollection } from './to-do-list-collection.model';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedComponent } from '../shared/shared.component';
import { tap, map } from 'rxjs/operators';
import { ToDoListService } from '../to-do-list/to-do-list.service';
import { AuthService } from '../auth/auth.service';
import { ToDo } from '../to-do-list/to-do-list-item.model';





@Injectable({
  providedIn: 'root'
})




export class ToDoListCollectionService implements OnInit, OnDestroy  {

  closeOpenCreation = new Subject<boolean>();
  closeOpenEdit = new Subject<boolean>();

  getToDoList = new Subject<string>();  
  ChangeSubHeading = new Subject<string>(); 
  
  toDoListCollectionArray: ToDoListCollection[] = []; 
  selectedCollectionArray: ToDoListCollection[] = [];

  relatedTodos = [];

  readyToDeleteToDo = 0;

  collectionIndex: number;
  



  constructor(private router: Router, private fireStoreDB: AngularFirestore, private afAuth: AngularFireAuth, private sharedRandom: SharedComponent, private toDoService: ToDoListService, private afService: AuthService) {
  
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
  this.toDoService.collectionToDo = this.toDoListCollectionArray[index];
  this.ChangeSubHeading.next(this.toDoListCollectionArray[index].collectionName);

   this.router.navigate(['/todo']);
  }

  getCollections(){
    
  return this.fireStoreDB.collection<ToDoListCollection>('Collections', ref => ref.where('userUid', '==', `${this.afService.user.uid}`)).valueChanges()
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
    
    const toDoListUid: string[] = ['test'];
    const collectionUid = this.sharedRandom.makeid();
    const selected = false;
    const collectionObj = new ToDoListCollection(CollectionName, toDoListUid, this.afService.user.uid, collectionUid, selected)

    this.fireStoreDB.collection('Collections').doc(collectionObj.collectionUid).set({
      collectionName: collectionObj.collectionName,
      userUid: collectionObj.userUid,
      todoListUid: collectionObj.toDoListUid,
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

    if(this.readyToDeleteToDo === 2){

      this.relatedTodos.forEach(itemID => {
        this.fireStoreDB.collection('ToDo').doc(`${itemID}`).delete()
      .then(()=>{}).catch(error => console.log(error.message)); 
      })

      this.relatedTodos.forEach(itemID => {
        this.fireStoreDB.collection('ToDoCompleted').doc(`${itemID}`).delete()
      .then(()=>{}).catch(error => console.log(error.message)); 
      })
      
      this.fireStoreDB.collection('Collections').doc(`${this.toDoListCollectionArray[index].collectionUid}`).delete()
      .then(()=>{}).catch(error => console.log(error.message));

      this.readyToDeleteToDo = 0;
      this.collectionIndex = null;
      this.relatedTodos = [];
    }else{
      return null;
    }

  }


  getRelatedToDo(){
    if(this.collectionIndex === null || undefined){
      return of(null);
    }else{
      return this.fireStoreDB.collection<ToDo>('ToDo', ref => ref.where('toDoCollectionUid', '==', `${this.toDoListCollectionArray[this.collectionIndex].collectionUid}`)).get()
      .pipe(
        map(snapshot => {
            this.readyToDeleteToDo++
            const docData = snapshot.docs;
            for(var i in docData){
              this.relatedTodos.push(docData[i].id);
            }
            return this.relatedTodos;
        }))
    }
      
  } 

  getCompletedRelatedToDo(){

    if(this.collectionIndex === null || undefined){
      return of(null);
    }else{
      return this.fireStoreDB.collection<ToDo>('ToDoCompleted', ref => ref.where('toDoCollectionUid', '==', `${this.toDoListCollectionArray[this.collectionIndex].collectionUid}`)).get()
    .pipe(
      map(snapshot => {
        this.readyToDeleteToDo++
        const docData = snapshot.docs;
        for(var i in docData){
          this.relatedTodos.push(docData[i].id);
        }
        return this.relatedTodos;
      }))
    }
} 
  


  ngOnDestroy(){
    
  }


}
