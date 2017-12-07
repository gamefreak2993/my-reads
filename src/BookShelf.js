import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    shelfName: PropTypes.string.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

  render() {
    let {booksOnShelf, shelfTitle, shelfName, onChangeBookShelf} = this.props;

    return (
      <div className={`bookShelf ${shelfName}`}>
        <h4 className="bookShelfTitle">{shelfTitle}</h4>
        <div className="row">
          {booksOnShelf.map(book => (<Book key={book.id} bookOnShelf={book} onChangeShelf={onChangeBookShelf}/>))}
        </div>
      </div>
    )
  }
}

export default BookShelf;
