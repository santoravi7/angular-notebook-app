import { InMemoryDbService } from 'angular-in-memory-web-api';
import { NotebookData } from '../notebook-data';
import { Injectable } from '@angular/core';
import { Notedata } from '../notedata';
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notebooks = [
       {
        id:1,
        name: 'Notebook 1',    
        noteList: [
          {
            id:1,
            name: 'Note 1',    
            description: 'this is my first note description. I can add notes and to-do list here and save it for my future reference!!!this is my first note description. I can add notes and to-do list here and save it for my future reference!!!this is my first note description. I can add notes and to-do list here and save it for my future reference!!!this is my first note description. I can add notes and to-do list here and save it for my future reference!!!',
            color: '#602379',
            created: 'Tue Mar 6 2020 23:34:12'
          },
          {
            id:2,
            name: 'Note 2',    
            description: 'A great phone with one of the best cameras',
            color: '#29b38d',
            created: 'Tue Mar 6 2020 23:34:12'
          },
          {
            id:3,
            name: 'Note 3',    
            description: 'this is my first note description. I can add notes and to-do list here and save it for my future reference!!!this is my first note description. I can add notes and to-do list here and save it for my future reference!!!this is my first note description. I can add notes and to-do list here and save it for my future reference!!!this is my first note description. I can add notes and to-do list here and save it for my future reference!!!',
            color: '#602379',
            created: 'Tue Mar 6 2020 23:34:12'
          },
          {
            id:4,
            name: 'Note 4',    
            description: 'thid is a sample description',
            color: '#f3785c',
            created: 'Tue Mar 6 2020 23:34:12'
          }
        ],
        todoList:[
          {
            id: 1,
            name: 'My Todo 1',
            color: '#5f4050',
            list: [
              {
                title:'this is a first todo',
                checked:true
              }
            ],
            created: 'Tue Mar 6 2020 23:34:12'
          }
        ],
        img: 'https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg',
        created: 'Tue Mar 6 2020 23:34:12'
      },
      {
        id:2,
        name: 'Notebook 2',    
        noteList: [
          {
            id:1,
            name: 'Note 1',    
            description: 'this is my first note description. I can add notes and to-do list here and save it for my future reference!!!',
            color: '#602379',
            created: 'Tue Mar 6 2020 23:34:12'
          },
          {
            id:2,
            name: 'Note 2',    
            description: 'A great phone with one of the best cameras',
            color: '#29b38d',
            created: 'Tue Mar 6 2020 23:34:12'
          },
          {
            id:3,
            name: 'Note 3',    
            description: '',
            color: '#f3785c',
            created: 'Tue Mar 6 2020 23:34:12'
          }
        ],
        todoList:[],
        img: 'https://picjumbo.com/wp-content/uploads/free-stock-images-1080x720.jpg',
        created: 'Tue Mar 7 2020 03:34:12'
      },
      {
        id:3,
        name: 'Notebook 3',    
        noteList: [],
        todoList:[],
        img: 'https://fscomps.fotosearch.com/compc/CSP/CSP241/little-lion-cub-head-animal-painting-stock-illustration__k30087417.jpg',
        created: 'Tue Mar 10 2020 23:34:12'
      }
    ];
    return {notebooks};
  }

  // Overrides the genId method to ensure that a note always has an id.
  // If the notes array is empty,
  // the method below returns the initial number (11).
  // if the notes array is not empty, the method below returns the highest
  // note id + 1.
  genId(notebook: NotebookData[]): number {
    return notebook.length > 0 ? Math.max(...notebook.map(notebook => notebook.id)) + 1 : 11;
  }

  getNote(note: Notedata[]):number{
    return note.length > 0 ? Math.max(...note.map(note => note.id)) + 1 : 11;
  }
}