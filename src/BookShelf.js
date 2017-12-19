import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    originalBooks: PropTypes.array.isRequired,
    bookShelves: PropTypes.array.isRequired,
    booksOnShelf: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    shelfName: PropTypes.string.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {originalBooks, bookShelves, booksOnShelf, shelfTitle, shelfName, onChangeBookShelf} = this.props;

    return (
      <div className={`bookShelf ${shelfName}`}>
        <h4 className="bookShelfTitle">{shelfTitle}</h4>
        <div className="row">
          {booksOnShelf.map(book => (
              <Book
                key={book.id}
                originalBooks={originalBooks}
                bookShelves={bookShelves}
                bookOnShelf={book}
                onChangeShelf={onChangeBookShelf}
              />
          ))}
        </div>
      </div>
    )
  }
}

export default BookShelf;
