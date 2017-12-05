import React,  { Component } from 'react';
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI';

class BookShelf extends Component {
  state = {
    books: this.props.books
  }

  render () {
    const { title, bookShelf, bookShelves } = this.props;
    let { books } = this.state;

    return (
      <div className={ `bookShelf ${ bookShelf }` }>
        <h4 className="bookShelfTitle">{ title.replace(/([A-Z])/g, ' $1') }</h4>
        <div className="row">
          { books.filter( book => book.shelf === bookShelf ).map( ( book ) => (
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
              onChangeShelf={ ( book, shelf, bookId ) => {
                BooksAPI.update( book, shelf ).then( bookId => {
                  this.setState( state => ( {
                    books: state.books.map( book => book ).filter( book => book.id === bookId )
                  } ) )
                } );
              } }
            />
          ) ) }
          { console.log( this.state.books ) }
        </div>
      </div>
    )
  }
}

export default BookShelf;
