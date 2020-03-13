import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotebookComponent } from './notebook/notebook.component';
import { ListNotebookComponent } from './list-notebook/list-notebook.component';
import { ListNotesComponent } from './list-notes/list-notes.component';

const routes: Routes = [
  { path: '', component: NotebookComponent},
  { path: 'detail/:id', component: ListNotebookComponent },
  { path: 'note/:id1/:id2', component: ListNotesComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}