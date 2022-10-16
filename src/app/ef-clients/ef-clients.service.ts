import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import {
  DEFAULT_LIMIT,
  DEFAULT_LIMITS,
  DEFAULT_PAGE,
  DEFAULT_SEARCH,
} from '../shared/constants';
import { GetCustomerDto, GetCustomerResponse } from './ef-clients.interfaces';
import { IPaginationQuery, ITabColumn } from 'lta-component-library';

@Injectable({
  providedIn: 'root',
})
export class EfClientsService {
  clientsURL: string = 'http://localhost:8080/api/customers';
  private searchBS = new BehaviorSubject<ITabColumn<GetCustomerDto>[]>(
    DEFAULT_SEARCH
  );
  private pageSizeBS = new BehaviorSubject<number>(DEFAULT_LIMIT);
  private pageNoBS = new BehaviorSubject<number>(DEFAULT_PAGE);

  search$ = this.searchBS.asObservable();
  limit$ = this.pageSizeBS.asObservable();

  private params$ = combineLatest([
    this.searchBS,
    this.pageSizeBS,
    this.pageNoBS,
  ]).pipe(
    map(([query, pageSize, pageNo]) => {
      let params = new HttpParams()
        .append('Metadata.PageSize', pageSize)
        .append('Metadata.CurrentPage', pageNo);

      if (query) {
        query.forEach((element) => {
          if (
            !element.filterColumn ||
            element.filter?.values?.length === 0 ||
            element.filter.values[0] == null ||
            element.filter.values[0] == ''
          ) {
            return;
          }

          params = params.append(
            `Filtering[${element.name}]`,
            element.filter.values[0]
          );
        });
      }
      return params;
    })
  );

  private clientsResponse$ = this.params$.pipe(
    debounceTime(500),
    switchMap((_params) =>
      this.http.get<GetCustomerResponse>(this.clientsURL, {
        params: _params,
      })
    ),

    catchError((error) => {
      console.log('Error: ' + error);
      throw error;
    }),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  metadata$ = this.clientsResponse$.pipe(map((res: any) => res.metadata));

  clients$: Observable<GetCustomerDto[]> = this.clientsResponse$.pipe(
    map((res: any) => res.items)
  );

  // totalPages$ = combineLatest([this.totalResults$, this.limitBS]).pipe(
  //   map(([totalResults, limit]) => Math.ceil(totalResults / limit))
  // );

  onSerching(term: ITabColumn<GetCustomerDto>[]) {
    this.searchBS.next(term);
    this.pageNoBS.next(DEFAULT_PAGE);
  }

  onPaging(pageNo: number, size: number) {
    const maxAllowed = DEFAULT_LIMITS.reduce((a, b) => (a > b ? a : b));
    const minAllowed = DEFAULT_LIMITS.reduce((a, b) => (a < b ? a : b));

    if (size > maxAllowed) {
      size == maxAllowed;
    }

    if (size > minAllowed) {
      size == minAllowed;
    }

    this.pageNoBS.next(pageNo);
    this.pageSizeBS.next(size);
  }
}
