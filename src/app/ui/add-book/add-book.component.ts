import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  private bookService: BooksService = inject(BooksService);

  addBook(data: Book): void {
    this.bookService.addBook(data);
  }
}
