import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListCollection } from "./to-do-list-collection.model";
import { ToDoListCollectionService } from "./to-do-list-collection.service";
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-to-do-list-collection',
  templateUrl: './to-do-list-collection.component.html',
  styleUrls: ['./to-do-list-collection.component.css']
})
export class ToDoListCollectionComponent implements OnInit, OnDestroy {

  toDoListCollectionArray: ToDoListCollection[] = [];
  collectionCreate: boolean = false;
  private subCreationWindow: Subscription;
  private subGetCollection: Subscription;
  collectionsDelete: boolean = false;
  selectedCollectionArray: ToDoListCollection[] = []
  selectedArray: string[] = []
  


  constructor(private ToDoListCollectionService: ToDoListCollectionService, private router: Router) { }

  ngOnInit() {
   this.subCreationWindow = this.ToDoListCollectionService.CloseOpen.subscribe((x) => {this.collectionCreate = x});
   this.subGetCollection = this.ToDoListCollectionService.getCollections().subscribe(responseCollectionData => { this.toDoListCollectionArray = responseCollectionData; console.log('collection recieved', this.toDoListCollectionArray)})
  };


  onCollectionSelected(index: number){

    this.toDoListCollectionArray[index].selected = !this.toDoListCollectionArray[index].selected;
    
    if(this.toDoListCollectionArray[index].selected === true){
      this.selectedCollectionArray.push(this.toDoListCollectionArray[index])
    }
    
    console.log('selectedarray length: ', this.selectedCollectionArray.length);
  }

  onDeleteCollections(){

  }
   

  

  ngOnDestroy() {
    this.subCreationWindow.unsubscribe();
    this.subGetCollection.unsubscribe();
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
