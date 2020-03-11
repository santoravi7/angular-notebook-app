import { Injectable } from '@angular/core';

import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Notedata } from './notedata';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn : 'root',
})

export class NoteService {

  private notesUrl = "api/notes";
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http : HttpClient,
    private messageService: MessageService
  ) { }

  getNote(id: number): Observable<Notedata> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Notedata>(url).pipe(
      tap(_ => this.log(`fetched Notedata id=${id}`)),
      catchError(this.handleError<Notedata>(`Notedata id=${id}`))
    );
  }

  addNote (note: Notedata): Observable<Notedata> {
    console.log("addNote method --- "+note);
    return this.http.post<Notedata>(this.notesUrl, note, this.httpOptions).pipe(
      tap((newMote: Notedata) => this.log(`added Note w/ id=${newMote.id}`)),
      catchError(this.handleError<Notedata>('addNote'))
    );
     console.log("addNote method --- "+note);
  }

  private log(message: string) {
    this.messageService.add(`NoteService: ${message}`);
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