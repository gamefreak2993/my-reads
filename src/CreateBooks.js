import React,  { Component } from 'react';
// import PropTypes from 'prop-types';
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI';

class CreateBooks extends Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount () {
    BooksAPI.getAll().then( ( books ) => {
      this.setState( _ => ( {
        books: books,
        shelves: {
          currentlyReading: books.filter( book => book.shelf === 'currentlyReading' ),
          wantToRead: books.filter( book => book.shelf === 'wantToRead' ),
          read: books.filter( book => book.shelf === 'read' )
        }
      } ) );
    } );

  }

  /*static propTypes = {

  }*/

  render () {
    let { shelves } = this.state;
    let { currentlyReading, wantToRead, read } = this.state.shelves;
    const shelvesArray = Object.keys( shelves );

    return (
      <section className="books">
        <div className="container">
          <div className={ "bookShelf" }>
            <h4 className="bookShelfTitle">Currently reading</h4>
            <div className="row">
              { currentlyReading.map( book => (
                <Book
                  key={ book.id }
                  bookTitle={ book.title }
                  bookImageLinksThumbnail={ book.imageLinks.thumbnail }
                  bookPublisher={ book.publisher }
                  bookPublishedDate={ book.publishedDate }
                  bookDescription={ book.description }
                  bookAuthors={ book.authors }
                  bookShelf={ 'currentlyReading' }
                  bookShelves={ shelvesArray }
                  currentBook={ book }
                  onChangeShelf={ ( book, shelf ) => {
                    BooksAPI.update( book, shelf ).then( _ => {
                      this.setState( state => ( {
                        books: state.books,
                        shelves: {
                          currentlyReading: state.shelves.currentlyReading.filter( b => b.id !== book.id ),
                          wantToRead: shelf === 'wantToRead' ? state.shelves.wantToRead.concat( book ) : state.shelves.wantToRead,
                          read: shelf === 'read' ? state.shelves.read.concat( book ) : state.shelves.read
                        }
                      } ) );
                      console.log( shelf === 'currentlyReading' ? book : 'nothing' );
                    } );
                  } }
                />
              ) ) }
            </div>
          </div>

          <div className={ "bookShelf" }>
            <h4 className="bookShelfTitle">Want to read</h4>
            <div className="row">
              { wantToRead.map( book => (
                <Book
                  key={ book.id }
                  bookTitle={ book.title }
                  bookImageLinksThumbnail={ book.imageLinks.thumbnail }
                  bookPublisher={ book.publisher }
                  bookPublishedDate={ book.publishedDate }
                  bookDescription={ book.description }
                  bookAuthors={ book.authors }
                  bookShelf={ 'wantToRead' }
                  bookShelves={ shelvesArray }
                  currentBook={ book }
                  onChangeShelf={ ( book, shelf ) => {
                    BooksAPI.update( book, shelf ).then( _ => {
                      this.setState( state => ( {
                        books: state.books,
                        shelves: {
                          currentlyReading: shelf === 'currentlyReading' ? state.shelves.currentlyReading.concat( book ) : state.shelves.currentlyReading,
                          wantToRead: state.shelves.wantToRead.filter( b => b.id !== book.id ),
                          read: shelf === 'read' ? state.shelves.read.concat( book ) : state.shelves.read
                        }
                      } ) );
                      console.log( shelf === 'wantToRead' ? book : 'nothing' );
                    } );
                  } }
                />
              ) ) }
            </div>
          </div>

          <div className={ "bookShelf" }>
            <h4 className="bookShelfTitle">read</h4>
            <div className="row">
              { read.map( book => (
                <Book
                  key={ book.id }
                  bookTitle={ book.title }
                  bookImageLinksThumbnail={ book.imageLinks.thumbnail }
                  bookPublisher={ book.publisher }
                  bookPublishedDate={ book.publishedDate }
                  bookDescription={ book.description }
                  bookAuthors={ book.authors }
                  bookShelf={ 'read' }
                  bookShelves={ shelvesArray }
                  currentBook={ book }
                  onChangeShelf={ ( book, shelf ) => {
                    BooksAPI.update( book, shelf ).then( _ => {
                      this.setState( state => ( {
                        books: state.books,
                        shelves: {
                          currentlyReading: shelf === 'currentlyReading' ? state.shelves.currentlyReading.concat( book ) : state.shelves.currentlyReading,
                          wantToRead: shelf === 'wantToRead' ? state.shelves.wantToRead.concat( book ) : state.shelves.wantToRead,
                          read: state.shelves.read.filter( b => b.id !== book.id )
                        }
                      } ) );
                      console.log( shelf === 'read' ? book : 'nothing' );
                    } );
                  } }
                />
              ) ) }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CreateBooks;
