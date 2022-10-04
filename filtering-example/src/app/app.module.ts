import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EfClientsModule } from './ef-clients/ef-clients.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,EfClientsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
