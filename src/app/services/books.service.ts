import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _books = new BehaviorSubject<Book[]>([
    {
      title: 'Wiedźmin',
      author: 'Andrzej Sapkowski',
      releaseDate: '1993-01-01T00:00:00Z',
    },
    {
      title: 'Złodziejka książek',
      author: 'Markus Zusak',
      releaseDate: '2005-01-01T00:00:00Z',
    },
    {
      title: 'Harry Potter i Kamień Filozoficzny',
      author: 'J.K. Rowling',
      releaseDate: '1997-01-01T00:00:00Z',
    },
    {
      title: '1984',
      author: 'George Orwell',
      releaseDate: '1949-01-01T00:00:00Z',
    },
  ]);

  getBooks(): Observable<Book[]> {
    return this._books.asObservable();
  }

  addBook(book: Book): void {
    const currentBooks = this._books.getValue();
    currentBooks.push(book);
    this._books.next(currentBooks);
  }

  removeBook(index: number): void {
    const currentBooks = this._books.getValue();
    currentBooks.splice(index, 1);
    this._books.next(currentBooks);
  }
}
