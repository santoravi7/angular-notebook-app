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
    
    const id1 = +this.route.snapshot.paramMap.get('id1');
    const id2 = +this.route.snapshot.paramMap.get('id2');
    // console.log("id 1 - "+id1+" --- id2-"+id2)
    this.notebookService.getNote(id1)
      .subscribe(
        note => this.notebook = note
      );
    this.noteId = id2-1;
    // console.log(this.noteId)
  } 

  goBack() : void {
    this.location.back();
  }


   save(): void {
    this.notebookService.updateNotebook(this.notebook)
      .subscribe(() => this.goBack());
  }

}