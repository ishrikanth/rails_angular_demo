import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AlertService} from "./services";
import { TodoComponent } from './todo/todo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { SignoutComponent } from './signout/signout.component';
import { BasicAuthInterceptor } from './auth/basic-auth-interceptor'
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import {environment} from "../environments/environment";
import { PolicyListComponent } from './policy-list/policy-list.component';
import {AngularFirestore} from "@angular/fire/firestore";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    TodoComponent,
    NewTodoComponent,
    SignoutComponent,
    PolicyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    AlertService, { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
