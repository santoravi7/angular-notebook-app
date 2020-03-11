import { Component, OnInit } from '@angular/core';
import { notebookList } from '../notebookList';
import { NotebookData } from '../notebook-data';
import { NotebookService } from '../notebook.service';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {
  notebooks : NotebookData[];
  constructor(private notebookService: NotebookService) { }
  ngOnInit() {
    this.getNotebooks();
  }
  getNotebooks(): void {
    this.notebookService.getNotebooks()
        .subscribe(notes => this.notebooks = notes);
  }
}