import React,  { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf'

class CreateBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render () {
    const { books } = this.props;

    const bookShelvesSet = new Set();
    books.map( ( book ) => bookShelvesSet.add( book.shelf ) ); // Get bookshelves for each book and map them to a set
    const bookShelves = [ ...bookShelvesSet ]; // Convert the set to an array

    return (
      <section className="books">
        <div className="container">
          { bookShelves.map( ( shelf ) => (
            <BookShelf
              key={ shelf }
              title={ shelf }
              books={ books }
              bookShelf={ shelf }
            />
          ) ) }
        </div>
      </section>
    )
  }
}

export default CreateBooks;
