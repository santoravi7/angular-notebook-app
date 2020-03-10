import { Component, OnInit } from '@angular/core';
import { notebookList } from '../notebookList';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {
  notebooks = notebookList;
  
}