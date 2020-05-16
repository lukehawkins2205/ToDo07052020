import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListCollectionService } from '../to-do-list-collection.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dynamic-collection',
  templateUrl: './dynamic-collection.component.html',
  styleUrls: ['./dynamic-collection.component.css']
})
export class DynamicCollectionComponent implements OnInit {

  Form: FormGroup;

  constructor(private toDoCollectionService: ToDoListCollectionService ) { }

  ngOnInit(): void {

    this.Form = new FormGroup({
      'collectionName': new FormControl(null, Validators.required)
    });

  }



  onCancel(){
    this.toDoCollectionService.creationWindow(false);  
  }

  onSubmit(){
    this.toDoCollectionService.addCollection(this.Form.value.collectionName);
    this.Form.reset();
    this.toDoCollectionService.creationWindow(false);    
  }



  

}
