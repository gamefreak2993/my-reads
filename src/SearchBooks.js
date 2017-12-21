import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    styles: PropTypes.object.isRequired,
    bookShelves: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    searchedBooks: PropTypes.array.isRequired,
    onUpdateQuery: PropTypes.func.isRequired
  }

  updateQuery = event => {
    const newQuery = event.target.value;
    this.props.onUpdateQuery(newQuery);
  }

  render() {
    const {books, styles, bookShelves, onChangeBookShelf, searchQuery, searchedBooks} = this.props;

    return (
      <div id="search-books">
        <section className="search">
          <div className="container">
            <div className="row">
              <div className="col">
                <input
                  className="search-books form-control"
                  type="text"
                  placeholder="Search Books"
                  value={searchQuery}
                  onChange={this.updateQuery}
                  style={{opacity: styles.searchBooksInputOpacity}}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="books">
          <div className="container">
            <div className="book-shelf-container" style={{opacity: styles.bookShelfOpacity, top: styles.bookShelfPositionTop}}>
              <BookShelf
                originalBooks={books}
                bookShelves={bookShelves}
                booksOnShelf={searchedBooks}
                shelfTitle={'SEARCHED BOOKS'}
                shelfName={'searchedBooks'}
                onChangeBookShelf={onChangeBookShelf}
              />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default SearchBooks;
