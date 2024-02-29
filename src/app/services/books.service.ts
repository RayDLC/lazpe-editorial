import { Injectable, computed, effect, signal } from '@angular/core';
import { Library } from '../shared/interfaces/Books.interface';
import { LIBRARY_BOOKS } from '../shared/constants';

@Injectable({providedIn: 'root'})
export class BooksService {
    
    constructor() { 
        effect(() => {
            (this.lstUnreadBooks());
            localStorage.setItem('unread_books', JSON.stringify(this.lstUnreadBooks()))
        })

        effect(() => {
            (this.lstReadedBooks());
            localStorage.setItem('readed_books', JSON.stringify(this.lstReadedBooks()))
        })

        effect(() => {
            (this.actual_path());
            localStorage.setItem('last_path', this.actual_path());
        })
    }

    public actual_path = signal<string>(localStorage.getItem('last_path') || 'explorar');

    public lstBooks = signal<Library[]>(LIBRARY_BOOKS);
    public lstUnreadBooks = signal<Library[]>(JSON.parse(localStorage.getItem('unread_books')!) || []);
    public lstReadedBooks = signal<Library[]>(JSON.parse(localStorage.getItem('readed_books')!) || []);
    public actualBook = signal<Library | null>(null);

    public checkUnreadBook = computed<boolean>(() => 
        this.lstUnreadBooks().some(({ book: { title } }) => title === this.actualBook()?.book.title));
    
    public checkReadedBook = computed<boolean>(() => 
        this.lstReadedBooks().some(({ book: { title } }) => title === this.actualBook()?.book.title));

    handleUnreadBook = (item?: Library):void => {
        (this.checkReadedBook()) && this.deleteFromReadedBooks(item);
        if (this.checkUnreadBook()) return this.deleteFromUnreadBooks(item);
        else this.lstUnreadBooks.update( v => [...v, (this.actualBook() || item!)]);
    };

    handleReadedBook = (item?: Library):void => {
        (this.checkUnreadBook()) && this.deleteFromUnreadBooks(item);
        if (this.checkReadedBook()) return this.deleteFromReadedBooks(item)
        else this.lstReadedBooks.update( v => [...v, (this.actualBook() || item!)]);
    };

    deleteFromUnreadBooks = (item?: Library):void => 
        this.lstUnreadBooks.set(this.lstUnreadBooks().filter(({ book: { title } }) => title !== (this.actualBook()?.book.title || item?.book.title)));

    deleteFromReadedBooks = (item?: Library):void => 
        this.lstReadedBooks.set(this.lstReadedBooks().filter(({ book: { title } }) => title !== (this.actualBook()?.book.title || item?.book.title)));
}