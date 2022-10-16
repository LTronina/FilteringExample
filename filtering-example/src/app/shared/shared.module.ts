import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  SrvFilteringModule,
  SrvPaginationModule,
  SrvSortingModule,
} from 'lta-component-library';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    SrvSortingModule,
    SrvPaginationModule,
    SrvFilteringModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    SrvSortingModule,
    SrvPaginationModule,
    SrvFilteringModule,
  ],
})
export class SharedModule {}
