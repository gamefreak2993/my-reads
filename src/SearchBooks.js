import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import BookShelf from './BookShelf';

class SearchBooks extends Component {
  state = {
    searchQuery: ''
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    styles: PropTypes.object.isRequired,
    bookShelves: PropTypes.array.isRequired
  }

  updateQuery = query => {
    this.setState({
      searchQuery: query.trim()
    });
  }

  render() {
    const {books, styles, bookShelves, onChangeBookShelf} = this.props;
    const {searchQuery} = this.state;

    let searchedBooks;

    if (searchQuery) {
      const match = new RegExp(escapeRegExp(searchQuery), 'i');
      searchedBooks = books.filter(book => match.test(book.title));
    } else {
      searchedBooks = books;
    }

    return (
      <div id="searchBooks">
        <section className="search">
          <div className="container">
            <input
              className="searchBooks form-control"
              type="text"
              placeholder="Search Books"
              value={searchQuery}
              onChange={event => this.updateQuery(event.target.value)}
              style={{opacity: styles.searchBooksInputOpacity}}
            />
          </div>
        </section>

        <section className="books">
          <div className="container">
            {bookShelves.map((bookShelf, index) => (
              <div className="bookShelfContainer" key={bookShelf} style={{opacity: styles.bookShelfOpacity, top: styles.bookShelfPositionTop, transitionDelay: `${index/2}s`}}>
                <BookShelf
                  bookShelves={bookShelves}
                  booksOnShelf={searchedBooks.filter(book => book.shelf === bookShelf)}
                  shelfTitle={bookShelf.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  shelfName={bookShelf}
                  onChangeBookShelf={onChangeBookShelf}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
}

export default SearchBooks;
