import React,  { Component } from 'react';
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI';

class BookShelf extends Component {
  state = {
      currentBookShelf: this.props.bookShelf
  }

  render () {
    const { title, books, bookShelf, bookShelves } = this.props;

    return (
      <div className={ `bookShelf ${ bookShelf }` }>
        <h4 className="bookShelfTitle">{ title.replace(/([A-Z])/g, ' $1') }</h4>
        <div className="row">
          { books.filter( ( book ) => book.shelf === bookShelf ).map( ( book ) => (
            <Book
              key={ book.id }
              bookTitle={ book.title }
              bookImageLinksThumbnail={ book.imageLinks.thumbnail }
              bookPublisher={ book.publisher }
              bookPublishedDate={ book.publishedDate }
              bookDescription={ book.description }
              bookAuthors={ book.authors }
              bookShelf={ bookShelf }
              bookShelves={ bookShelves }
              currentBook={ book }
              onChangeShelf={ ( book, shelf ) => {
                BooksAPI.update( book, shelf ).then( /*( book, shelf ) => {
                  this.setState( () => ( {

                  } ) )
                }*/ );
              } }
            />
          ) ) }
        </div>
      </div>
    )
  }
}

export default BookShelf;
