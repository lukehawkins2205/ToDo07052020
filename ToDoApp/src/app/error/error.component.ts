import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  constructor(private afService: AuthService) { }

  sub: Subscription;
  error: string;

  errorClose = new Subject<boolean>();

  ngOnInit(): void {
    
  }


  
  onCancel(){
    this.errorClose.next(false);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
