import React, { Component } from 'react';

class Book extends Component {
  handleChange = ( event ) => {
    const newShelf = event.target.value;
    this.props.onChangeShelf( this.props.currentBook, newShelf, this.props.currentBook.id );
  }

  render () {
    const { bookTitle, bookImageLinksThumbnail, bookPublisher, bookPublishedDate, bookDescription, bookAuthors, bookShelf, bookShelves } = this.props;
    // Truncate for bookDescription
    String.prototype.truncate = String.prototype.truncate ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '...' : this;
      };

    return(
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="book">
          <div className="thumbnail container">
            <div className="header row">
              <h6 className="bookTitle col">{ bookTitle }</h6>
            </div>

            <div className="bookImage d-flex">
              <img className="align-self-center" src={ bookImageLinksThumbnail } title={ bookTitle } alt={ bookTitle } />
            </div>

            <div className="footer row">
              <div className="publisher col">{ bookPublisher }</div>
              <div className="publishedDate col-auto">{ bookPublishedDate.replace(/-/g, '/') }</div>
            </div>
          </div>
          <div className="overlay container">
            <div className="description row">
              <p className="col">{ bookDescription.truncate( 200 ) }</p>
            </div>
            <div className="extra row">
              <ul className="bookAuthors col">
                { bookAuthors.map( ( author ) => (
                  <li key={ author }>{ author }</li>
                ) ) }
              </ul>
            </div>
          </div>
        </div>

        <select onChange={ this.handleChange }>
          <option value={ bookShelf }>{ bookShelf }</option>
          { bookShelves.filter( ( shelf ) => shelf !== bookShelf ).map( ( shelf ) => (
            <option key={ shelf } value={ shelf }>{ shelf }</option>
          ) ) }
        </select>
      </div>
    )
  }
}

export default Book;
