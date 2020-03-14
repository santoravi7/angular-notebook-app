import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor( private route: ActivatedRoute,
    private notebookService: NotebookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();
  }
  getNote(): void {
    const id1 = +this.route.snapshot.paramMap.get('id1');
    const id2 = +this.route.snapshot.paramMap.get('id2');
    this.notebookService.getNote(id1)
      .subscribe(
        note => this.notebook = note
      );
    this.todoId = id2-1;
    // console.log(this.todoId)
  } 

  goBack() : void {
    this.location.back();
  }
  
  addTodoItem(id:number) {
   this.todoLen = id;   
  //  console.log("todo this.notebook - "+this.notebook.todoList[this.todoLen]);
    this.notebook.todoList[this.todoLen].list.push({
        title:this.newToDoTitle,
        checked:false
    })
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.getNote());
   this.newToDoTitle = '';
  }


   save(): void {
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }

}