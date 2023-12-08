import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books: Book[] = [
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
  ];

  getBooks(): Book[] {
    return this.books;
  }
}
