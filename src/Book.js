import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    originalBooks: PropTypes.array.isRequired,
    bookShelves: PropTypes.array.isRequired,
    bookOnShelf: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  handleChange = event => {
    const newShelf = event.target.value;
    this.props.onChangeShelf(this.props.bookOnShelf, newShelf);
  }

  render() {
    const {originalBooks, bookShelves, bookOnShelf} = this.props;
    let searchedBookShelf = 'none';
    // Truncate for bookDescription
    const truncate = (text, length) => {
      return (text.length > length)
        ? text.substr(0, length - 1) + '...'
        : text;
    }
    // If the searched book is already assigned a shelf on the main page, assign it on the search page.
    originalBooks.filter(originalBook => originalBook.id === bookOnShelf.id).map(originalBook => {
      searchedBookShelf = originalBook.shelf;
      return null; // This is to avoid console warning of an arrow function not returning anything.
    });

    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 book-container">
        <div className="book">
          <div className="thumbnail container">
            <div className="header row">
              <h6 className="book-title col">{bookOnShelf.title}</h6>
            </div>

            <div className="book-image d-flex">
              <img className="align-self-center" src={bookOnShelf.imageLinks ? bookOnShelf.imageLinks.thumbnail : 'http://via.placeholder.com/128x128?text=No+Cover+Image'} title={bookOnShelf.title} alt={bookOnShelf.title}/>
            </div>

            <div className="footer row">
              <div className="publisher col">{bookOnShelf.publisher}</div>
              <div className="published-date col-auto">{bookOnShelf.publishedDate ? bookOnShelf.publishedDate.replace(/-/g, '/') : ''}</div>
            </div>
          </div>
          <div className="overlay container">
            <div className="description row">
              <p className="col">{bookOnShelf.description ? truncate(bookOnShelf.description, 250) : 'No description provided.'}</p>
            </div>

            <h6 className="shelf-label">Assigned Shelf</h6>

            <select onChange={this.handleChange}>
              <option value={bookOnShelf.shelf ? bookOnShelf.shelf : searchedBookShelf}>{bookOnShelf.shelf ? bookOnShelf.shelf.replace(/([A-Z])/g, ' $1').toUpperCase() : searchedBookShelf.replace(/([A-Z])/g, ' $1').toUpperCase()}</option>
              {bookShelves.filter(shelf => (shelf !== bookOnShelf.shelf) && (shelf !== searchedBookShelf)).map(shelf => (<option key={shelf} value={shelf}>{shelf.replace(/([A-Z])/g, ' $1').toUpperCase()}</option>))}
            </select>

            <div className="extra row">
              <ul className="book-authors col">
                {bookOnShelf.authors ? bookOnShelf.authors.map((author) => (<li key={author}>{author}</li>)) : ''}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Book;
