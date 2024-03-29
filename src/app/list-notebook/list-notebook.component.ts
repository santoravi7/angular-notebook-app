import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { Location } from '@angular/common';
import { NotebookData } from '../notebook-data';
import { NotebookService } from '../notebook.service';
import { Pipe } from '@angular/core';
import { Notedata } from '../notedata';
import { TodolistData } from '../todolist-data';
import { findIndex } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-notebook',
  templateUrl: './list-notebook.component.html',
  styleUrls: ['./list-notebook.component.css']
})
export class ListNotebookComponent implements OnInit {
    notebook:NotebookData;
    notebooks:NotebookData[];
    notes : Notedata[] = [];
    proverbRandomVal
    hoverIdx = -1;hoverTodoIdx=-1;
    closeResult = '';
    show:boolean=false;clickIdx=-1;todoIdx=-1;
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private notebookService: NotebookService,
      private location: Location,
      private modalService: NgbModal
      ) { }

    ngOnInit(): void {
      this.getNoteBook();
      this.getAllNoteBooks();
      this.proverbRandomVal = this.proverb[Math.floor(Math.random() * this.proverb.length)];
    }

    openModal(template: TemplateRef<any>) {
      // this.modalRef = this.modalService.show(template);
      console.log("Open modal clicked"+template);
      this.modalService.open(template)
    }    

    notesView(notes):void{
      this.router.navigate(['note/'+notes.id,{'notebookId':this.notebook.id}], {relativeTo:this.route});
    }
    todoView(todo):void{
      this.router.navigate(['todo/'+todo.id,{'notebookId':this.notebook.id}], {relativeTo:this.route});
    }

  getAllNoteBooks(): void{
    this.notebookService.getAllNotebooks()
        .subscribe(notes => this.notebooks = notes);
  }

  getNoteBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.notebookService.getNoteBook(id)
      .subscribe(
        notebook => this.notebook = notebook
      );
  } 

  colorRandomVal;
  colorVal;noteLen;words;

  addNote(): void{
    this.colorRandomVal = Math.floor(Math.random() * this.colors.length); 
    this.noteLen = this.notebook.noteList.length+1;   
    this.notebook.noteList.push({
        id: this.noteLen,
        name: 'New Note '+this.noteLen,    
        description: 'this is my first note description. I can add notes and to-do list here and save it for my future reference!!!',
        color: this.colors[this.colorRandomVal].value,
        created: new Date()
      })
    this.notebookService.updateNotebook(this.notebook)
      // .subscribe(() => this.getNoteBook());
      .subscribe({
        complete: () => {
          this.router.navigate(['note/'+this.noteLen,{'notebookId':this.notebook.id}], {relativeTo:this.route});
        },
        next:()=>note => this.notebook = note
     })
  }
  globalTodoLen=0;

  addTodo(): void{
    this.colorRandomVal = Math.floor(Math.random() * this.colors.length); 
    this.noteLen = this.notebook.todoList.length;
    if(this.globalTodoLen<this.noteLen){
      this.globalTodoLen=this.noteLen;
      this.globalTodoLen++;    
    }   
    else{
      this.globalTodoLen++;
    }
    this.notebook.todoList.push({
        id: this.globalTodoLen,
        name: 'My Todo '+this.globalTodoLen,    
        color: this.colors[this.colorRandomVal].value,
        list:[{title:'this is a first todo',
                checked:true}],
        created: new Date()
      })
    this.notebookService.updateNotebook(this.notebook)
      .subscribe({
        complete: () => {
          this.router.navigate(['todo/'+this.globalTodoLen,{'notebookId':this.notebook.id}], {relativeTo:this.route});
        },
        next:()=>note => this.notebook = note
     })
  }

  updateName(): void{
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }
  delNode;

  deleteNote(noteId:number,notebook): void{
    console.log("note Id - "+noteId);
    const index = notebook.findIndex(e =>e.id===noteId);
    notebook.splice(index,1);    
    this.notebookService.updateNotebook(this.notebook)
      .subscribe({complete: () => {
        this.router.navigate([], {relativeTo:this.route});
      }});
  }
  currentTodo;
  deleteTodo(todoId:number,notebook): void{
    const index = notebook.findIndex(e =>e.id===todoId);
    console.log("note id to be deleted - "+todoId);
    this.currentTodo = this.notebook.todoList.splice(index,1);
    this.notebookService.updateNotebook(this.notebook)
      .subscribe({complete: () => {
        this.router.navigate([], {relativeTo:this.route});
      }});
  }
  noteListLen;
  copyToNB(notebook:NotebookData, note:Notedata): void{
    console.log("copyToNB = "+note.id);
     this.colorRandomVal = Math.floor(Math.random() * this.colors.length);
    this.noteListLen = notebook.noteList.length;
    notebook.noteList.push({
      id:this.noteListLen+1,
      name:note.name,
      description: note.description,
      color: this.colors[this.colorRandomVal].value,
      created: new Date()
    });
   this.notebookService.updateNotebook(notebook)
      .subscribe(() => this.goBack());

  }

  goBack() : void {
    this.location.back()
  }

  save(): void {
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }
   
  toggle(idx,type) {
    console.log("click id = "+this.clickIdx);
    if(type=="note"){
      if(this.clickIdx===idx)
      {
        this.clickIdx = -1;
        this.show = false;
      }
      else  
      {
        this.show = true;
        this.clickIdx = idx;
      }
    }
    if(type=="todo"){
      if(this.todoIdx===idx)
      {
        this.todoIdx = -1;
        this.show = false;
      }
      else  
      {
        this.show = true;
        this.todoIdx = idx;
      }
    }
    console.log("toggle = "+idx+" toggle type - "+type);
  }


   copyTodoToNB(notebook:NotebookData,todo:TodolistData): void{
    console.log("copyToNB = "+todo);
    this.colorRandomVal = Math.floor(Math.random() * this.colors.length);
    this.noteListLen = notebook.todoList.length;
    notebook.todoList.push({
      id:this.noteListLen+1,
      name:todo.name,
      color: this.colors[this.colorRandomVal].value,
      list:todo.list,
      created: new Date()
    })
    this.notebookService.updateNotebook(notebook)
      .subscribe(() => this.goBack());
  }
  

  colors = [ 
        {value : '#CD5C5C'},
        {value : '#7DCEA0'},
        {value : '#FFA406'},
        {value : '#5D9EBC'},
        {value : '#7B5DB0'},
        {value : '#E82640'},
        {value : '#135845'},
        {value : '#c74d4d'},
        {value : '#b39363'},
        {value : '#848484'},
        {value : '#01559e'},
        {value : '#506271'},
        {value : '#18CFA0'}
      ];

  proverb = [
    {
      value : 'It is never too late to be what you might have been.',
      author : 'Plato'
    },
    {value : 'From small beginnings come great things',
    author : 'Unknown'},
    {value : 'Somewhere, something incredible is waiting to be known.',
    author : 'Carl Sagan'},
  ]
  
}

