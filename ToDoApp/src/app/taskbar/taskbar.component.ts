import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToDoListCollectionService } from '../to-do-list-collection/to-do-list-collection.service';
import { ToDoListService } from '../to-do-list/to-do-list.service';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router, private todoListCollectionService: ToDoListCollectionService, private toDoListService: ToDoListService) { }

  ngOnInit(): void {
  }

  onSignOut(){
    this.afAuth.signOut().then(x => {
      this.router.navigate(['/auth'])
    }).catch(x => {
      console.log(x.message);
    })
  }


  onCreateCollection(){
    this.todoListCollectionService.creationWindow(true);
  }

  onDeleteCollections(){
    this.todoListCollectionService.deleteCollections();
  }

  onEditCollections(){
    this.todoListCollectionService.editCollections();
  }


  
  onCreateToDoItem(){
    this.toDoListService.createToDoItem();
  }

  onDeletToDoItems(){
    this.toDoListService.deleteToDoItems();
  }

  onEditToDoItems(){
    this.toDoListService.editToDoItems();
  }

  

}
