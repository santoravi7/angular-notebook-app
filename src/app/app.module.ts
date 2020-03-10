import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component'; 

import { NotebookComponent } from './notebook/notebook.component';

import { NavbarComponent } from './navbar/navbar.component';
import { ListNotebookComponent } from './list-notebook/list-notebook.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot([
      { path: '', component: NotebookComponent },
       { path: 'notebooks/:notebookId', component: ListNotebookComponent }
    ]) ],
  declarations: [ AppComponent, NotebookComponent, NavbarComponent, ListNotebookComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
