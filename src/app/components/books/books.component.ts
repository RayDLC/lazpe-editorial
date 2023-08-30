import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LIBRARY_BOOKS } from 'src/app/shared/constants';
import { Book, Library } from 'src/app/shared/interfaces/Books.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { BooksService } from 'src/app/services/books.service';
import { UnreadedBooksComponent } from '../unreaded-books/unreaded-books.component';
import { ReadedBooksComponent } from '../readed-books/readed-books.component';
import { SvgUnreaBookComponent } from '../svg-unread-book.component';
import { SvgReadBookComponent } from '../svg-read-book.component';
import { SvgFilterComponent } from '../svg-filter.component';
import { SvgFavoriteComponent } from '../svg-favorite.component';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    UnreadedBooksComponent,
    ReadedBooksComponent,
    SvgUnreaBookComponent,
    SvgReadBookComponent,
    SvgFilterComponent,
    SvgFavoriteComponent
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export default class BooksComponent {

  private serviceBooks = inject(BooksService);

  constructor() {
  }
  
  public initialLengthBooks = signal<number>(LIBRARY_BOOKS.length || 0);
  public filtroValue = new FormControl('');
  public lstBooks = computed(() => this.serviceBooks.lstBooks());
  public lstReadedBooks = computed(() => this.serviceBooks.lstReadedBooks());
  public lstUnreadBooks = computed(() => this.serviceBooks.lstUnreadBooks());
  public actualBook = computed(() => this.serviceBooks.actualBook());

  public checkUnreadBook = computed(() => this.serviceBooks.checkUnreadBook());
  public checkReadedBook = computed(() => this.serviceBooks.checkReadedBook());
  
  filtrarLibros = ():void => 
    this.serviceBooks.lstBooks.set(LIBRARY_BOOKS.filter(({ book: { genre } }) => genre.includes(this.filtroValue.value!)));

  viewBookDetails = (book: Book):void => 
    this.serviceBooks.actualBook.set({book});

  closeBookDetails = ():void => this.serviceBooks.actualBook.set(null);

  handleUnreadBook = ():void => this.serviceBooks.handleUnreadBook();

  handleReadedBook = ():void => this.serviceBooks.handleReadedBook();

}
