import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; 
import { NotebookComponent } from './notebook/notebook.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListNotebookComponent } from './list-notebook/list-notebook.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { NotebookService } from './notebook.service';
import { MessageService } from './message.service';
import { MessageComponent } from './message/message.component'; 
import { FormsModule } from '@angular/forms';


@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [ 
    AppComponent, 
    NotebookComponent, 
    NavbarComponent, 
    ListNotebookComponent, 
    MessageComponent 
  ],
  bootstrap:    [ AppComponent ],
  providers: [InMemoryDataService,NotebookService, MessageService]
})
export class AppModule { }
