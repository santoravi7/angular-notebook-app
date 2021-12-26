import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotebookComponent } from './notebook/notebook.component';
import { ListNotebookComponent } from './list-notebook/list-notebook.component';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo:'/notebooks',pathMatch:'full'},
  { path: 'notebooks', component: NotebookComponent},
  { path: 'notebooks/:id', component: ListNotebookComponent},
  // children:[
    { path: 'notebooks/:id/note/:id', component: ListNotesComponent},
    { path: 'notebooks/:id/todo/:id', component: ListTodoComponent},
  // ]  
// },
  { path:"**", component:PageNotFoundComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

export const routingComponents = [
  NotebookComponent,
  ListNotebookComponent,
  ListNotesComponent,
  ListTodoComponent,
  PageNotFoundComponent
]