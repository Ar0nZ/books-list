import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, AsyncPipe, DatePipe],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss',
})
export class ListBooksComponent {
  private bookService: BooksService = inject(BooksService);

  books$: Observable<Book[]> = this.bookService.getBooks();

  removeBook(index: number): void {
    this.bookService.removeBook(index);
  }
}
