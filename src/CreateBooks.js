import React,  { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI';

class CreateBooks extends Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll().then( ( books ) => { this.setState( { books } ) } );
  }

  /*static propTypes = {

  }*/

  render () {
    let { books } = this.state;

    let bookShelvesSet = new Set();
    books.map( ( book ) => bookShelvesSet.add( book.shelf ) ); // Get bookshelves for each book and map them to a set
    let bookShelves = [ ...bookShelvesSet ]; // Convert the set to an array

    return (
      <section className="books">
        <div className="container">
          { bookShelves.map( ( shelf ) => (
            <div key={ shelf } className={ `bookShelf ${ shelf }` }>
              <h4 className="bookShelfTitle">{ shelf.replace(/([A-Z])/g, ' $1') }</h4>
              <div className="row">
                { books.filter( book => book.shelf === shelf ).map( ( book ) => (
                  <Book
                    key={ book.id }
                    bookTitle={ book.title }
                    bookImageLinksThumbnail={ book.imageLinks.thumbnail }
                    bookPublisher={ book.publisher }
                    bookPublishedDate={ book.publishedDate }
                    bookDescription={ book.description }
                    bookAuthors={ book.authors }
                    bookShelf={ shelf }
                    bookShelves={ bookShelves }
                    currentBook={ book }
                    onChangeShelf={ ( book, shelf ) => {
                      BooksAPI.update( book, shelf ).then( _ => {
                        this.setState( state => ( {
                          books: state.books.filter( b => b.id !== book.id ).concat( [ book ] )
                        } ) )
                      } );
                    } }
                  />
                ) ) }
              </div>
            </div>
          ) ) }
          { console.log( books ) }
        </div>
      </section>
    )
  }
}

export default CreateBooks;
