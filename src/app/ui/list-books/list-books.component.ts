import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';

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
import { getPLPaginatorIntl } from './paginator-translate';

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
export class ListBooksComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private _bookService: BooksService = inject(BooksService);

  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['title', 'author', 'releaseDate', 'actions'];

  ngOnInit(): void {
    this._bookService.getBooks().subscribe((books) => {
      this.dataSource.data = books;
      this.dataSource.data = books.map((book, index) => ({
        ...book,
        id: index,
      }));
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  removeBook(index: number): void {
    this._bookService.removeBook(index);
    this._bookService.openSnackBar('Usunięto książkę!');
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
