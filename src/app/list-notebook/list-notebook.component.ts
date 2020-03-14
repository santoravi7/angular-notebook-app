import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import { NotebookData } from '../notebook-data';
import { NotebookService } from '../notebook.service';
import { Pipe } from '@angular/core';
import { Notedata } from '../notedata';

@Component({
  selector: 'app-list-notebook',
  templateUrl: './list-notebook.component.html',
  styleUrls: ['./list-notebook.component.css']
})
export class ListNotebookComponent implements OnInit {
  notebook:NotebookData;
  notes : Notedata[];
  constructor(
    private route: ActivatedRoute,
    private notebookService: NotebookService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getNoteBook();
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
        color: this.colors[this.colorRandomVal].value
      })
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.getNoteBook());
  }

  addTodo(): void{
    this.colorRandomVal = Math.floor(Math.random() * this.colors.length); 
    this.noteLen = this.notebook.todoList.length+1;   
    this.notebook.todoList.push({
        id: this.noteLen,
        name: 'My Todo '+this.noteLen,    
        color: this.colors[this.colorRandomVal].value,
        list:[{}]
      })
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.getNoteBook());
  }

  updateName(): void{
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }
  
  goBack() : void {
    this.location.back();
  }

  save(): void {
    this.notebookService.updateNotebook(this.notebook)
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
        {value : '#e3e3e3'},
        {value : '#01559e'},
        {value : '#506271'},
        {value : '#18CFA0'}
      ];
  
}