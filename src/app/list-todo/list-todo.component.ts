import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotebookData } from '../notebook-data';
import { NotebookService } from '../notebook.service';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {

  notebook:NotebookData;
  todoId;note;todoLen;newToDoTitle;
  hoverIdx = -1;
  public show:boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notebookService: NotebookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();
    let id=parseInt(this.route.snapshot.paramMap.get('id1'));
  }
  getNote(): void {
    
    const id1 = parseInt(this.route.snapshot.paramMap.get('notebookId'));
    const id2 = parseInt(this.route.snapshot.paramMap.get('id'));
    this.notebookService.getNote(id1)
      .subscribe(
        note => this.notebook = note
      );
    this.todoId=id2-1;
  } 

  goBack() : void {
    this.location.back()
  }
  
  addTodoItem(id:number) {
   this.todoLen = id;   
    this.notebook.todoList[this.todoLen].list.push({
        title:this.newToDoTitle,
        checked:false
    })
    console.log("Activated route - "+this.route);
    // this.router.navigate(['todo/'+id,{'notebookId':this.notebook.id}], {relativeTo:this.route});
    this.notebookService.updateNotebook(this.notebook).subscribe({
      next:()=>note => this.notebook = note
   })
      
   this.newToDoTitle = '';
  }

  updateTodoItem(id:number,todoId:number,title:string,checked:boolean) {
    this.notebook.todoList[id].list[todoId].title=title;
    this.notebook.todoList[id].list[todoId].checked=checked;
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.getNote());
   this.newToDoTitle = '';
  }

  removeTodoItem(id:number,id2:number) {
   this.todoLen = id; 
    this.notebook.todoList[this.todoLen].list.splice(id2,1);
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.getNote());
   this.newToDoTitle = '';
  }

  updateName(notebook: NotebookData): void{
    console.log(notebook);
    this.notebookService.updateNotebook(notebook)
      .subscribe();
  }

  

  save(): void {
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }



}