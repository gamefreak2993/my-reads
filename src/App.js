import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import $ from 'jquery';
import * as BooksAPI from './utils/BooksAPI';
import Header from './Header';
import CreateBooks from './CreateBooks';
import SearchBooks from './SearchBooks';

class App extends Component {
  state = {
    books: [],
    searchQuery: '',
    searchedBooks: [],
    styles: {
      bookShelfOpacity: '0',
      bookShelfPositionTop: '15px',
      bookOpacity: '1',
      searchBooksInputOpacity: '0'
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books,
        styles: {
          bookShelfOpacity: '1',
          bookShelfPositionTop: '0px',
          searchBooksInputOpacity: '1'
        }
      });
    });

    $(document).ready(_ => {
        const styleWrapper = _ => {
          const $header = $('header');
          const $wrapper = $('.wrapper');

          $wrapper.css({
            'padding-top': `${$header.outerHeight()}px`
          });
        }

        styleWrapper();

        $(window).resize(_ => {
          styleWrapper();
        });
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(_ => {
      BooksAPI.getAll().then(books => {
        this.setState({
          books: books
        });
      });
    });
  }

  updateQuery = query => {
    this.setState({
      searchQuery: query
    });

    if (query) {
      BooksAPI.search(query).then(b => {
        if (b.error) {
          this.setState({
            searchedBooks: []
          });
        } else {
          this.setState({
            searchedBooks: b
          });
        }
      });
    } else {
      this.setState({
        searchedBooks: []
      });
    }
  }

  clearQuery = _ => {
    this.setState({
      searchQuery: '',
      searchedBooks: []
    });
  }

  render() {
    const {books, searchQuery, searchedBooks, styles} = this.state;
    const bookShelves = ['currentlyReading', 'wantToRead', 'read'];

    return (
      <div className="myReadsApp">
        <Header/>

        <div className="wrapper">
          <Route exact path="/" render={_ => (
            <CreateBooks
              books={books}
              styles={styles}
              bookShelves={bookShelves}
              onChangeBookShelf={(book, shelf) => this.changeShelf(book, shelf)}
            />
          )}/>
          <Route path="/search" render={({history}) => (
            <SearchBooks
              books={books}
              styles={styles}
              bookShelves={bookShelves}
              onChangeBookShelf={(book, shelf) => {
                this.changeShelf(book, shelf);
                history.push('/');
                this.clearQuery();
              }}
              searchQuery={searchQuery}
              searchedBooks={searchedBooks}
              onUpdateQuery={query => this.updateQuery(query)}
            />
          )}/>
        </div>
      </div>
    );
  }
}

export default App;
