import { Component, OnInit } from '@angular/core';
import { ToDoListItem } from '../to-do-list/to-do-list-item.model';
import { ToDoListService } from './../to-do-list/to-do-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Show: boolean = false;
  ToDoItemArray: ToDoListItem[] = []
  ToDo: string = '';
  Ticked: boolean = false; 
  Form: FormGroup;
  ToDoMessage: string = 'Add To Do';

  constructor(private ToDoListService: ToDoListService) { }


  ngOnInit(): void {

    this.ToDoItemArray = this.ToDoListService.getToDoArray()

    this.Form = new FormGroup({
      'ToDoText': new FormControl(null, Validators.required)
    });
  }

  onShowForm(){
    this.Show = !this.Show;
    if(this.Show === true){
      this.ToDoMessage = 'Close Edit';
    }else {
      this.ToDoMessage = 'Add To Do';
    }
  }
 
  onDeleteSelected(){
   this.ToDoListService.DeleteSelected();
  }

  onSubmit(){
    this.ToDoListService.AddToDoItem(this.Form.value.ToDoText);
    console.log(this.Form.value.ToDoText);
    this.Form.reset();
  }



  onWipeAllToDos(){
    this.ToDoItemArray = [];
    this.ToDoListService.UpdateToDoArray(this.ToDoItemArray);
    this.ToDoListService.ToDoArrayChanged.next(this.ToDoItemArray);
  }
}
