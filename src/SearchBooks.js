import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    styles: PropTypes.object.isRequired,
    bookShelves: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired
  }

  updateQuery = event => {
    const newQuery = event.target.value;
    this.props.onUpdateQuery(newQuery);
  }

  render() {
    const {styles, bookShelves, onChangeBookShelf, searchQuery} = this.props;
    let {searchedBooks} = this.props;

    return (
      <div id="searchBooks">
        <section className="search">
          <div className="container">
            <div className="row">
              <div className="col">
                <input
                  className="searchBooks form-control"
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
            <div className="bookShelfContainer" style={{opacity: styles.bookShelfOpacity, top: styles.bookShelfPositionTop}}>
              <BookShelf
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
