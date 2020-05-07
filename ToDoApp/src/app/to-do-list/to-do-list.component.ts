import { Component, OnInit } from '@angular/core';
import { ToDoListService } from './to-do-list.service';
import { ToDoListItem } from './to-do-list-item.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  ToDoItemArray: ToDoListItem[] = []
  index: number = 0;
  subscription: Subscription;

  constructor(private ToDoListService: ToDoListService) { }

  ngOnInit() {

    this.ToDoItemArray = this.ToDoListService.getToDoArray()
    this.ToDoListService.PushListToDB()
    this.subscription = this.ToDoListService.ToDoArrayChanged.subscribe((ToDoArrayChanged: ToDoListItem[]) => {this.ToDoItemArray = ToDoArrayChanged});

  }

  onToggleTick(index: number){
    this.ToDoItemArray[index].ticked = !this.ToDoItemArray[index].ticked;
    this.ToDoListService.UpdateToDoArray(this.ToDoItemArray);
  }


  

}
