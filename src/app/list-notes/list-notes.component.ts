import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
  constructor( private router: Router,
    private route: ActivatedRoute,
    private notebookService: NotebookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();
  }
  getNote(): void {
    const id1 = parseInt(this.route.snapshot.paramMap.get('notebookId'));
    const id2 = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log("Notebook id - final id - "+id1);
    this.notebookService.getNote(id1)
      .subscribe(
        note => this.notebook = note
      );
    this.noteId=id2-1;
    console.log("Note id - "+this.noteId)
  } 

  goBack() : void {
    this.location.back()
  }

   save(): void {
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }

}