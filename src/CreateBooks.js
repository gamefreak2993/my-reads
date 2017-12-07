import React,  { Component } from 'react';
import BookShelf from './BookShelf'
import * as BooksAPI from './utils/BooksAPI';

class CreateBooks extends Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll().then( ( books ) => {
      this.setState( { books: books } );
    } );
  }

  changeShelf = ( book, shelf ) => {
    BooksAPI.update( book, shelf ).then( _ => {
      BooksAPI.getAll().then( books => {
        this.setState( { books: books } );
      } )
    } );
  }

  render () {
    let { books } = this.state;

    return (
      <section className="books">
        <div className="container">
          <BookShelf
            booksOnShelf={ books.filter( book => book.shelf === 'currentlyReading' ) }
            shelfTitle={ 'Currently Reading' }
            shelfName={ 'currentlyReading' }
            onChangeBookShelf={ ( book, shelf ) => this.changeShelf( book, shelf ) }
          />

          <BookShelf
            booksOnShelf={ books.filter( book => book.shelf === 'wantToRead' ) }
            shelfTitle={ 'Want To Read' }
            shelfName={ 'wantToRead' }
            onChangeBookShelf={ ( book, shelf ) => this.changeShelf( book, shelf ) }
          />

          <BookShelf
            booksOnShelf={ books.filter( book => book.shelf === 'read' ) }
            shelfTitle={ 'Read' }
            shelfName={ 'read' }
            onChangeBookShelf={ ( book, shelf ) => this.changeShelf( book, shelf ) }
          />
        </div>
      </section>
    )
  }
}

export default CreateBooks;
