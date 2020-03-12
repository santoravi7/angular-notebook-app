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
  noteId;note;
  constructor( private route: ActivatedRoute,
    private notebookService: NotebookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();
  }
  getNote(): void {
    
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.notebookService.getNote(id)
      .subscribe(
        note => this.notes = note
      );
    this.noteId = id-1;
    console.log(this.noteId)
  } 
  
  goBack() : void {
    this.location.back();
  }


   save(): void {
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }

}