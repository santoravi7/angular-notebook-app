import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { notebookList } from '../notebookList';

@Component({
  selector: 'app-list-notebook',
  templateUrl: './list-notebook.component.html',
  styleUrls: ['./list-notebook.component.css']
})
export class ListNotebookComponent implements OnInit {
  notebook;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.notebook = notebookList[+params.get('notebookId')]; 
    })
  }

}