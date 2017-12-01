import React,  { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {
  render () {
    const { title, books, bookShelf } = this.props;

    return (
      <div className={ `bookShelf ${ bookShelf }` }>
        <h4 className="bookShelfTitle">{ title.replace(/([A-Z])/g, ' $1') }</h4>
        <div className="row">
          { books.filter( ( book ) => book.shelf === bookShelf ).map( ( book ) => (
            <Book
              key={ book.id }
              bookTitle={ book.title }
              bookAuthors={ book.authors }
              bookImageLinksThumbnail={ book.imageLinks.thumbnail }
              bookPublisher={ book.publisher }
              bookPublishedDate={ book.publishedDate }
            />
          ) ) }
        </div>
      </div>
    )
  }
}

export default BookShelf;
