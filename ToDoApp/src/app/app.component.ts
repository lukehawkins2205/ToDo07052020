import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ToDoApp';
  btnLogOutShow: boolean = false;
  ShowLogOut = this.authService.showButtonSubject.subscribe
  Subscription: Subscription;

  ngOnInit(){
    this.Subscription = this.authService.showButtonSubject.subscribe(() => {
      this.btnLogOutShow = true;
    })
  }

  constructor(private authService: AuthService){}

  onLogOut(){
    this.authService.LogOut();
    this.btnLogOutShow = false;
  }


}
