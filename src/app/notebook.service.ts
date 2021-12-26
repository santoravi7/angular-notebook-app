import { Injectable } from '@angular/core';
import { NotebookData } from './notebook-data';
import { Notedata } from '../notedata';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';


@Injectable({
  providedIn : 'root',
})

export class NotebookService {
  private notebooksUrl = "api/notebooks";
  private notesUrl = "api/notes";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http : HttpClient,
  private messageService: MessageService) { }

  getAllNotebooks (): Observable<NotebookData[]> {
    return this.http.get<NotebookData[]>(this.notebooksUrl)
      .pipe(
        tap(_ => this.log('fetched notes')),
        catchError(this.handleError<NotebookData[]>('getAllNotebooks', []))
      );
  }

  getNoteBook(id: number): Observable<NotebookData> {
    const url = `${this.notebooksUrl}/${id}`;
    return this.http.get<NotebookData>(url).pipe(
      tap(_ => this.log(`fetched NotebookData id=${id}`)),
      catchError(this.handleError<NotebookData>(`NotebookData id=${id}`))
    );
  }

  getNote(id: number): Observable<NotebookData> {
    // console.log("note id in Get Note = "+id)
    const url = `${this.notebooksUrl}/${id}`;
    return this.http.get<NotebookData>(url).pipe(
      tap(_ => this.log(`fetched note id=${id}`)),
      catchError(this.handleError<NotebookData>(`NotebookData id=${id}`))
      
    );
   
  }

  addNotebook (notebook: NotebookData): Observable<NotebookData> {
    return this.http.post<NotebookData>(this.notebooksUrl, notebook, this.httpOptions).pipe(
      tap((newMote: NotebookData) => this.log(`added Note w/ id=${newMote.id}`)),
      catchError(this.handleError<NotebookData>('addNote'))
    );
  }

  deleteNotebook (notebook: NotebookData | number): Observable<NotebookData> {
    const id = typeof notebook === 'number' ? notebook : notebook.id;
    const url = `${this.notebooksUrl}/${id}`;

    return this.http.delete<NotebookData>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted note id=${id}`)),
      catchError(this.handleError<NotebookData>('deleteNote'))
    );
  }

  deleteNote (notebook: Notedata | number): Observable<Notedata> {
    const id = typeof notebook === 'number' ? notebook : notebook.id;
  
    const url = `${this.notebooksUrl}/${id}`;

    return this.http.delete<NotebookData>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted note id=${id}`)),
      catchError(this.handleError<NotebookData>('deleteNote'))
    );
  }

  updateNotebook (notebook: NotebookData): Observable<any> {
    return this.http.put(this.notebooksUrl, notebook, this.httpOptions).pipe(
      tap(_ => this.log(`updated note id=${notebook.id}`)),
      catchError(this.handleError<any>('updateNotebook'))
    );
  }

  private log(message: string) {
    this.messageService.add(`NotebookService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } 

}