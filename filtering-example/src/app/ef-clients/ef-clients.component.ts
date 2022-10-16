import { Component, OnInit } from '@angular/core';
import { IPaginationQuery, ITabColumn } from 'lta-component-library';
import { combineLatest, map } from 'rxjs';
import { fields, GetCustomerDto } from './ef-clients.interfaces';
import { EfClientsService } from './ef-clients.service';
import { PolishPaginationTranslation } from './translation/translation';

@Component({
  selector: 'ef-clients',
  templateUrl: './ef-clients.component.html',
  styleUrls: ['./ef-clients.component.scss'],
})
export class EfClientsComponent implements OnInit {
  pagingSTranslation: PolishPaginationTranslation;

  defaultColWidth = { width: '150px' };

  vm$ = combineLatest([
    this.clientsService.clients$,
    this.clientsService.search$,
    this.clientsService.metadata$,
  ]).pipe(
    map(([clients, search, metadata]) => {
      const f = fields<GetCustomerDto>();

      return {
        clients,
        search,
        metadata,
        config: {
          showFilter: false,
          columns: [
            {
              name: f.id,
              filterColumn: false,
              filter: { values: [''] },
            },
            {
              name: f.firstName,
              filterColumn: true,
              filter: { values: [''] },
              style: { width: '200px' },
            },
            {
              name: f.lastName,
              filterColumn: true,
              filter: { values: [''] },
            },
            { name: f.gender, filterColumn: true, filter: { values: [''] } },
            { name: f.city, filterColumn: true, filter: { values: [''] } },
            { name: f.address, filterColumn: true, filter: { values: [''] } },
          ] as ITabColumn<GetCustomerDto>[],
        },
      };
    })
  );

  constructor(private clientsService: EfClientsService) {
    this.pagingSTranslation = new PolishPaginationTranslation();
  }

  ngOnInit(): void {}

  filterChangedHandler(find: ITabColumn<GetCustomerDto>[]) {
    this.doSearch(find.filter((x) => x.filterColumn));
  }

  doSearch(find: ITabColumn<GetCustomerDto>[]) {
    this.clientsService.onSerching(find);
  }

  pageChanged(pagination: IPaginationQuery) {
    this.clientsService.onPaging(pagination.currentPage, pagination.pageSize);
  }
}
