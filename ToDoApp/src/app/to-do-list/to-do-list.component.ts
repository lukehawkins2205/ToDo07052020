import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do-list-item.model'
import { Subscription, of, Subject } from 'rxjs';
import { Router } from '@angular/router';


import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToDoListCollectionService } from '../to-do-list-collection/to-do-list-collection.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnDestroy {

  toDoArray: ToDo[] = [];
  completedToDoArray: ToDo[] = [];

  toDoCreate: boolean = false;
  toDoEdit: boolean = false;

  $CreationWindow: Subscription;
  $EditWindow: Subscription;

  $getTodo: Subscription;
  
  collectionName: string = this.toDoListService.collectionName;

  $serviceToDo: Subscription

  complete: boolean = false; 

  isFetching = true;
  
  $toDoSort: Subscription;

  $toDoCompleted1: Subscription;

  sortOption: string = '';

  changeSubHeading: Subject<string>;


 showCompletedList: boolean = false;
 showSortList: boolean = false;

  constructor(private toDoListService: ToDoListService, private router: Router, private MatIcon: MatIconRegistry, private sanitizer: DomSanitizer, private Collection: ToDoListCollectionService) {
    MatIcon.addSvgIcon('more', sanitizer.bypassSecurityTrustResourceUrl('/assets/more_vert-black-18dp.svg'));
    MatIcon.addSvgIcon('radiobutton', sanitizer.bypassSecurityTrustResourceUrl('/assets/more_vert-black-18dp.svg'));
    MatIcon.addSvgIcon('radiobutton', sanitizer.bypassSecurityTrustResourceUrl('/assets/more_vert-black-18dp.svg'));
   }

  ngOnInit() {
    this.$CreationWindow = this.toDoListService.closeOpenCreation.subscribe((x) => {
      this.toDoCreate = x});

   this.$EditWindow = this.toDoListService.closeOpenEdit.subscribe((x) => {
     this.toDoEdit = x});

   this.$toDoSort = this.toDoListService.todoArrayNext.subscribe(sortedtoDoArray => {
     if(sortedtoDoArray.length === 0){
      this.showSortList = false;
     }
     else{
       this.showSortList = true;
     }
     this.isFetching = false; 
     this.toDoArray = sortedtoDoArray
    });

    this.$toDoCompleted1 = this.toDoListService.getToDoCompleted().subscribe((x) => {
      
      if (x.length === 0){
        this.showCompletedList = false;
      }
      else{
        this.showCompletedList = true;
      }
      
      this.completedToDoArray = x});

  
    this.$serviceToDo = this.toDoListService.getToDo().subscribe(()=>{
      
      this.toDoListService.sort(this.sortOption);
    
  })
  }

  onAddToDo(){
    this.toDoCreate = !this.toDoCreate;
    
  }

  onBackPage(){
    this.Collection.ChangeSubHeading.next('Lists')
    this.router.navigate(['/collections'])
  }


  onCompleted(i){
    this.toDoListService.Completed(i);
  }

  onUnComplete(i){
    this.toDoListService.unCompleted(i);
  }


  onEditToDo(i){
    this.toDoListService.indexOfCollection(i);
    this.toDoEdit = !this.toDoEdit;
  }


  onDeleteToDo(i){
    this.toDoListService.deleteToDo(i);
  }

  onDeleteCompletedToDo(i){
    this.toDoListService.deleteCompletedToDo(i);
  }

  onDeleteToDoBatch(){
    console.log('hi')
  }



  onSort(option: string){
    this.sortOption = option;
    this.toDoListService.sort(option);
    
  }
  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.toDoArray, event.previousIndex, event.currentIndex);
  }

  


  ngOnDestroy() {
    this.$CreationWindow.unsubscribe();
    this.$EditWindow.unsubscribe();
    this.$toDoSort.unsubscribe();
    this.$EditWindow.unsubscribe();
    this.$toDoCompleted1.unsubscribe();
  }

  

}


export class ExpansionOverviewExample {
  panelOpenState = false;
}
