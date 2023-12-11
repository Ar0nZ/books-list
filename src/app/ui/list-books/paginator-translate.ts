import { MatPaginatorIntl } from '@angular/material/paginator';

const PLRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 z ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} z ${length}`;
};
export function getPLPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Książek na stronę:';
  paginatorIntl.firstPageLabel = 'Pierwsza strona';
  paginatorIntl.previousPageLabel = 'Poprzednia strona';
  paginatorIntl.nextPageLabel = 'Kolejna strona';
  paginatorIntl.lastPageLabel = 'Ostatnia strona';
  paginatorIntl.getRangeLabel = PLRangeLabel;
  return paginatorIntl;
}
