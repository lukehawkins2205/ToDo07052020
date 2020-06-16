import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListCollection } from "./to-do-list-collection.model";
import { ToDoListCollectionService } from "./to-do-list-collection.service";
import { Router } from '@angular/router';



import { Subscription, Subject, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-to-do-list-collection',
  templateUrl: './to-do-list-collection.component.html',
  styleUrls: ['./to-do-list-collection.component.css']
})
export class ToDoListCollectionComponent implements OnInit, OnDestroy {

  toDoListCollectionArray: ToDoListCollection[] = [];
  
  
  $getCollection: Subscription;
  $getRelatedToDos: Subscription;
  $CompletedRelatedToDos: Subscription;
  collectionsDelete: boolean = false; 
  selectedCollectionArray: ToDoListCollection[] = []
  selectedArray: string[] = []
  collectionUidTest: string;

  

  collectionEdit: boolean = false;
  collectionCreate: boolean = false;
  $CreationWindow: Subscription;
  $EditWindow: Subscription;
  
  index: number;

  isFetching = true;
  deleteMode = false;

  collectionID: number;

  constructor(private ToDoListCollectionService: ToDoListCollectionService, private router: Router, private MatIcon: MatIconRegistry, private sanitizer: DomSanitizer) {
    //MatIcon.addSvgIcon('more', sanitizer.bypassSecurityTrustResourceUrl('/assets/more_vert-black-18dp.svg'));
    MatIcon.addSvgIcon('listIcon', sanitizer.bypassSecurityTrustResourceUrl('/assets/list-flat.svg'));
    MatIcon.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('/assets/add_circle-black-18dp.svg'));
   }

  ngOnInit() {
   this.$CreationWindow = this.ToDoListCollectionService.closeOpenCreation.subscribe((x) => {this.collectionCreate = x});
   this.$EditWindow = this.ToDoListCollectionService.closeOpenEdit.subscribe((x) => {this.collectionEdit = x});

   this.$getCollection = this.ToDoListCollectionService.getCollections()
   .subscribe(responseCollectionData => { 
     this.isFetching = false; 
     this.toDoListCollectionArray = responseCollectionData;
    })
  };

  onEditCollectioname(i){
    this.ToDoListCollectionService.indexOfCollection(i);
    this.collectionEdit = !this.collectionEdit;
    
  }

  onAddCollection(){
    this.collectionCreate = !this.collectionCreate;
  }

  
  onDeleteCollection(index:number){
    this.deleteMode = true;
    this.ToDoListCollectionService.collectionIndex = index 

    this.$getRelatedToDos = this.ToDoListCollectionService.getRelatedToDo().subscribe(() => {
      this.ToDoListCollectionService.deleteCollection(index);
  })
    this.$CompletedRelatedToDos = this.ToDoListCollectionService.getCompletedRelatedToDo().subscribe(() => {
      this.ToDoListCollectionService.deleteCollection(index); 
  })
  }

  onCollectionOpen(index){

    this.ToDoListCollectionService.getCollectionToDoList(index);
  }


  onCollectionSelected(index: number){
    index = this.ToDoListCollectionService.collectionIndex;
    this.ToDoListCollectionService.collectionSelected(index);
  }

  onDeleteCollections(){
    this.ToDoListCollectionService.deleteCollections();
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.toDoListCollectionArray, event.previousIndex, event.currentIndex);
  }
   

  

  ngOnDestroy() {
    this.$CreationWindow.unsubscribe();
    this.$EditWindow.unsubscribe();
    this.$getCollection.unsubscribe();

    if(this.deleteMode === true){
      this.$getRelatedToDos.unsubscribe();
      this.$CompletedRelatedToDos.unsubscribe();
      this.deleteMode = false; 
    }
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
