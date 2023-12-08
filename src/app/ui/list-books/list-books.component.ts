import { Component, inject } from '@angular/core';
import { NgForOf, AsyncPipe, DatePipe } from '@angular/common';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [NgForOf, AsyncPipe, DatePipe],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss',
})
export class ListBooksComponent {
  private bookService = inject(BooksService);

  books: Book[] = this.bookService.getBooks();
}
