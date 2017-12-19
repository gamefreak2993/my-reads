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
    String.prototype.truncate = String.prototype.truncate || function(n) {
      return (this.length > n)
        ? this.substr(0, n - 1) + '...'
        : this;
    };

    originalBooks.map(originalBook => {
      if (originalBook.id === bookOnShelf.id) {
        searchedBookShelf = originalBook.shelf;
      }
    });

    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 bookContainer">
        <div className="book">
          <div className="thumbnail container">
            <div className="header row">
              <h6 className="bookTitle col">{bookOnShelf.title}</h6>
            </div>

            <div className="bookImage d-flex">
              <img className="align-self-center" src={bookOnShelf.imageLinks ? bookOnShelf.imageLinks.thumbnail : 'http://via.placeholder.com/128x128?text=No+Cover+Image'} title={bookOnShelf.title} alt={bookOnShelf.title}/>
            </div>

            <div className="footer row">
              <div className="publisher col">{bookOnShelf.publisher}</div>
              <div className="publishedDate col-auto">{bookOnShelf.publishedDate ? bookOnShelf.publishedDate.replace(/-/g, '/') : ''}</div>
            </div>
          </div>
          <div className="overlay container">
            <div className="description row">
              <p className="col">{bookOnShelf.description ? bookOnShelf.description.truncate(250) : 'No description provided.'}</p>
            </div>

            <h6 className="shelfLabel">Assigned Shelf</h6>

            <select onChange={this.handleChange}>
              <option value={bookOnShelf.shelf ? bookOnShelf.shelf : searchedBookShelf}>{bookOnShelf.shelf ? bookOnShelf.shelf.replace(/([A-Z])/g, ' $1').toUpperCase() : searchedBookShelf.replace(/([A-Z])/g, ' $1').toUpperCase()}</option>
              {bookShelves.filter(shelf => (shelf !== bookOnShelf.shelf) && (shelf !== searchedBookShelf)).map(shelf => (<option key={shelf} value={shelf}>{shelf.replace(/([A-Z])/g, ' $1').toUpperCase()}</option>))}
            </select>

            <div className="extra row">
              <ul className="bookAuthors col">
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
