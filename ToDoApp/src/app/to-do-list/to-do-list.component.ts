import { Component, OnInit } from '@angular/core';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do-list-item.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  toDoArray: ToDo[] = [];

  toDoCreate: boolean = false;
  toDoEdit: boolean = false;

 

  constructor(private ToDoListService: ToDoListService) { }

  ngOnInit() {

  }

  onAddToDo(){

  }

  onCompleted(i){
    console.log(i);
  }


  onEditToDo(i){
    console.log(i);
  }


  onDeleteToDo(i){
    console.log(i);
  }

  onDeleteToDoBatch(){
    
  }

  
 


  

}
