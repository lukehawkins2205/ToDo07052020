import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToDoListService } from '../../to-do-list.service';

@Component({
  selector: 'app-dynamic-todo-create',
  templateUrl: './dynamic-todo-create.component.html',
  styleUrls: ['./dynamic-todo-create.component.css']
})
export class DynamicTodoCreateComponent implements OnInit {

  Form: FormGroup;

  constructor(private toDoService: ToDoListService) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      'toDoName': new FormControl(null, Validators.required)
    });
  }

  onCancel(){
    this.toDoService.creationWindow(false);  
  }

  onSubmit(){
   
    this.toDoService.addToDo(this.Form.value.toDoName);
    this.Form.reset();
    this.toDoService.creationWindow(false);    
  }

}
