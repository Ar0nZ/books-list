import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-add-book',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  private bookService: BooksService = inject(BooksService);
  private formBuilder = inject(FormBuilder);

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    releaseDate: [
      '',
      [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
    ],
  });

  formSubmit(): void {
    if (this.bookForm.valid) {
      const formattedBook = {
        ...this.bookForm.value,
        releaseDate: this.bookForm.value.releaseDate.toISOString(),
      };
      this.bookService.addBook(formattedBook);
    }
  }
}
