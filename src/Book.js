import React, {Component} from 'react';
import * as BooksAPI from './utils/BooksAPI';
import PropTypes from 'prop-types';

const bookStyle = {
  transition: 'all 0.25s ease-in'
}

class Book extends Component {
  state = {
    bookOpacity: 1
  }

  static propTypes = {
    bookShelves: PropTypes.array.isRequired,
    bookOnShelf: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  handleChange = (event) => {
    const newShelf = event.target.value;
    this.props.onChangeShelf(this.props.bookOnShelf, newShelf);

    this.setState({
      bookOpacity: 0
    });
  }

  render() {
    let {bookShelves, bookOnShelf} = this.props;
    let {bookOpacity} = this.state;

    // Truncate for bookDescription
    String.prototype.truncate = String.prototype.truncate || function(n) {
      return (this.length > n)
        ? this.substr(0, n - 1) + '...'
        : this;
    };

    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3" style={{...bookStyle, opacity: bookOpacity}}>
        <div className="book">
          <div className="thumbnail container">
            <div className="header row">
              <h6 className="bookTitle col">{bookOnShelf.title}</h6>
            </div>

            <div className="bookImage d-flex">
              <img className="align-self-center" src={bookOnShelf.imageLinks.thumbnail} title={bookOnShelf.title} alt={bookOnShelf.title}/>
            </div>

            <div className="footer row">
              <div className="publisher col">{bookOnShelf.publisher}</div>
              <div className="publishedDate col-auto">{bookOnShelf.publishedDate.replace(/-/g, '/')}</div>
            </div>
          </div>
          <div className="overlay container">
            <div className="description row">
              <p className="col">{bookOnShelf.description.truncate(300)}</p>
            </div>

            <select onChange={this.handleChange}>
              <option value={bookOnShelf.shelf}>{bookOnShelf.shelf.replace(/([A-Z])/g, ' $1').toUpperCase()}</option>
              {bookShelves.filter(shelf => shelf !== bookOnShelf.shelf).map(shelf => (<option key={shelf} value={shelf}>{shelf.replace(/([A-Z])/g, ' $1').toUpperCase()}</option>))}
            </select>

            <div className="extra row">
              <ul className="bookAuthors col">
                {bookOnShelf.authors.map((author) => (<li key={author}>{author}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Book;
