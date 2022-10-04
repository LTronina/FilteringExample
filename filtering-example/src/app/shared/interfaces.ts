import {
  ISrvPaginationResponse,
} from 'lta-component-library/public-api';

export interface GetResponse<T> {
  metadata: ISrvPaginationResponse;
  items: T[];
}
