import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotebookComponent } from './notebook/notebook.component';
import { ListNotebookComponent } from './list-notebook/list-notebook.component';

const routes: Routes = [
  { path: '', component: NotebookComponent},
  { path: 'detail/:id', component: ListNotebookComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}