import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../../to-do-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-todo-edit',
  templateUrl: './dynamic-todo-edit.component.html',
  styleUrls: ['./dynamic-todo-edit.component.css']
})
export class DynamicTodoEditComponent implements OnInit {

  Form: FormGroup;

  constructor(private toDoService: ToDoListService) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      'toDoName': new FormControl(null, Validators.required)
    });
  }

  onCancel(){
    this.toDoService.editWindow(false);  
  }


  onSubmit(){
    this.toDoService.editToDo(this.Form.value.toDoName);
    this.Form.reset();
    this.toDoService.editWindow(false);    
  }

}
