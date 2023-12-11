import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';

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

@Component({
  selector: 'app-list-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatPaginatorIntl, useValue: getPLPaginatorIntl() }],
  imports: [
    NgForOf,
    AsyncPipe,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
  ],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss',
})
export class ListBooksComponent {
  private bookService: BooksService = inject(BooksService);

  dataSource = new MatTableDataSource<Book>();

  //books$: Observable<Book[]> = this.bookService.getBooks();
  /* books$: any = this.bookService.getBooks().subscribe((books) => {
    this.dataSource.data = books;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }); */

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['title', 'author', 'releaseDate', 'actions'];

  /* 
 private dataSource = new MatTableDataSource<Book>();

thingsAsMatTableDataSource$: Observable<MatTableDataSource<Book>> =
    this.bookService.getBooks().pipe(
      map((things) => {
        const dataSource = this.dataSource;
        dataSource.data = things;
        return dataSource;
      })
    );

    */

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.dataSource.data = books;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  removeBook(index: number): void {
    this.bookService.removeBook(index);
    this.bookService.openSnackBar('Usunięto książkę!');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
