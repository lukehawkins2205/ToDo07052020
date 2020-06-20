import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { ErrorComponent } from './error/error.component';
import {MatExpansionModule} from '@angular/material/expansion';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";

import {FormsModule} from '@angular/forms'

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';








import { environment } from 'src/environments/environment';
import { ToDoListCollectionComponent } from './to-do-list-collection/to-do-list-collection.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { DynamicCollectionComponent } from './to-do-list-collection/dynamic-collection/dynamic-collection.component';
import { SharedComponent } from './shared/shared.component';
import { DynamicCollectionEditComponent } from "./to-do-list-collection/dynamic-collection/dynamic-collection-edit/dynamic-collection-edit.component";

import { DynamicTodoCreateComponent } from "./to-do-list/dynamic-todo/dynamic-todo-create/dynamic-todo-create.component";
import { DynamicTodoEditComponent } from "./to-do-list/dynamic-todo/dynamic-todo-edit/dynamic-todo-edit.component";











@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    AuthComponent,
    ErrorComponent,
    ToDoListCollectionComponent,
    TaskbarComponent,
    DynamicCollectionComponent,
    SharedComponent,
    DynamicCollectionEditComponent,
    DynamicTodoCreateComponent,
    DynamicTodoEditComponent,
    ErrorComponent
    

    
    
    
    

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatGridListModule,
    DragDropModule,
    MatExpansionModule
    
    
   
    
  ],
  providers: [SharedComponent, ErrorComponent, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
