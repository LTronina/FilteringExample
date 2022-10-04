import { IPaginationQuery } from 'lta-component-library';
import { GetResponse } from '../shared/interfaces';


export interface IGetCustomerQuery extends IPaginationQuery {
  sortingParams?: { [name: string]: string };
  filter?: string;
}

export interface GetCustomerResponse
  extends GetResponse<GetCustomerDto> {}

export interface GetCustomerDto {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  start: Date;
  end: Date;
}
