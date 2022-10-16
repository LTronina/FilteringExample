import { IPaginationQuery, PaginationTranslation } from 'lta-component-library';

export class PolishPaginationTranslation extends PaginationTranslation {
  constructor() {
    super();
    this.pageInputTooltip = 'Wpisz wartość i naciśnij Enter';
    this.pageSizeLabel = 'Rozmiar strony';
  }
}
