import { Injectable, inject } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _snackBar = inject(MatSnackBar);

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
    {
      title: 'Lorem ipsum111',
      author: 'Testowy',
      releaseDate: '2023-12-02T00:00:00Z',
    },
    {
      title: 'Lorem ipsum222',
      author: 'Testowy',
      releaseDate: '2023-12-02T00:00:00Z',
    },
    {
      title: 'Lorem ipsum333',
      author: 'Testowy',
      releaseDate: '2023-12-02T00:00:00Z',
    },
    {
      title: 'Lorem ipsum444',
      author: 'Testowy',
      releaseDate: '2023-12-02T00:00:00Z',
    },
    {
      title: 'Lorem ipsum555',
      author: 'Testowy',
      releaseDate: '2023-12-02T00:00:00Z',
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

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 1600,
    });
  }
}
