import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import { NotebookData } from '../notebook-data';
import { NotebookService } from '../notebook.service';
import { Pipe } from '@angular/core';
import { Notedata } from '../notedata';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-list-notebook',
  templateUrl: './list-notebook.component.html',
  styleUrls: ['./list-notebook.component.css']
})
export class ListNotebookComponent implements OnInit {
  notebook:NotebookData;
  notebooks:NotebookData[];
  notes : Notedata[] = [];
  modalRef: BsModalRef;
  hoverIdx = -1;show:boolean=false;clickIdx=-1;
  constructor(
    private route: ActivatedRoute,
    private notebookService: NotebookService,
    private location: Location,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.getNoteBook();
    this.getNoteBooks();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getNoteBooks(): void{
    this.notebookService.getNotebooks()
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
  colorVal;noteLen;

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
      .subscribe(() => this.getNoteBook());
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
      .subscribe(() => this.getNoteBook());
  }

  updateName(): void{
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }
  delNode;
  deleteNote(noteId:number): void{
    this.notebook.noteList[noteId-1]=" ";    
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }
  currentTodo;
  deleteTodo(todoId:number): void{
    this.currentTodo = this.notebook.todoList[todoId-1] = " ";
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }
  noteListLen;
  copyToNB(notebook:NotebookData, note:Notedata): void{
    console.log("copyToNB = "+notebook);
     this.colorRandomVal = Math.floor(Math.random() * this.colors.length);
    this.noteListLen = notebook.noteList.length;
    notebook.noteList.push({
      id:this.noteListLen+1,
      name:note.name,
      description: note.description,
       color: this.colors[this.colorRandomVal].value,
        created: new Date()
    });
  }

  goBack() : void {
    this.location.back();
  }

  save(): void {
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }

  toggle(notebookId:number) {
    console.log("toggle - "+notebookId)
    if(this.clickIdx===notebookId)
    {
      this.clickIdx = -1;
      this.show = false;
    }
    else  
    {
      this.show = true;
      this.clickIdx=notebookId;
    }
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
  
}