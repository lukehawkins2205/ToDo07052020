import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToDoListCollectionService } from '../to-do-list-collection/to-do-list-collection.service';
import { ToDoListService } from '../to-do-list/to-do-list.service';
import { AuthService } from '../auth/auth.service';
import { unescapeIdentifier } from '@angular/compiler';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit, OnDestroy {

  subscription: Subscription
  $updateSubHeading: Subscription;

  constructor(private afAuth: AngularFireAuth, private router: Router, private afService: AuthService, private collection: ToDoListCollectionService, ) { 
    this.subscription = this.afService.signOutButtonSubject.subscribe(x => this.show = x)
    
  }

  show: boolean = false; 

  subHeading = 'Lists'


  ngOnInit() {
    this.$updateSubHeading = this.collection.ChangeSubHeading.subscribe(heading => {this.subHeading = heading});
  }

  onSignOut(){
    this.show = false; 
    this.afAuth.signOut().then(x => {
      this.router.navigate(['/auth'])
    }).catch(x => {
      console.log(x.message);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.$updateSubHeading.unsubscribe();
    this.$updateSubHeading.unsubscribe();
  }

 
}
