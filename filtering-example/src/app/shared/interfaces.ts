import {
  IPaginationQuery,
  ISrvPaginationResponse,
} from 'lta-component-library';

export interface GetResponse<T> {
  metadata: ISrvPaginationResponse;
  items: T[];
}
