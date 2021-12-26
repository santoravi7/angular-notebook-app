import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; 
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { NotebookService } from './notebook.service';
import { MessageService } from './message.service';
import { MessageComponent } from './message/message.component'; 
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),     
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    NgbModule
  ],
  declarations: [ 
    AppComponent, 
    NavbarComponent, 
    MessageComponent, 
    ModalContentComponent,
    routingComponents
  ],
   entryComponents: [
    ModalContentComponent,
  ],
  bootstrap:    [ AppComponent ],
  providers: [InMemoryDataService,NotebookService, MessageService,
  { provide : LocationStrategy, useClass:PathLocationStrategy }]
})
export class AppModule { }
