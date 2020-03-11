import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import { NotebookData } from '../notebook-data';
import { NotebookService } from '../notebook.service';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-list-notebook',
  templateUrl: './list-notebook.component.html',
  styleUrls: ['./list-notebook.component.css']
})
export class ListNotebookComponent implements OnInit {
  notebook:NotebookData;

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
    console.log("this is getNoteBook notebook : "+id);
    this.notebookService.getNoteBook(id)
      .subscribe(
        notebook => this.notebook = notebook
      );
      console.log("Inside the subscribe - getNoteBook id = "+this.notebook)      
  }

  updateName(): void{
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }
  
  goBack() : void {
    this.location.back();
  }

  save(): void {
    this.notebookService.updateNote(this.notebook)
      .subscribe(() => this.goBack());
  }
}