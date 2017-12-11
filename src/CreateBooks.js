import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class CreateBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    styles: PropTypes.object.isRequired,
    bookShelves: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {books, styles, bookShelves, onChangeBookShelf} = this.props;

    return (
      <section className="books">
        <div className="container">
          {bookShelves.map((bookShelf, index) => (
            <div className="bookShelfContainer" key={bookShelf} style={{opacity: styles.bookShelfOpacity, top: styles.bookShelfPositionTop, transitionDelay: `${index/2}s`}}>
              <BookShelf
                bookShelves={bookShelves}
                booksOnShelf={books.filter(book => book.shelf === bookShelf)}
                shelfTitle={bookShelf.replace(/([A-Z])/g, ' $1').toUpperCase()}
                shelfName={bookShelf}
                onChangeBookShelf={onChangeBookShelf}
              />
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default CreateBooks;
