import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do-list-item.model'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnDestroy {

  toDoArray: ToDo[] = [];

  toDoCreate: boolean = false;
  toDoEdit: boolean = false;

  $CreationWindow: Subscription;
  $EditWindow: Subscription;

  $getTodo: Subscription;
  
  collectionName: string = 'container x'
  

 

  constructor(private toDoListService: ToDoListService, private router: Router) { }

  ngOnInit() {
    this.$CreationWindow = this.toDoListService.closeOpenCreation.subscribe((x) => {this.toDoCreate = x});
   this.$EditWindow = this.toDoListService.closeOpenEdit.subscribe((x) => {this.toDoEdit = x});

   this.$getTodo = this.toDoListService.getToDo()
   .subscribe(responseData => { 
     this.toDoArray = responseData;
      console.log('FireStore To-Do recieved', this.toDoArray)})
  }

  onAddToDo(){
    this.toDoCreate = !this.toDoCreate;
    
  }

  onBackPage(){
    this.router.navigate(['/collections'])
  }


  onCompleted(i){
    this.toDoListService.Completed(i);
  }


  onEditToDo(i){
    this.toDoListService.indexOfCollection(i);
    this.toDoEdit = !this.toDoEdit;
  }


  onDeleteToDo(i){
    this.toDoListService.deleteToDo(i);
  }

  onDeleteToDoBatch(){
    console.log('hi')
  }



  ngOnDestroy() {
    this.$CreationWindow.unsubscribe();
    this.$EditWindow.unsubscribe();
  }

  
 


  

}
