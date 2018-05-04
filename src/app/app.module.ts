import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {GraphRendererComponent} from './graph-renderer-component/graph-renderer.component';
import {ModalFormComponent} from './modal-form/modal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphRendererComponent,
    ModalFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
