import React, { Component } from 'react';

class Book extends Component {
  render () {
    const { bookTitle, bookAuthors, bookImageLinksThumbnail, bookPublisher, bookPublishedDate  } = this.props;

    return(
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="book">
          <div className="thumbnail">
            <div className="header row">
              <h6 className="bookTitle col">{ bookTitle }</h6>
              {/*}<div className="bookAuthors col">{ bookAuthors.map( ( author ) => ( <p>{ author }</p> ) ) }</div>*/}
            </div>

            <div className="bookImage d-flex">
              <img className="align-self-center" src={ bookImageLinksThumbnail } title={ bookTitle } alt={ bookTitle } />
            </div>

            <div className="footer row">
              <div className="publisher col">{ bookPublisher }</div>
              <div className="publishedDate col-auto">{ bookPublishedDate.replace(/-/g, '/') }</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Book;
