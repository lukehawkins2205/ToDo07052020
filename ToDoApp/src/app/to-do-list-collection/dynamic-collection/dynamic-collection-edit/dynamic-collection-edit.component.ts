import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToDoListCollectionService } from '../../to-do-list-collection.service';

@Component({
  selector: 'app-dynamic-collection-edit',
  templateUrl: './dynamic-collection-edit.component.html',
  styleUrls: ['./dynamic-collection-edit.component.css']
})
export class DynamicCollectionEditComponent implements OnInit {

  Form: FormGroup;

  constructor(private toDoCollectionService: ToDoListCollectionService ) { }

  ngOnInit(): void {

    this.Form = new FormGroup({
      'collectionName': new FormControl(null, Validators.required)
    });

  }

  onCancel(){
    this.toDoCollectionService.editWindow(false);  
  }


  onSubmit(){
    this.toDoCollectionService.editCollection(this.Form.value.collectionName);
    this.Form.reset();
    this.toDoCollectionService.editWindow(false);    
  }


}
