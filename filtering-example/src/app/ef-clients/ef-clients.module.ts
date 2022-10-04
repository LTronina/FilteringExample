import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EfClientsComponent } from './ef-clients.component';

import { ClientsListComponent } from './clients-list/clients-list.component';



@NgModule({
  declarations: [
    EfClientsComponent,

    ClientsListComponent
  ],
  imports: [
    CommonModule
  ]
  ,exports:[EfClientsComponent]
})
export class EfClientsModule { }
