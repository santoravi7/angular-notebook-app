import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotebookData } from '../notebook-data';
import { NotebookService } from '../notebook.service';
import { Pipe } from '@angular/core';
import { Notedata } from '../notedata';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  notebook:NotebookData;
  notes : Notedata[];

  constructor( private route: ActivatedRoute,
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

}