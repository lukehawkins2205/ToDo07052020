import { Component, OnInit } from '@angular/core';
import { ToDoListItem } from '../to-do-list/to-do-list-item.model';
import { ToDoListService } from './../to-do-list/to-do-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';





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

  constructor(private ToDoListService: ToDoListService, private authService: AuthService) { }


  btnLogOutShow: boolean = false;
  ShowLogOut = this.authService.showButtonSubject.subscribe
  Subscription: Subscription;


  ngOnInit(): void {

    this.Subscription = this.authService.showButtonSubject.subscribe(() => {
      this.btnLogOutShow = true;
    })

    





    this.ToDoItemArray = this.ToDoListService.getToDoArray()

    this.Form = new FormGroup({
      'ToDoText': new FormControl(null, Validators.required)
    });
  }




  onLogOut(){
    this.authService.LogOut();
    this.btnLogOutShow = false;
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
