import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  DateAdapter,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { Book } from '../../models/book.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-book',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  private bookService: BooksService = inject(BooksService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    releaseDate: ['', Validators.required],
  });

  formSubmit(): void {
    if (this.bookForm.valid) {
      this.bookForm.value.releaseDate._d.setUTCHours(0, 0, 0, 0);
      const formattedBook = {
        ...this.bookForm.value,
        releaseDate:
          this.bookForm.value.releaseDate.toISOString().split('.')[0] + 'Z',
      };
      this.bookService.addBook(formattedBook);
      this.router.navigate(['/books']);
    }
  }
}
