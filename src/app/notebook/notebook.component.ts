import { Component, OnInit, TemplateRef } from '@angular/core';
import { notebookList } from '../notebookList';
import { NotebookData } from '../notebook-data';
import { NotebookService } from '../notebook.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Router, ActivatedRoute } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {
  notebooks : NotebookData[];
  hoverIdx = -1;clickIdx=-1;
  colorRandomVal;
  colorVal;noteLen;img;
  public show:boolean = false;
  modalRef: BsModalRef;

  constructor(private notebookService: NotebookService,
  private modalService: BsModalService, private router:Router,
  private route:ActivatedRoute) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  toggle(notebookId:number) {
    if(this.clickIdx===notebookId)
    {
      this.clickIdx = -1;
    }
    else  
    {
      this.show = true;
      this.clickIdx=notebookId;
    }
      
  }

  ngOnInit() {
    this.getAllNotebooks();
  }
  getAllNotebooks(): void {
    this.notebookService.getAllNotebooks()
        .subscribe(notes => this.notebooks = notes);
  }

  notebooksView(notebook):void{
    this.router.navigate([notebook.id], {relativeTo:this.route});
  }

  addNotebook(name: string, noteList: any[], todoList: any[], img: string,created: Date): void {
    this.colorRandomVal = Math.floor(Math.random() * this.images.length); 
    this.noteLen = this.notebooks.length+1;
    name = "Notebook "+this.noteLen;
    img = this.images[this.colorRandomVal].value;
    noteList = [];todoList=[];
    created = new Date();
    if(!created)
    created = new Date();
    if (!name) { return; }
    this.notebookService.addNotebook({ name,noteList,todoList,img,created } as NotebookData)
      // .subscribe(note => {
      //   this.notebooks.push(note);
      // });
      .subscribe({
        complete: () => {
          this.router.navigate([this.noteLen], {relativeTo:this.route});
        },
        next:()=>note => this.notebooks.push(note)
     });
  }

  deleteNotebook(notebook: NotebookData): void {
    this.notebooks = this.notebooks.filter(n => n !== notebook);
    this.notebookService.deleteNotebook(notebook).subscribe();
  }

  updateImg(image:string,notebook: NotebookData): void{
    notebook.img = image;
     this.notebookService.updateNotebook(notebook).subscribe();  
  }

  updateName(notebook:NotebookData): void{
    this.notebookService.updateNotebook(notebook)
      .subscribe();
  }

   images = [ 
      {value : 'https://cdn11.bigcommerce.com/s-x49po/images/stencil/1280x1280/products/10390/20031/C1__56311.1450766806.jpg?c=2&imbypass=on'},
      {value : 'https://i.pinimg.com/originals/1b/81/b3/1b81b34a80ae15b3c3dec725b1d523d2.jpg'},
      {value : 'https://i.pinimg.com/originals/a1/53/97/a15397c539f1e70be84e0b4f13218a9d.jpg'},
      {value : 'https://webneel.com/daily/sites/default/files/images/daily/10-2018/17-nature-scenery-oil-painting-trees-arteet.jpg'},
      {value : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7ERt7y9dePVMFSXbaxE0FvW2eQVVOGwwN_OQI501yeT5x4FNd'},
      {value : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBsLhlEJPb0T7-Oy6d51_HxXqK0jrYWDVj4m_PlIrzDxE7Tl6u'},
      {value : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRk_sks7CpwjnL9yWiIji8k7aI7mY86N9-byNxp-Gl-5w1Flmdc'},
      {value: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIi3vEDnvue29P8-GSDrcxFn-pGNcSjoRQomgvqvxPqBB9tIwL'}
    ];


}