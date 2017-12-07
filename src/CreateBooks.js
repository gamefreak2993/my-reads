import React, {Component} from 'react';
import * as BooksAPI from './utils/BooksAPI';
import BookShelf from './BookShelf'

const bookShelfStyles = {
  transition: 'all 0.75s ease-in',
  position: 'relative'
}

class CreateBooks extends Component {
  state = {
    books: [],
    bookShelfOpacity: 0,
    bookShelfScale: 0.95,
    bookShelfPoisitionTop: 25
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
        bookShelfOpacity: 1,
        bookShelfScale: 1,
        bookShelfPoisitionTop: 0
      });
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(_ => {
      BooksAPI.getAll().then(books => {
        this.setState({
          books: books,
          bookShelfOpacity: 1,
          bookShelfScale: 1,
          bookShelfPoisitionTop: 0
        });
      })
    });
  }

  render() {
    let {books, bookShelfOpacity, bookShelfScale, bookShelfPoisitionTop} = this.state;

    const bookShelves = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <section className="books">
        <div className="container">
          {bookShelves.map((bookShelf, index) => (
            <div key={bookShelf} style={{...bookShelfStyles, top: `${bookShelfPoisitionTop}px`, opacity: bookShelfOpacity, transform: `scale(${bookShelfScale})`, transitionDelay: `${index/4}s`}}>
              <BookShelf
                bookShelves={bookShelves}
                booksOnShelf={books.filter(book => book.shelf === bookShelf)}
                shelfTitle={bookShelf.replace(/([A-Z])/g, ' $1').toUpperCase()}
                shelfName={bookShelf}
                onChangeBookShelf={(book, shelf) => this.changeShelf(book, shelf)}
              />
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default CreateBooks;
