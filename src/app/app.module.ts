import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ModalFormComponentComponent} from './modal-form-component/modal-form-component.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {JsonSchemaFormModule} from 'angular4-json-schema-form';
import {GraphRendererComponent} from 'app/graph-renderer-component/graph-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphRendererComponent,
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
