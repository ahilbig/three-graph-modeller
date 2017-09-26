import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GraphModelComponent } from './graph-model/graph-model.component';
import { GraphRendererComponent } from './graph-renderer/graph-renderer.component';
import { GraphControlComponentComponent } from './graph-control-component/graph-control-component.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphModelComponent,
    GraphRendererComponent,
    GraphControlComponentComponent
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
