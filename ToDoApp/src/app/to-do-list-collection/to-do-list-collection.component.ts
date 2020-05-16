import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListCollection } from "./to-do-list-collection.model";
import { ToDoListCollectionService } from "./to-do-list-collection.service";
import { Router } from '@angular/router';


import { Subscription, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-to-do-list-collection',
  templateUrl: './to-do-list-collection.component.html',
  styleUrls: ['./to-do-list-collection.component.css']
})
export class ToDoListCollectionComponent implements OnInit, OnDestroy {

  toDoListCollectionArray: ToDoListCollection[] = [];
  
  
  subGetCollection: Subscription;
  collectionsDelete: boolean = false; //this needs activating.
  selectedCollectionArray: ToDoListCollection[] = []
  selectedArray: string[] = []
  collectionUidTest: string;

  //$editCollectionName = new Subject<boolean>();

  collectionEdit: boolean = false;
  collectionCreate: boolean = false;
  $CreationWindow: Subscription;
  $EditWindow: Subscription;
  
  index: number;

  constructor(private ToDoListCollectionService: ToDoListCollectionService, private router: Router) { }

  ngOnInit() {
   this.$CreationWindow = this.ToDoListCollectionService.closeOpenCreation.subscribe((x) => {this.collectionCreate = x});
   this.$EditWindow = this.ToDoListCollectionService.closeOpenEdit.subscribe((x) => {this.collectionEdit = x});

   this.subGetCollection = this.ToDoListCollectionService.getCollections()
   .subscribe(responseCollectionData => { 
     this.toDoListCollectionArray = responseCollectionData;
      console.log('FireStore collections recieved', this.toDoListCollectionArray)})
  };

  onEditCollectioname(i){
    this.ToDoListCollectionService.indexOfCollection(i);
    this.collectionEdit = !this.collectionEdit;
    
  }

  onAddCollection(){
    this.collectionCreate = !this.collectionCreate;
  }

  onDeleteCollection(){

  }

  onCollectionOpen(i){
    console.log('Collection Open', i)
    this.router.navigate(['/todo']);
  }


  onCollectionSelected(index: number){
    this.ToDoListCollectionService.collectionSelected(index);
  }

  onDeleteCollections(){
    this.ToDoListCollectionService.deleteCollections();
  }
   

  

  ngOnDestroy() {
    this.$CreationWindow.unsubscribe();
    this.$EditWindow.unsubscribe();
  }

  


  













  onCollectionClick(index: number){
    //this.ToDoListCollectionArray[index]; 
    //get those to do items from that by db request and paste it on the todo page. 
    //this.router.navigate(['/todo/:id']);
    
  }

  onCollectionCreate(){
    //create collection in firestore
  }

  onCollectionCheckBoxClick(index: number){
    //this.ToDoListCollectionArray[index].ticked = !this.ToDoListCollectionArray[index].ticked;
    //this.ToDoListCollectionArray.UpdateToDoArray(this.ToDoItemArray);
  }

}
