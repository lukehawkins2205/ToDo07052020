import { Injectable, OnInit } from '@angular/core';
import { ToDo } from './to-do-list-item.model'
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {



  constructor(private FireStoreDB: AngularFirestore, private afAuth: AngularFireAuth) { }


}
