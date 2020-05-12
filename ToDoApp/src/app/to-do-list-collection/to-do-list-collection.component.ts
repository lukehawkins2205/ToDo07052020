import { Component, OnInit } from '@angular/core';
import { ToDoListCollection } from "./to-do-list-collection.model";
import { ToDoListCollectionService } from "./to-do-list-collection.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list-collection',
  templateUrl: './to-do-list-collection.component.html',
  styleUrls: ['./to-do-list-collection.component.css']
})
export class ToDoListCollectionComponent implements OnInit {

  ToDoListCollectionArray: ToDoListCollection[] = []


  constructor(private ToDoListCollectionService: ToDoListCollectionService, private router: Router) { }

  ngOnInit(): void {
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
