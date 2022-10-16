import { NgModule } from '@angular/core';

import { EfClientsComponent } from './ef-clients.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EfClientsComponent],
  imports: [SharedModule],
  exports: [EfClientsComponent],
})
export class EfClientsModule {}
